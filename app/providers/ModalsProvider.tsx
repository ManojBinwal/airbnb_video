//In this code, the ModalsProvider component simply renders instances of the various modal components within empty fragments (<>...</>) in the JSX. This structure allows you to provide these modal components globally to your application so that they can be used whenever needed.

// It's a good practice to have a central place where modal components are rendered, as it helps in managing and organizing the modals within your application. The ModalsProvider component can be placed at a high level in your component hierarchy, ensuring that the modal components are accessible throughout your application.

'use client';

import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import RentModal from "../components/modals/RentModal";
import SearchModal from "../components/modals/SearchModal";

const ModalsProvider = () => {
  return ( 
    <>
      <LoginModal />
      <RegisterModal />
      <SearchModal />
      <RentModal />
    </>
   );
}
 
export default ModalsProvider;