// In summary, this code defines a Zustand store called useRentModal that manages the state of a rent modal. The store has three pieces of state:

    // isOpen: A boolean indicating whether the rent modal is open or not.
    // onOpen: A function that sets the isOpen state to true, opening the rent modal.
    // onClose: A function that sets the isOpen state to false, closing the rent modal.
    
// The create function from Zustand is used to create the store by passing in an initial state object and defining the actions that can modify the state. This allows components to easily manage the visibility of the rent modal by interacting with the provided onOpen and onClose functions. The useRentModal hook can be imported and used in components to access and update the state of the rent modal.

import { create } from 'zustand';

// Defining the shape of the state managed by the store
interface RentModalStore {
  isOpen: boolean; // Whether the rent modal is open or not
  onOpen: () => void; // Function to open the rent modal
  onClose: () => void; // Function to close the rent modal
}

// Creating the store using Zustand's `create` function
const useRentModal = create<RentModalStore>((set) => ({
  isOpen: false, // Initial state: modal is closed
  onOpen: () => set({ isOpen: true }), // Action to open the modal
  onClose: () => set({ isOpen: false }) // Action to close the modal
}));

// Exporting the custom hook for using the store
export default useRentModal;
