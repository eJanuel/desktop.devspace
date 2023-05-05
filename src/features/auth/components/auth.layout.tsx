import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main>
      <Outlet />
      <footer>Copyright © 2023 ® All Rights Reserved.</footer>
    </main>
  );
};

export default AuthLayout;
