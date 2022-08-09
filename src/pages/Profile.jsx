import React, { useState } from 'react';
import { getAuth, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { toast } from 'react-toastify';
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

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Email was sent! Please check your spam');
      })
      .catch((error) => toast.error('Could not send reset email'));
  };

  return (
    <>
      <div className='m-8 card bg-base-200'>
        <div className='card-body'>
          <h1 className='text-3xl font-bold'>{name}'s Profile</h1>

          <form className='form-control mt-4'>
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
                onClick={() => {
                  setProfileData({
                    name: auth.currentUser.displayName,
                  });
                  setChanging((prevState) => !prevState);
                }}
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

          {/* Sign out */}
          <button
            className='btn btn-primary max-w-md text-base-100 mt-7'
            onClick={onLogOut}
          >
            Logout <MdLogout className='text-lg mb-[2px] ml-2' />
          </button>
        </div>
      </div>

      <Navbar />
    </>
  );
}

export default Profile;
