import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import AuthPage from "./features/auth/components/AuthPage";
import ProfilePage from './pages/Profile';
import NavMenuComponent from './shared/components/NavMenu/NavMenu';
import Posts from './pages/Posts';
import Authors from './pages/Authors';
import DetailPost from './features/posts/components/DetailPost';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const cookie = new Cookies();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookie.get('accessToken')) {
      setIsAuth(true)
    }
    /* eslint-disable-next-line */
  }, [])

  useEffect(() => {
    if (!isAuth && location.pathname !== '/login') {
      navigate('/login')
    }
  })

  return (
    <>
      <div className="App">
        <header className="App-header">
            {
              isAuth && <NavMenuComponent/>
            }
        </header>
          {
            isAuth ?
            <Routes>
              <Route path='/posts' element={<Posts />} />
              <Route path='/user' element={<ProfilePage />} />
              <Route path='/authors' element={<Authors />} />
              <Route path='/posts/:id' element={<DetailPost />} />
            </Routes> :
            <Routes>
              <Route path='/login' element={<AuthPage/>} />
            </Routes>

          }
      </div>
    </>
  );
}

export default App;
