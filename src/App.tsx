import React, { useEffect } from 'react';
import './assets/styles/App.scss';
import { Route, Routes } from 'react-router-dom';
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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
