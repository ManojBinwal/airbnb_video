'use client';
// Import the Image component from the "next/image" package.
import Image from "next/image";
// next/image automatically generates width, height, and blurDataURL values for statically imported images. These values are used to prevent Cummulative Layout Shift (CLS) before the image is finally loaded.
//You should always add the width and height props in the image component when using remote images because NextJS cannot determine the images dimension during the build process for proper page rendering to prevent layout shifts.

// Define the properties that the Avatar component accepts.
interface AvatarProps {
  src: string | null | undefined; // The source URL of the avatar image, can be a string or null or undefined.
}

// Define the Avatar component using React functional component syntax.
const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return ( 
    // Render the Image component from "next/image".
    <Image 
      className="rounded-full" // Apply a CSS class for styling the image as a rounded circle.
      height="30" // Set the height of the image to 30 pixels.
      width="30" // Set the width of the image to 30 pixels.
      alt="Avatar" // Provide an alternative text for the image, accessible to screen readers.
      src={src || '/images/placeholder.jpg'} // Use the provided src if available, otherwise use a placeholder image.
    />
   );
}
 
// Export the Avatar component as the default export of the module.
export default Avatar;
