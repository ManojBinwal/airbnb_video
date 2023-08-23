// Import necessary modules or components.
'use client'; 
import Image from "next/image"; 
import { useRouter } from "next/navigation"; 
// Import the useRouter hook for handling navigation.

// Define the Logo component as a functional component.
const Logo = () => {
  const router = useRouter();
   // Initialize the useRouter hook.

  return ( 
    // Render an Image component that acts as the logo.
    <Image
      onClick={() => router.push('/')} // Add a click event to navigate to the home page.
      className="hidden md:block cursor-pointer" // Apply styling classes to the Image.
      src="/images/logo.png" // Set the image source.
      height="100" // Set the image height.
      width="100" // Set the image width.
      alt="Logo" // Provide an alt text for the image.
    />
   );
}

// Export the Logo component as the default export of this module.
export default Logo;
