import React, { useState } from 'react';
import { getAuth, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { toast } from 'react-toastify';
import { FaUserCircle } from 'react-icons/fa';
import Navbar from '../components/layout/Navbar';

function Profile() {
  const auth = getAuth();

  const [changing, setChanging] = useState(false);
  const [profileData, setProfileData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = profileData;

  const navigate = useNavigate();

  const onLogOut = () => {
    auth.signOut();
    navigate('/sign-in');
  };

  const onChange = (e) => {
    e.preventDefault();
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update name in firebase database
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update in firebase firestore
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error('Could not update profile details');
    }
  };

  const onCancel = () => {
    setProfileData((prevState) => ({
      ...prevState,
      name: auth.currentUser.displayName,
    }));
    setChanging((prevState) => !prevState);
  };

  const resetPassword = () => {
    if (window.confirm('Are you sure you want to reset password?')) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success('Email was sent! Please check your spam');
        })
        .catch((error) => toast.error('Could not send reset email'));
    }
  };

  // iPhone notch area color match
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute('content', '#66cc8a');

  return (
    <>
      <header className='fixed top-0 w-full px-4 py-4 bg-primary z-50'>
        <div className='flex flex-row text-base-100'>
          <FaUserCircle className='px-4 pb-2 text-[4.25rem] pt-3' />
          <h1 className='text-3xl font-bold flex flex-col pt-3'>
            {name}
            <span className='text-sm font-light'>{email}</span>
          </h1>
        </div>
      </header>

      <div className='mt-[120px] mx-4 card bg-base-200'>
        <div className='card-body'>
          <form className='form-control'>
            <label className='label'>
              <span className='label-text font-bold'>Name</span>
            </label>

            {/* Edit name */}
            <input
              id='name'
              type='text'
              value={name}
              className='input input-bordered max-w-md'
              onChange={onChange}
              disabled={!changing}
            />

            {/* Email not editable */}
            <label className='label'>
              <span className='label-text font-bold'>Email</span>
            </label>
            <input
              id='email'
              type='email'
              value={email}
              className='input input-bordered max-w-md'
              disabled
            />
          </form>

          <div className='max-w-md flex gap-2 mt-2'>
            <button
              className='btn btn-secondary md:btn-sm normal-case'
              onClick={() => {
                changing && onSubmit();
                setChanging((prevState) => !prevState);
              }}
            >
              {changing ? 'Submit Changes' : 'Change Details'}
            </button>

            {/* Show "Cancel" button if changing info */}
            {changing && (
              <button
                className='btn btn-base-200 md:btn-sm normal-case'
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
          </div>

          {/* Reset password */}
          <button
            className='btn btn-error max-w-md text-base-100 mt-7'
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </div>
      </div>

      {/* Sign out */}
      <div className='w-full grid mt-5 mb-[100px]'>
        <button
          className='btn btn-primary mx-auto w-[18rem] text-base-100'
          onClick={onLogOut}
        >
          Logout <MdLogout className='text-lg mb-[2px] ml-2' />
        </button>
      </div>

      <Navbar />
    </>
  );
}

export default Profile;
