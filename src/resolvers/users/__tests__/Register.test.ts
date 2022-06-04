import { Connection } from 'typeorm';

import faker from 'faker';
import { User } from '../../../entity/User';
import { testConn } from '../../../helpers/tests/testConn';
import { gqlCall } from '../../../helpers/tests/gqlCall';

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

jest.setTimeout(30000);

const registerMutation = `
mutation RegisterMutation($input: RegisterInput!) {
  register(
    input: $input
  ) {
    id
    firstName
    lastName
    email
  }
}

`;

describe('Register', () => {
  it('create user', async () => {
    try {
      const user = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const response = await gqlCall({
        source: registerMutation,
        variableValues: {
          input: user,
        },
      });

      expect(response).toMatchObject({
        data: {
          register: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        },
      });

      const dbUser = await User.findOne({ where: { email: user.email } });

      expect(dbUser).toBeDefined();
      expect(dbUser!.confirmed).toBeFalsy();
      expect(dbUser!.email).toBe(user.email);
    } catch (err) {
      console.log(err);
    }
  });
});
