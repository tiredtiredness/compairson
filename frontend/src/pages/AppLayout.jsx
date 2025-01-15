import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AllListsPage } from './AllListsPage';
import { SettingsPage } from './SettingsPage';
import { ViewListPage } from './ViewListPage';
import { RankListPage } from './RankListPage';
import { Sidebar } from '../components/Sidebar';
import { SignInPage } from './SignInPage';
import { SignUpPage } from './SignUpPage';
import { SignOutPage } from './SignOutPage.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { ViewPublicListsPage } from './ViewPublicListsPage.jsx';
import { Loader } from '../components/Loader.jsx';
import Snowfall from 'react-snowfall';

export const AppLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Snowfall style={{ zIndex: 1000 }} color='#eef' />
      <div className='max-w-7xl flex mx-auto '>
        {user && <Sidebar />}
        <Routes>
          <Route path='/logout' element={<SignOutPage />} />
          {user ? (
            <>
              <Route path='/' />
              <Route path='/lists/mine' element={<AllListsPage />} />
              <Route path='/lists/public' element={<ViewPublicListsPage />} />
              <Route path='/settings' element={<SettingsPage />} />
              <Route path='/lists/:listId' element={<ViewListPage />} />
              <Route path='/rank' element={<RankListPage />} />

              <Route path='*' element={<Navigate to='/lists/mine' />} />
            </>
          ) : (
            <>
              <Route path='/signin' element={<SignInPage />} />
              <Route path='/signup' element={<SignUpPage />} />
              <Route path='/logout' element={<SignOutPage />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
};
