// The Loading component serves a straightforward purpose – it displays a loading animation to the user. It does this by importing the Loader component and rendering it within its own return block. The Loader component presumably provides visual feedback to users that the application is in the process of loading content. The Loading component can be used throughout the application to indicate ongoing processes such as data fetching or background tasks.

import Loader from "@/app/components/Loader";

// Define the Loading component
const Loading = () => {
  return ( 
    // Render the Loader component to display a loading animation
    <Loader />
   );
}
 
// Export the Loading component as the default export of this module
export default Loading;
