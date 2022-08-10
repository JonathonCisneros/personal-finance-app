import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import background from '../assets/sign-in-up.jpg';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('Email was sent! Please check your spam');
      navigate('/sign-in');
    } catch (error) {
      toast.error('Could not send reset email');
    }
  };

  // iPhone notch area color match
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute('content', '#fff');

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
            <h2 className='text-2xl font-bold text-center'>Forgot Password</h2>
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

            <label className='label'>
              <Link
                to='/sign-in'
                className='label-text-alt link link-hover mt-[-5px] link-primary'
              >
                Oh, did you <span className='italic'>just</span> remember?
              </Link>
            </label>
            <div className='form-control mt-4'>
              <button
                className='btn btn-primary text-base-100'
                onClick={onSubmit}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
