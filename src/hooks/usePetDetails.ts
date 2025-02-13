import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const useUserDetails = (petId: string) => {
  const [user, setUser] = useState<{ username: string; photoURL: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!petId) {
      setLoading(false);
      return;
    }

    const fetchUserDetails = async () => {
      try {
        // Fetch the pet document first
        const petDoc = await firestore().collection('pets').doc(petId).get();

        if (!petDoc.exists) {
          setError('Pet not found');
          setLoading(false);
          return;
        }

        const petData = petDoc.data();
        const userId = petData?.userId; // Ensure this matches Firestore field name

        if (!userId) {
          setError('Owner ID not found');
          setLoading(false);
          return;
        }

        // Fetch the user document using userId
        const userDoc = await firestore().collection('users').doc(userId).get();

        if (userDoc.exists) {
          setUser(userDoc.data() as { username: string; photoURL: string });
        } else {
          setError('User not found');
        }
      } catch (err) {
        console.error('Firestore Error:', err);
        setError('Failed to fetch user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [petId]);

  return { user, loading, error };
};

export default useUserDetails;


// export default useUserDetails;
// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if true;
//     }
// 	}
// }
