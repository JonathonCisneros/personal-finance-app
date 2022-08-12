import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import OAuth from '../components/OAuth';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // check sign in credentials
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate('/');
      }
    } catch (error) {
      toast.error('Bad user credentials');
    }
  };

  // iPhone notch area color match
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute('content', '#d6dae0');

  return (
    <div className='hero min-h-screen py-5 bg-base-200'>
      <div className='hero-content flex-col'>
        <div className='text-center lg:text-left'>
          <h1 className='text-5xl font-bold text-center mb-4'>
            Personal Finance App
          </h1>
        </div>
        <div className='card flex-shrink-0 w-full max-w-md shadow-xl bg-base-100 bg-opacity-80 backdrop-blur-lg'>
          <div className='card-body'>
            <h2 className='text-2xl font-bold text-center'>Sign In</h2>
            <p className='font-light text-center'>
              to continue to your budget!
            </p>
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
                  className='cursor-pointer absolute right-[10%] top-[48%]'
                  alt='hide password'
                />
              ) : (
                <MdVisibility
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  className='cursor-pointer absolute right-[10%] top-[48%]'
                  alt='show password'
                />
              )}

              <label className='label'>
                <Link
                  to='/forgot-password'
                  className='label-text-alt link link-hover'
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className='form-control mt-1'>
              <button
                className='btn btn-primary text-base-100'
                onClick={onSubmit}
              >
                Login
              </button>
            </div>

            <div className='divider text-sm'>OR</div>

            <OAuth />
          </div>
        </div>
        <div className='flex flex-row'>
          <p className='mr-2'>Don't have an account? </p>
          <Link to='/sign-up' className='font-bold text-primary'>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
