import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import Navbar from '../components/layout/Navbar';
import BudgetGroup from '../components/budget/BudgetGroup';
import Spinner from '../components/shared/Spinner';

function Budget() {
  const [budgetGroups, setBudgetGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    setLoading(true);
    const fetchBudgetGroups = async () => {
      const q = query(
        collection(db, 'budgetGroups'),
        where('userRef', '==', auth.currentUser.uid)
      );

      const querySnap = await getDocs(q);
      querySnap.forEach((doc) => {
        setBudgetGroups((prevState) => [...prevState, doc.data()]);
      });
      setLoading(false);
    };

    fetchBudgetGroups();
    console.count('Firebase reads');
  }, []);

  // iPhone notch area color match
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute('content', '#006FCF');

  if (loading) return <Spinner />;

  return (
    <>
      <div className='bg-base-200'>
        <div className='relative h-[100px]'>
          <header className='fixed top-0 w-full px-4 py-8 bg-primary z-50 shadow-sm'>
            <h1 className='text-base-100 text-3xl'>My Budget</h1>
          </header>
        </div>

        <div className='max-w-[50rem] mx-auto min-h-screen'>
          <BudgetGroup budgetGroups={budgetGroups} />
        </div>
      </div>

      <Navbar />
    </>
  );
}

export default Budget;
