import { FilterInput } from '../../../resolvers/filterInput';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Department } from '../../../entity/Department';
import { User } from '../../../entity/User';
// import { adminAuth, isAuth } from '../../../middleware/isAuth';
import { MyContext } from '../../../types/Context';
import { CreateFacultyInput } from './types/CreateSchoolInput';
import getManyRepoWithFilters from '../../../utils/getManyRepoWithFilters';

@Resolver()
export class CreateDepartmentResolver {
  @Mutation(() => Department)
  // @UseMiddleware([adminAuth])
  async createDepartment(@Arg('input') { name }: CreateFacultyInput): Promise<Department> {
    return await Department.create({
      name,
    }).save();
  }
}

@Resolver(() => Department)
export class GetDepartmentResolver {
  @Query(() => [Department])
  // @UseMiddleware([isAuth])
  async getAllSchool(
    @Arg('filters') { skip, limit, searchTerm }: FilterInput,
  ): Promise<Department[]> {
    return await getManyRepoWithFilters({
      Repo: Department,
      skip,
      limit,
      searchTerm,
      singularName: 'department',
    });
  }
}

@Resolver()
export class GetStudentDepartmentResolver {
  @Query(() => Department)
  // @UseMiddleware([isAuth])
  async getStudentDepartment(@Ctx() ctx: MyContext): Promise<Department[]> {
    if (!ctx.req.session!.userId) throw Error('No such user exist');
    const user = await User.findOne(ctx.req.session!.userId);
    if (user) {
      return await Department.find({
        relations: ['department'],
        where: {
          studentId: user.id,
        },
      });
    }
    return [];
  }
}
