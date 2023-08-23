// In summary, the HeartButton component provides an interactive button for favoriting and unfavoriting listings. It relies on the useFavorite custom hook to manage the favorite state and toggle the favorite status when clicked. The component displays two icons: the filled heart (AiFillHeart) in a specific color when the listing is favorited, and the outline heart (AiOutlineHeart) when the listing is not favorited. The color of the filled heart icon changes based on the favorite state. The component also includes styles for hover effects and client-side rendering to ensure smooth interactions.

'use client';

// Importing necessary dependencies
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// Importing a custom hook and types
import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";

// Importing a component to ensure client-side rendering
import ClientOnly from "./ClientOnly";

// Defining the props that the HeartButton component accepts
interface HeartButtonProps {
  listingId: string;  // The ID of the listing to favorite/unfavorite
  currentUser?: SafeUser | null;  // Current user's information
}

// The actual HeartButton component
const HeartButton: React.FC<HeartButtonProps> = ({ 
  listingId,
  currentUser
}) => {
  // Using the useFavorite hook to manage favorite state and interaction
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser
  });

  return (
    <div 
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={
          hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'
        }
      />
    </div>
   );
}
 
export default HeartButton;