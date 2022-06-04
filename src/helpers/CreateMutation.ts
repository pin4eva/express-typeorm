import { Arg, ClassType, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Middleware } from 'type-graphql/dist/interfaces/Middleware';

export function createResolver<T extends ClassType, X extends ClassType>(
  name: string,
  returnType: T,
  inputType: X,
  model: any,
  middleware?: Middleware<any>[],
) {
  @Resolver()
  abstract class BaseResolver {
    @Mutation(() => returnType, { name: name })
    @UseMiddleware(...(middleware || []))
    async create(@Arg('input', () => inputType) input: any) {
      return model.create(input).save();
    }
  }

  return BaseResolver;
}
