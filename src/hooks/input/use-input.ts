import { ChangeEvent, useReducer } from 'react';
import { Action } from '../../shared/models/action.interface';
import { ValidatorFn } from '../../shared/utils/validation/models/validator-fn.type';
import {
    InputActionType,
    INPUT_ACTION_CHANGE,
    INPUT_ACTION_CLEAR,
} from './models/input-action.type';
import { InputState } from './models/input-state.interface';
import { FormErrorsEnum } from '../../shared/models/form-errors.enum';

const initialInputState: InputState = {
    text: '',
    hasBeenTouched: false,
};

const inputReducer = (state: InputState, action: Action<InputActionType>) => {
    const { type, value = '' } = action;

    switch (type) {
        case INPUT_ACTION_CHANGE:
            return { text: value, hasBeenTouched: true};
        case INPUT_ACTION_CLEAR:
            return { text: '', hasBeenTouched: false };

        default:
            return { ...state };
    }
};

const useInput = (validatorsFn: ValidatorFn[], required = false) => {
    const [{ text, hasBeenTouched }, dispatch] = useReducer(
        inputReducer,
        initialInputState
    );

    let shouldDisplayError: boolean;
    let errors: [FormErrorsEnum?] = [];

    if (required && text.length === 0) {
        errors = [FormErrorsEnum.REQUIRED];
    } else {
        if (validatorsFn.length > 0) {
            validatorsFn.forEach(validatorFn => {
                let validation = validatorFn(text);
                if (!validation.succeed) errors.push(validation.errorHelper);
            });
        }
    }

    shouldDisplayError = errors.length > 0 && hasBeenTouched;

    const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: INPUT_ACTION_CHANGE, value: e.target.value });
    };

    const clearHandler = () => {
        dispatch({ type: INPUT_ACTION_CLEAR });
    };

    return {
        text,
        shouldDisplayError,
        errors,
        textChangeHandler,
        clearHandler,
    };
};


export default useInput;
