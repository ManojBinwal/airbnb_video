//The code defines a React component called ErrorState, designed to handle and display error states within an application. The component imports the necessary libraries and components, specifically useEffect and an EmptyState component. It takes an error prop, which should be an instance of the Error class.

// When the ErrorState component mounts or when the error prop changes, it logs the error to the console using console.error(). It then renders an EmptyState component with a title "Uh Oh" and a subtitle "Something went wrong!" to visually indicate the occurrence of an error to the user.

'use client';

// Import necessary libraries and components
import { useEffect } from "react";
import EmptyState from "@/app/components/EmptyState";

// Define the props interface for the ErrorState component
interface ErrorStateProps {
  error: Error;
}

// Define the ErrorState component
const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  // Use the useEffect hook to log the error to the console when the component mounts
  useEffect(() => {
    console.error(error);
  }, [error]);

  return ( 
    // Render an EmptyState component with a message indicating an error
    <EmptyState
      title="Uh Oh"
      subtitle="Something went wrong!"
    />
   );
}
 
// Export the ErrorState component as the default export of this module
export default ErrorState;
