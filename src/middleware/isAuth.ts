import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types/Context';
import { Admin, AdminRole } from '../entity/Admin';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw Error('[Unathorized]: You must login to perform this action');
  }
  return next();
};

export const adminAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session!.adminId) {
    throw Error('[Unathorized]: You must login to perform this action');
  }
  const admin = await Admin.findOne(context.req.session!.adminId);
  if (!admin) throw Error('[Error]: Sorry, you can not perform this operation');
  if ((admin && admin.role === AdminRole.ADMIN) || (admin && admin.role != AdminRole.SUPERADMIN)) {
    throw Error(`[Unathorized]: You don't have the permission to perform such operation`);
  }
  return next();
};
