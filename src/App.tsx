import React, { useEffect } from 'react';
import './assets/styles/App.scss';
import { Route, Routes } from 'react-router-dom';
import { AppHeader } from './components/app/AppHeader';
import { useAuthActions } from './hooks/store/useAuthActions';
import { MainPage } from './pages/MainPage';
import { SinglePostPage } from './pages/SinglePostPage';
import { CreatePostPage } from './pages/CreatePostPage';
import { EditPostPage } from './pages/EditPostPage';

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
        <Route path="/posts/:id" element={<SinglePostPage />} />
        <Route path="/posts/:id/edit" element={<EditPostPage />} />
        <Route path="/posts/create-post" element={<CreatePostPage />} />
      </Routes>
    </div>
  );
}

export default App;
