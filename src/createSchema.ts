import { buildSchema } from 'type-graphql';
import { CreatePastQuestionsResolver } from './resolvers/app/pastQuestions/PastQuestions';
import {
  CreateDepartmentResolver,
  GetDepartmentResolver,
  GetStudentDepartmentResolver,
} from './resolvers/app/schoool/Department';
import {
  CreateFacultyResolver,
  GetFacultyResolver,
  GetStudentFacultyResolver,
} from './resolvers/app/schoool/Faculty';
import {
  CreateSchoolResolver,
  GetSchoolResolver,
  GetStudentSchoolResolver,
} from './resolvers/app/schoool/School';
import { ConfirmStudentResolver } from './resolvers/users/auth/ConfirmUser';
import { UpadateStudentDetailsResolver } from './resolvers/users/auth/ContinueStudentRegister';
import { ForgotPasswordResolver } from './resolvers/users/auth/ForgotPassword';
import { LoginResolver } from './resolvers/users/auth/Login';
import { LogoutResolver } from './resolvers/users/auth/Logout';
import { RegisterResolver } from './resolvers/users/auth/Register';
import { ResendStudentOTPResolver } from './resolvers/users/auth/ResendOTP';
import { UpdateStudentSchoolInfoResolver } from './resolvers/users/auth/UpdateStudentSchoolInfo';
import { MeResolver } from './resolvers/users/me';

export const createSchema = () =>
  buildSchema({
    resolvers: [
      LoginResolver,
      RegisterResolver,
      MeResolver,
      LogoutResolver,
      ResendStudentOTPResolver,
      ConfirmStudentResolver,
      UpadateStudentDetailsResolver,
      UpdateStudentSchoolInfoResolver,
      ForgotPasswordResolver,
      CreateSchoolResolver,
      GetStudentSchoolResolver,
      GetSchoolResolver,
      CreateFacultyResolver,
      GetStudentFacultyResolver,
      GetFacultyResolver,
      CreateDepartmentResolver,
      GetStudentDepartmentResolver,
      GetDepartmentResolver,
      CreatePastQuestionsResolver,
    ],
    authChecker: ({ context: { req } }) => !!req.session.userId,
  });
