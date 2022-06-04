import { MiddlewareFn } from 'type-graphql';
export const ResolveTime: MiddlewareFn = async ({ info }, next) => {
  const start = Date.now();
  await next();
  const resolveTime = Date.now() - start;
  if (resolveTime > 20000)
    throw Error(
      `[Network Error]: ${info.parentType.name}.${info.fieldName} operation was canceled because it was taking too long`,
    );
};
