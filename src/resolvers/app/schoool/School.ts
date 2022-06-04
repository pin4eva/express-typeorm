import { FilterInput } from '../../../resolvers/filterInput';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { School } from '../../../entity/School';
// import { adminAuth, isAuth } from '../../../middleware/isAuth';
import { CreateSchoolInput } from './types/CreateSchoolInput';
import getManyRepoWithFilters from '../../../utils/getManyRepoWithFilters';

@Resolver()
export class CreateSchoolResolver {
  @Mutation(() => School)
  // @UseMiddleware(adminAuth)
  async createSchool(
    @Arg('input') { location, institutionType, name }: CreateSchoolInput,
  ): Promise<School> {
    return await School.create({
      location,
      institutionType,
      name,
    }).save();
  }
}

@Resolver(() => School)
export class GetSchoolResolver {
  @Query(() => [School])
  // @UseMiddleware(adminAuth || isAuth)
  async getAllSchool(@Arg('filters') { skip, limit, searchTerm }: FilterInput): Promise<School[]> {
    const d = await getManyRepoWithFilters({
      Repo: School,
      skip,
      limit,
      searchTerm,
      singularName: 'school',
    });
    console.log(d);
    return d;
  }
}

@Resolver()
export class GetStudentSchoolResolver {
  @Query(() => School)
  // @UseMiddleware(adminAuth || isAuth)
  async getStudentSchool(): Promise<School | undefined> {
    // if (!ctx.req.session!.userId) throw Error('No such user exist');
    // const user = await User.findOne(ctx.req.session!.userId);
    // if (user) {
    return await getRepository(School)
      .createQueryBuilder('school')
      .where('students.id = :id', { id: 1 })
      .getOne();
    // }
    // return [];
  }
}
