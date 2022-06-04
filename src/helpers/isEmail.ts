import { User } from '../entity/User';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// Email validation
@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
  validate(email: string) {
    return User.findOne({ where: { email } }).then((user) => {
      if (user) return false;
      return true;
    });
  }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    });
  };
}

//Phone Number validation
@ValidatorConstraint({ async: true })
export class IsPhoneNumberAlreadyExistConstraint implements ValidatorConstraintInterface {
  validate(phoneNumber: string) {
    return User.findOne({ where: { phoneNumber } }).then((user) => {
      if (user) return false;
      return true;
    });
  }
}

export function IsPhoneNumberAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneNumberAlreadyExistConstraint,
    });
  };
}

//Phone Number validation
@ValidatorConstraint({ async: true })
export class PhoneNumberVerifiedExistConstraint implements ValidatorConstraintInterface {
  validate(phoneNumber: string) {
    return User.findOne({ where: { phoneNumber } }).then((user) => {
      if (user && user.confirmed === false) return false;
      return true;
    });
  }
}

export function PhoneNumberIsVerified(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PhoneNumberVerifiedExistConstraint,
    });
  };
}

//Phone Number validation
@ValidatorConstraint({ async: true })
export class StudentUpdatedExistConstraint implements ValidatorConstraintInterface {
  validate(phoneNumber: string) {
    return User.findOne({ where: { phoneNumber } }).then((user) => {
      if (!user?.email || !user.password || !user.firstName) return false;
      else return true;
    });
  }
}

export function StudentIsUpdated(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: StudentUpdatedExistConstraint,
    });
  };
}
