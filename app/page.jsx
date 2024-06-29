"use client"
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HomeScreen from "@/components/Screens/HomeScreen";
import { db, auth } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { redirect, useRouter } from "next/navigation";

const Page = () => {
  const [userData, setUserData] = useState(null);

  const userId = auth?.currentUser?.uid
  // typeof window !== 'undefined' ? localStorage.getItem("fuo-id") : null;
  console.log(userId)
  if (!userId) {
    if (typeof window !== 'undefined') {
      redirect('/sign-in');
    }
    return null;
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.log('No matching documents.');
          router.push('/sign-in'); // Redirect if no user found
          return;
        }

        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
          console.log(doc.data())
        });
      } catch (err) {
        console.error('Error getting documents: ', err);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div className="w-full">
      <Navbar />
      <HomeScreen user={userData} />
    </div>
  );
};

export default Page;
