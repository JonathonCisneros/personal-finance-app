import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

function Budget() {
  const navigate = useNavigate();
  const auth = getAuth();

  const onLogOut = () => {
    auth.signOut();
    navigate('/sign-in');
  };
  return (
    <div>
      <p>Budget</p>
      <button className='btn btn-primary' onClick={onLogOut}>
        Logout
      </button>
    </div>
  );
}

export default Budget;
