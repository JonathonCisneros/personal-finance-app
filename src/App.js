import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BudgetProvider } from './context/BudgetContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/shared/PrivateRoute';
import Budget from './pages/Budget';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreateFirstBudget from './pages/CreateFirstBudget';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <BudgetProvider>
        <Router>
          <Routes>
            <Route path='/' element={<PrivateRoute />}>
              <Route path='/' element={<Budget />} />
            </Route>
            <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<Profile />} />
            </Route>
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/create-your-first-budget' element={<PrivateRoute />}>
              <Route
                path='/create-your-first-budget'
                element={<CreateFirstBudget />}
              />
            </Route>

            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
        </Router>
      </BudgetProvider>

      <ToastContainer />
    </>
  );
}

export default App;
