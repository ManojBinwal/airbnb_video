//this custom hook simplifies the management of the search modal's open/close state and provides a clean way to handle its behavior throughout the application. It encapsulates the state and logic related to the search modal, making it easier to use and maintain.

import { create } from 'zustand';

// Define the structure of the state for the SearchModalStore.
interface SearchModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// Create a custom hook named "useSearchModal" using zustand's "create" function.
const useSearchModal = create<SearchModalStore>((set) => ({
  isOpen: false, // Initial state: Modal is closed by default.
  onOpen: () => set({ isOpen: true }), // Function to open the modal.
  onClose: () => set({ isOpen: false }) // Function to close the modal.
}));

// Export the custom hook for use in other parts of the application.
export default useSearchModal;
