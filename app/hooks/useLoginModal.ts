//This custom hook simplifies the management of the login modal's open/close state and provides a clean way to handle its behavior throughout the application. It encapsulates the state and logic related to the login modal, making it easier to use and maintain.

import { create } from 'zustand';

// Define the structure of the state for the LoginModalStore.
interface LoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// Create a custom hook named "useLoginModal" using zustand's "create" function.
const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false, // Initial state: Modal is closed by default.
  onOpen: () => set({ isOpen: true }), // Function to open the modal.
  onClose: () => set({ isOpen: false }) // Function to close the modal.
}));

// Export the custom hook for use in other parts of the application.
export default useLoginModal;
