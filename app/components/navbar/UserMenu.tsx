'use client';
// Import necessary modules and components.
import { useCallback, useState } from "react"; // Import hooks from React.
import { AiOutlineMenu } from "react-icons/ai"; // Import the AiOutlineMenu icon from react-icons library.
import { signOut } from "next-auth/react"; // Import the signOut function from next-auth/react.
import { useRouter } from "next/navigation"; // Import the useRouter hook for handling navigation.

import useLoginModal from "@/app/hooks/useLoginModal"; // Custom hook for handling login modal.
import useRegisterModal from "@/app/hooks/useRegisterModal"; // Custom hook for handling register modal.
import useRentModal from "@/app/hooks/useRentModal"; // Custom hook for handling rent modal.
import { SafeUser } from "@/app/types"; // Import the SafeUser type from a specific module.

import MenuItem from "./MenuItem"; // Import the MenuItem component.
import Avatar from "../Avatar"; // Import the Avatar component.

// Define the UserMenu component as a functional component.
interface UserMenuProps {
  currentUser?: SafeUser | null; // Props may include information about the current user.
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser, // The current user passed as a prop.
}) => {
  const router = useRouter(); // Initialize the useRouter hook.

  // Initialize custom hooks for modals.
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();



  // ---- State and Toggle Functions ----

  // Initialize state to manage menu open/close.
  const [isOpen, setIsOpen] = useState(false);

  // Define a function to toggle the menu open/close.
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value); 
    // setIsOpen takes current value and returns opposite
  }, []);



  // ---- Event Handlers ----

  // Define an event handler for the "Rent" option.
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen(); // Open login modal if not logged in.
    }
    rentModal.onOpen(); // Open rent modal.
  }, [loginModal, rentModal, currentUser]);



  // ---- Rendering UserMenu Component UI ----

  return ( 
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {/* Render the "Airbnb your home" option */}
        <div 
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Airbnb your home
        </div>

        {/* Render the menu icon and avatar */}
        <div 
        onClick={toggleOpen}
        className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu /> {/* Render the menu icon */}
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} /> {/* Render the user's avatar */}
          </div>
        </div>
      </div>

      {/* Render the dropdown menu */}
      {isOpen && (
        <div 
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              // If user is logged in, show user-related options
              <>
                <MenuItem 
                  label="My trips" 
                  onClick={() => router.push('/trips')}
                />
                <MenuItem 
                  label="My favorites" 
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem 
                  label="My reservations" 
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem 
                  label="My properties" 
                  onClick={() => router.push('/properties')}
                />
                <MenuItem 
                  label="Airbnb your home" 
                  onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem 
                  label="Logout" 
                  onClick={() => signOut()}
                />
              </>
            ) : (
              // If user is not logged in, show login and signup options
              <>
                <MenuItem 
                  label="Login" 
                  onClick={loginModal.onOpen}
                />
                <MenuItem 
                  label="Sign up" 
                  onClick={registerModal.onOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
   );
}

// Export the UserMenu component as the default export of this module.
export default UserMenu;
