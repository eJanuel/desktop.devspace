import { ValidatorResponse } from "./validator-response.type";

export type ValidatorFn = (text: string, options?: Object) => ValidatorResponse;