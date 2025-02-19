import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

interface AdoptionRequest {
  adopterName: string;
  adopterEmail: string;
  adopterImage: string;
  adopterLocation: string;
  petName: string;
  petType: string;
  adoptionDate: string;
}

const useAdoptionRequests = () => {
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      setLoading(true);
      try {
        const petsSnapshot = await firestore().collection('pets').get();
        const requestsData: AdoptionRequest[] = [];

        for (const petDoc of petsSnapshot.docs) {
          const petData = petDoc.data();
          if (petData.adoptedBy && petData.adoptedBy.length > 0) {
            for (const adopterId of petData.adoptedBy) {
              const adopterDoc = await firestore().collection('users').doc(adopterId).get();
              if (adopterDoc.exists) {
                const adopterData = adopterDoc.data();
                requestsData.push({
                  adopterName: adopterData?.username || 'Unknown',
                  adopterImage: adopterData?.photoURL|| 'Unknown',
                  adopterEmail: adopterData?.email || 'No Email',
                  adopterLocation: adopterData?.location || 'Fsd',
                  petName: petData.name,
                  petType: petData.type,
                  adoptionDate: petData.adoptionDate || '2-10-2025',
                });
              }
            }
          }
        }

        setRequests(requestsData);
      } catch (error) {
        console.error('Error fetching adoption requests:', error);
        setError('Failed to load adoption requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptionRequests();
  }, []);

  return { requests, loading, error };
};

export default useAdoptionRequests;