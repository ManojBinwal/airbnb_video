//In summary, the Loader component renders a PuffLoader from the react-spinners library. The loader is displayed at the center of the screen and has a size of 100 pixels and a red color. This type of loader visually communicates to users that content or data is being loaded, providing a better user experience while waiting for information to appear on the screen. You can customize the size and color of the loader according to your design preferences.

'use client';

// Importing the PuffLoader component from the react-spinners library
import { PuffLoader } from "react-spinners";

// Defining the Loader component
const Loader = () => {
  return ( 
    <div
      className="
        h-[70vh]
        flex 
        flex-col 
        justify-center 
        items-center 
      "
    >
      {/* Rendering the PuffLoader component */}
      <PuffLoader
        size={100} // Size of the loader
        color="red" // Color of the loader
      />
    </div>
   );
}
 
export default Loader;
