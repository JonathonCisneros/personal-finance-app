import { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../components/shared/Spinner';

function CreateFirstBudget() {
  const [loading, setLoading] = useState(false);
  const [firstBudget, setFirstBudget] = useState({
    id: uuidv4(),
    canDelete: false,
    label: 'Income',
    type: 'income',
    budgetItems: [
      {
        amount: 4000,
        id: uuidv4(),
        label: 'Job 1',
        type: 'income',
      },
      {
        amount: 3000,
        id: uuidv4(),
        label: 'Job 2',
        type: 'income',
      },
    ],
  });

  const auth = getAuth();
  const name = auth.currentUser.displayName;

  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFirstBudget({
            ...firstBudget,
            userRef: user.uid,
          });
        } else {
          navigate('/sign-in');
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line
  }, [isMounted]);

  const createFirstBudget = async () => {
    setLoading(true);

    const fetchBudgetGroups = async () => {
      const q = query(
        collection(db, 'budgetGroups'),
        where('userRef', '==', auth.currentUser.uid)
      );

      const querySnap = await getDocs(q);
      querySnap.forEach((doc) => {
        console.log(doc.data());
      });
      setLoading(false);
    };

    fetchBudgetGroups();

    // TODO: Check if user already has a budget
    // if () {
    // const firstBudgetCopy = {
    //   ...firstBudget,
    //   timestamp: serverTimestamp(),
    // };

    // const docRef = await addDoc(
    //   collection(db, 'budgetGroups'),
    //   firstBudgetCopy
    // );
    // console.log(docRef);
    // setLoading(false);
    // toast.success('Budget created!');
    // navigate('/');
    // } else {
    //   toast.error('You already have a budget silly!');
    //   navigate('/');
    // }
  };

  if (loading) return <Spinner />;

  // iPhone notch area color match
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute('content', '#D8E1E5');

  return (
    <div className='hero min-h-[90vh] md:min-h-screen bg-base-200'>
      <div className='card mx-3 shadow-md bg-base-100 bg-opacity-80 backdrop-blur-lg'>
        <div className='card-body text-center py-[3rem] md:p-[5rem]'>
          <h1 className='text-2xl pb-4 font-bold'>Hello {name}!</h1>
          <button
            className='btn btn-primary text-base-100'
            onClick={createFirstBudget}
          >
            Click to start your budget
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateFirstBudget;
