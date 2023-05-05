import { Outlet } from "react-router-dom";

export const AppLayout = () => {
    return (
      <main>
        {/* <SideMenu /> */}
  
        <div id="main-content">
          <Outlet />
        </div>
  
        <footer>Copyright © 2023 ® All Rights Reserved.</footer>
      </main>
    );
  };
  