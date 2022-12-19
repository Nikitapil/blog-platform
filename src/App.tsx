import React, { useEffect } from 'react';
import './assets/styles/App.scss';
import { AppHeader } from './components/app/AppHeader';
import { useAuthActions } from './hooks/store/useAuthActions';

function App() {
  const { checkAuth } = useAuthActions();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="App">
      <AppHeader />
    </div>
  );
}

export default App;
