import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import Budget from './pages/Budget';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <>
      <main className=''>
        <Router>
          <Routes>
            <Route path='/' element={<PrivateRoute />}>
              <Route path='/' element={<Budget />} />
            </Route>
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
        </Router>
        <ToastContainer />
      </main>
    </>
  );
}

export default App;
