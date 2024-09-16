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