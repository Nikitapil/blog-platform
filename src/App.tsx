import React, { useEffect } from 'react';
import './assets/styles/App.scss';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppHeader } from './components/app/AppHeader';
import { useAuthActions } from './hooks/store/useAuthActions';
import { MainPage } from './pages/MainPage';
import { SinglePostPage } from './pages/SinglePostPage';
import { CreatePostPage } from './pages/CreatePostPage';
import { EditPostPage } from './pages/EditPostPage';
import { ErrorPage } from './pages/ErrorPage';
import { Profile } from './pages/profile/Profile';
import { Personal } from './pages/profile/Personal';
import { UserComments } from './pages/profile/UserComments';
import { UserLikes } from './pages/profile/UserLikes';
import { UserPosts } from './pages/profile/UserPosts';
import 'react-toastify/dist/ReactToastify.css';
import { Admin } from './pages/profile/admin/Admin';
import { AppUsers } from './pages/profile/admin/AppUsers';

function App() {
  const { checkAuth } = useAuthActions();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/posts/:id" element={<SinglePostPage />} />
        <Route path="/posts/:id/edit" element={<EditPostPage />} />
        <Route path="/posts/create-post" element={<CreatePostPage />} />
        <Route path="/profile/:id" element={<Profile />}>
          <Route path="personal" element={<Personal />} />
          <Route path="user-comments" element={<UserComments />} />
          <Route path="user-likes" element={<UserLikes />} />
          <Route path="user-posts" element={<UserPosts />} />
          <Route path="admin" element={<Admin />}>
            <Route path="users" element={<AppUsers />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default App;
