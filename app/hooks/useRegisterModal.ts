// Import the 'create' function from the 'zustand' library.
import { create } from 'zustand';

// Define an interface that describes the structure of the store's state.
interface RegisterModalStore {
  isOpen: boolean;   // A boolean value indicating whether the modal is open.
  onOpen: () => void;   // A function to open the modal.
  onClose: () => void;  // A function to close the modal.
}

// Create a custom hook called 'useRegisterModal' using the 'create' function.
const useRegisterModal = create<RegisterModalStore>((set) => ({
  // The initial state of the store.

  // the set function is a function provided by the zustand library that is used to update the state within the store. It allows you to modify the values of the state properties defined in your custom store.  
  //The main purpose of the set function is to ensure that state updates are managed in a safe and consistent manner. It abstracts away the complexities of directly modifying state, such as handling concurrency and batched updates. When you call the set function and provide an object with updated state values, zustand takes care of updating the state, re-rendering components that depend on that state, and maintaining the immutability of the state. This helps in avoiding common issues like race conditions and incorrect updates in complex UI applications.

  isOpen: false,   // The modal is initially not open.
  
  // Define a function 'onOpen' that, when called, sets the 'isOpen' state to 'true'.
  onOpen: () => set({ isOpen: true }),

  // Define a function 'onClose' that, when called, sets the 'isOpen' state to 'false'.
  onClose: () => set({ isOpen: false })
}));

// Export the 'useRegisterModal' custom hook as the default export of the module.
export default useRegisterModal;

