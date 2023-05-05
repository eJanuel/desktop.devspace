import { FC, FormEvent, useEffect } from "react";
import { login, reset } from "../auth.slice";

import { Navigate } from "react-router-dom";
import { UserLogin } from "../models/user-login.interface";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import useInput from "../../../hooks/input/use-input";
import { validatePasswordLength, validateUsernameLength } from "../../../shared/utils/validation/length";
import { FormInput } from "../../../shared/components/form-input.component";
import { validateFormat } from "../../../shared/utils/validation/fomat";

export const Login: FC = () => {
  const {
    text: username,
    shouldDisplayError: usernameShouldDisplayError,
    errors: usernameErrors,
    textChangeHandler: usernameChangeHandler,
    clearHandler: usernameClearHandler,
  } = useInput([validateFormat, validateUsernameLength], true);
  
  const {
    text: password,
    shouldDisplayError: passwordShouldDisplayError,
    errors: passwordErrors,
    textChangeHandler: passwordChangeHandler,
    clearHandler: passwordClearHandler,
  } = useInput([validatePasswordLength], true);
  
  const clearForm = () => {
    usernameClearHandler();
    passwordClearHandler();
  };

  const dispatch = useAppDispatch();

  const { isLoading, isSuccess, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
    }
  }, [isSuccess, dispatch]);


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (usernameErrors.length > 0 || passwordErrors.length > 0) return;

    const loginUser: UserLogin = { username, password };

    dispatch(reset());
    dispatch(login(loginUser));
  };

  return isAuthenticated ? (
    <Navigate to={"/"} />
  ) : (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <FormInput
          type="text"
          name="username"
          value={username}
          onChange={usernameChangeHandler}
          errors={usernameShouldDisplayError}
          required={true}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={passwordChangeHandler}
          errors={passwordShouldDisplayError}
          required={true}
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
};

export default Login;
