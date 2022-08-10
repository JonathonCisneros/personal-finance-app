import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { themeChange } from 'theme-change';
import { MdLightMode, MdNightlight } from 'react-icons/md';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import Budget from './pages/Budget';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';

function App() {
  const [themeState, setThemeState] = useState(false);

  useEffect(() => {
    themeChange(false);
  }, []);

  // changes notch safe area to match theme color
  useEffect(() => {
    let theme = localStorage.getItem('theme');
    if (theme === 'business') {
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute('content', '#1c4f82');
    } else {
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute('content', '#4c6bfb');
    }
  }, [themeState]);

  return (
    <>
      <main className=''>
        <Router>
          <Routes>
            <Route path='/' element={<PrivateRoute />}>
              <Route path='/' element={<Budget />} />
            </Route>
            <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
        </Router>

        <ToastContainer />

        {/* light/dark mode */}
        <label className='swap swap-rotate fixed z-50 top-[2rem] right-[2rem]'>
          <input
            type='checkbox'
            data-toggle-theme='business,corporate'
            onChange={() => {
              setThemeState((prevState) => !prevState);
            }}
          />
          <MdNightlight className='swap-off fill-white w-10 h-10 rotate-[-20deg]' />
          <MdLightMode className='swap-on fill-white w-10 h-10' />
        </label>
      </main>
    </>
  );
}

export default App;
