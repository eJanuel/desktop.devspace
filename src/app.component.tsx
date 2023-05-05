import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootState } from "./store";

import { verifyAccessToken } from "./features/auth/auth.slice";

import { ProjectCreate } from "./features/projects/components/project-create.component";
import { Projects } from "./features/projects/components/projects.component";
import { Project } from "./features/projects/components/project.component";
import { Notes } from "./features/notes/components/notes.component";
import { ProjectsList } from "./features/projects/components/projects-list.component";
import { NotesList } from "./features/notes/components/notes-list.component";
import { NoteCreate } from "./features/notes/components/note-create.component";
import { Note } from "./features/notes/components/note.component";
import { Profile } from "./features/profile/components/profile.component";
import { ProfileEdit } from "./features/profile/components/profile-edit.component";
import { Settings } from "./features/settings/components/settings.component";
import { SettingsEdit } from "./features/settings/components/settings-edit.component";

import "./reset.css";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/redux/hooks";
import { AuthRoutes } from "./features/auth/components/auth-routes.components";
import { PrivateRoutes } from "./features/auth/components/private-routes.component";
import Login from "./features/auth/components/login.component";
import Register from "./features/auth/components/register.component";

const App = () => {
  const isDarkMode = useAppSelector((state: RootState) => state.app.isDarkMode);
  const isLoading = useAppSelector((state: RootState) => state.auth.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyAccessToken());
  }, [dispatch]);

  return (
    <div className={`App ${isDarkMode ? "dark" : "light"}`}>
      {isLoading ? (
        <LoadingAnim />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route index element={<Home />} />

              <Route path="projects" element={<Projects />}>
                <Route index element={<ProjectsList />} />
                <Route path="create" element={<ProjectCreate />} />
                <Route path=":id" element={<Project />} />
              </Route>

              <Route path="notes" element={<Notes />}>
                <Route index element={<NotesList />} />
                <Route path="create" element={<NoteCreate />} />
                <Route path=":id" element={<Note />} />
              </Route>

              <Route path="profile" element={<Profile />}>
                <Route index path="edit" element={<ProfileEdit />} />
              </Route>

              <Route path="settings" element={<Settings />}>
                <Route index path="edit" element={<SettingsEdit />} />
              </Route>
            </Route>

            <Route element={<AuthRoutes />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

const LoadingAnim = () => {
  return (
    <div id="loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

const Home = () => {
  return <div>Home</div>;
};

export default App;
