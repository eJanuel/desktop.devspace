import { FormErrorsEnum } from '../../models/form-errors.enum';
import { ValidatorResponse } from './models/validator-response.type';
import { ValidatorFn } from './models/validator-fn.type';

export const validateEmail: ValidatorFn = (email: string): ValidatorResponse => {
  const IS_MAIL_FORMAT =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  const isValid = IS_MAIL_FORMAT.test(email.trim())
  return { succeed: isValid, errorHelper: FormErrorsEnum.FORMAT_EMAIL };
};
