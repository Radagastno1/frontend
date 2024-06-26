// user.ts
import "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { User } from "../slices/userSlice";
import { db } from "./config";

export const saveUserToFirestore = async (user: User) => {
  const userDocRef = doc(db, "users", user.accountId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    await setDoc(
      userDocRef,
      {
        accountId: user.accountId,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
      { merge: true }
    );
  } else {
    await setDoc(userDocRef, {
      accountId: user.accountId,
      name: user.name,
      email: user.email,
      picture: user.picture,
    });
  }

  return user;
};
