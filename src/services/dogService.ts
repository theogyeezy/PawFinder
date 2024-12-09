import { db } from '../lib/firebase';
import { collection, doc, setDoc, getDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { DogProfile } from '../types/dog';

export const createDogProfile = async (dogProfile: Omit<DogProfile, 'id'>) => {
  const dogRef = doc(collection(db, 'dogs'));
  const dogId = dogRef.id;
  
  await setDoc(dogRef, {
    ...dogProfile,
    id: dogId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  
  return dogId;
};

export const getDogProfile = async (dogId: string): Promise<DogProfile | null> => {
  const dogRef = doc(db, 'dogs', dogId);
  const dogSnap = await getDoc(dogRef);
  
  if (dogSnap.exists()) {
    return dogSnap.data() as DogProfile;
  }
  
  return null;
};

export const updateDogProfile = async (dogId: string, updates: Partial<DogProfile>) => {
  const dogRef = doc(db, 'dogs', dogId);
  await updateDoc(dogRef, {
    ...updates,
    updatedAt: new Date().toISOString()
  });
};

export const getUserDogs = async (userId: string): Promise<DogProfile[]> => {
  const dogsRef = collection(db, 'dogs');
  const q = query(dogsRef, where('ownerId', '==', userId));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => doc.data() as DogProfile);
};