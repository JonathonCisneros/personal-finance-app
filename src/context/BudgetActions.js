import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';

const [budgetGroups, setBudgetGroups] = useState(null);
const [budgetItems, setBudgetItems] = useState(null);
const [loading, setLoading] = useState(false);

const auth = getAuth();

useEffect(() => {
  setLoading(true);
  const fetchBudgetGroups = async () => {
    const docRef = doc(db, 'budgetGroups', '2VSi0A9VrIerB7WmdaXs');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setBudgetGroups(docSnap.data());
      setLoading(false);
    }
  };

  fetchBudgetGroups();
}, []);
