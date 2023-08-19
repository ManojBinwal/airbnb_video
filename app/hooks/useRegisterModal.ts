//npm install zustand
//npm run dev and refresh the browser immediately

import { create } from 'zustand';

interface RegisterModalStrore {
    isOpen: Boolean;
    onOpen: () => void;
    onClose: ()=> void;

}

const useRegisterModal = create<RegisterModalStrore> ((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen:true}),
    onClose: () => set({isOpen:false}),
}));

export default useRegisterModal;

