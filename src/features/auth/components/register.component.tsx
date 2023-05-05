import { useState } from "react";
import { register } from "../auth.slice";
import { RootState } from "../../../store";
import { Navigate } from "react-router-dom";
import { UserRegister } from "../models/user-register.interface";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";

export const Register = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [formData, setFormData] = useState<UserRegister>({
    email: "johndoh@gmail.com",
    username: "johndoh",
    password: "coco13010",
    confirmPassword: "coco13010",
  });
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(register(formData));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return isAuthenticated ? (
    <Navigate to={"/"} />
  ) : (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
