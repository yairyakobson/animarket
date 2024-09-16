/*
  useTransition: For smooth transitions during optimistic update
  optimisticUser: Hold the optimistic user state
  
  handleOptimisticUpdate: The function executed
  when we optimistically update the UI
  using startTransition coming from the useTransition hook

  ...data: Displays new data
  picture: Set new picture preview

  try-catch block:
  1. Starts with an API call of the mutation to update the user profile
  2. Refetch the updated user data and dispatch it to Redux
  3. dispatch(setUser(data)); // Updates the state with new user data
  4. The catch block reverts back to the original data in case an error occurs
*/


import { useState, useTransition } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "../redux/features/userSlice";

export const useOptimisticUpdate = (updateProfileMutation, refetchUser) =>{
  const [isPending, startTransition] = useTransition();
  const [optimisticUser, setOptimisticUser] = useState(null);
  const dispatch = useDispatch();

  const handleOptimisticUpdate = async(data, user, imgPreview, onSuccess) =>{
    // Optimistically update the UI
    startTransition(() =>{
      setOptimisticUser((prevUser) =>({
        ...prevUser,
        ...data,
        picture: { ...prevUser?.picture, url: imgPreview }
      }));
    });

    try{
      // API call
      await updateProfileMutation(data).unwrap();

      // Refetch the updated user data from the server
      refetchUser().then(({ data }) =>{
        dispatch(setUser(data)); // Update Redux with new user data
      });

      if(onSuccess) onSuccess();
    }
    catch(err){
      setOptimisticUser(user); // Revert to original user data
      throw new Error("Failed to update profile");
    }
  };

  return { optimisticUser, handleOptimisticUpdate, isPending };
};