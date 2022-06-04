import getManyRepoWithFilters from '../../../utils/getManyRepoWithFilters';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Faculty } from '../../../entity/Faculty';
import { User } from '../../../entity/User';
// import { adminAuth, isAuth } from '../../../middleware/isAuth';
import { FilterInput } from '../../../resolvers/filterInput';
import { MyContext } from '../../../types/Context';
import { CreateFacultyInput } from './types/CreateSchoolInput';

@Resolver()
export class CreateFacultyResolver {
  @Mutation(() => Faculty)
  // @UseMiddleware([adminAuth])
  async createFaculty(@Arg('input') { name }: CreateFacultyInput): Promise<Faculty> {
    return await Faculty.create({
      name,
    }).save();
  }
}

@Resolver(() => Faculty)
export class GetFacultyResolver {
  @Query(() => [Faculty])
  // @UseMiddleware([isAuth])
  async getAllSchool(@Arg('filters') { skip, limit, searchTerm }: FilterInput): Promise<Faculty[]> {
    return await getManyRepoWithFilters({
      Repo: Faculty,
      skip,
      limit,
      searchTerm,
      singularName: 'faculty',
    });
  }
}

@Resolver()
export class GetStudentFacultyResolver {
  @Query(() => Faculty)
  // @UseMiddleware([isAuth])
  async getStudentFaculty(@Ctx() ctx: MyContext): Promise<Faculty[]> {
    if (!ctx.req.session!.userId) throw Error('No such user exist');
    const user = await User.findOne(ctx.req.session!.userId);
    if (user) {
      return await Faculty.find({
        relations: ['faculty'],
        where: {
          studentId: user.id,
        },
      });
    }
    return [];
  }
}
