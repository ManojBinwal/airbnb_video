//This code snippet defines a custom hook named useFavorite which is designed to handle favoriting and unfavoriting listings. It uses Axios for making HTTP requests and React Hot Toast for displaying toast notifications.

// In summary, the useFavorite hook encapsulates the logic for toggling the favorite status of a listing. It checks whether the listing has been favorited by the current user, and based on that status, it either sends a POST or DELETE request to the appropriate API endpoint. After successfully making the request, it refreshes the router to reflect the updated favorite status and displays toast notifications to provide feedback to the user. If no user is logged in and the user tries to favorite a listing, the hook opens a login modal using the useLoginModal hook.

// This hook provides an easy way to handle the favorite feature while abstracting away the API requests and interactions with the login modal. It encapsulates the functionality in a reusable and self-contained manner.

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  // Using another custom hook for managing a login modal
  const loginModal = useLoginModal();

  // Checking if the current user has favorited the listing
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  // Toggling favorite status on click
  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    // If no user is logged in, open the login modal
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      // Determining whether to make a POST or DELETE request based on the current favorite status
      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }

      // Making the API request to favorite/unfavorite the listing
      await request();

      // Refreshing the router to reflect the changes
      router.refresh();

      // Displaying a success toast notification
      toast.success('Success');
    } catch (error) {
      // Displaying an error toast notification if the request fails
      toast.error('Something went wrong.');
    }
  }, 
  [
    currentUser, 
    hasFavorited, 
    listingId, 
    loginModal,
    router
  ]);

  // Returning the favorite status and toggle function
  return {
    hasFavorited,
    toggleFavorite,
  };
}

export default useFavorite;
