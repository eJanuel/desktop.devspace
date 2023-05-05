import { FormErrorsEnum } from '../../models/form-errors.enum';
import { ValidatorResponse } from './models/validator-response.type';
import { ValidatorFn } from './models/validator-fn.type';

export const validateFormat: ValidatorFn = (text: string): ValidatorResponse => {
  const CONTAINS_ILLEGAL_CHARS = /['";\(\)\{\}\[\]\/\\\+\-\*=<>\?\^%\|\!,\._#@&`~\$\u00A0]/;

  const isValid = !CONTAINS_ILLEGAL_CHARS.test(text.trim())
  return { succeed: isValid, errorHelper: FormErrorsEnum.INVALID_CHARS };
};
