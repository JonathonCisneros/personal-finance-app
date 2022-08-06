import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import background from '../assets/sign-in-up.jpg';
import OAuth from '../components/OAuth';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // add user to firebase database
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, { displayName: name });

      // copying form data and deleting password from copy
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy); // adds 'user' to user collection

      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      className='hero min-h-screen py-5'
      style={{
        backgroundImage: `url(${background})`,
        backgroundAttachment: 'fixed',
      }}
    >
      <div className='hero-content flex-col'>
        <div className='text-center lg:text-left'>
          <h1 className='text-5xl font-bold text-center mb-4'>
            Personal Finance App
          </h1>
        </div>
        <div className='card flex-shrink-0 w-full max-w-md shadow-xl bg-base-100 bg-opacity-80 backdrop-blur-lg'>
          <div className='card-body'>
            <h2 className='text-2xl font-bold text-center'>Sign Up</h2>
            <p className='font-light text-center'>to create to your budget!</p>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Name</span>
              </label>
              <input
                type='name'
                id='name'
                value={name}
                onChange={onChange}
                className='input input-bordered'
              />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={onChange}
                className='input input-bordered'
              />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                value={password}
                onChange={onChange}
                className='input input-bordered'
              />
              {/* Visibility icon to show password */}
              {showPassword ? (
                <MdVisibilityOff
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  className='cursor-pointer absolute right-[10%] top-[58%]'
                  alt='hide password'
                />
              ) : (
                <MdVisibility
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  className='cursor-pointer absolute right-[10%] top-[58%]'
                  alt='show password'
                />
              )}
            </div>
            <div className='form-control mt-4'>
              <button
                className='btn btn-primary text-base-100'
                onClick={onSubmit}
              >
                Sign Up
              </button>
            </div>

            <div className='divider text-sm'>OR</div>

            <OAuth />
          </div>
        </div>
        <div className='flex flex-row'>
          <p className='mr-2'>Already have an account? </p>
          <Link to='/sign-in' className='font-bold text-primary'>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
