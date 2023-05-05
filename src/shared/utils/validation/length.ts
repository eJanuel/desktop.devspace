import { FormErrorsEnum } from "../../models/form-errors.enum";
import { LengthOptions } from "../../models/options/length.interface";
import { ValidatorFn } from './models/validator-fn.type';
import { ValidatorResponse } from "./models/validator-response.type";

const _validateLength = (text: string, options?: LengthOptions): boolean => {
  const textLength = text.trim().length;

  if (options?.min && textLength < options.min) return false;
  if (options?.max && textLength > options.max) return false;

  return true;
};

export const validateUsernameLength: ValidatorFn = (text: string): ValidatorResponse => {
  return { succeed: _validateLength(text, { min: 2, max: 48 }), errorHelper: FormErrorsEnum.LENGTH_USERNAME };
};

export const validatePasswordLength: ValidatorFn = (text: string): ValidatorResponse => {
  return { succeed: _validateLength(text, { min: 8, max: 64 }), errorHelper: FormErrorsEnum.LENGTH_PASSWORD };
};
