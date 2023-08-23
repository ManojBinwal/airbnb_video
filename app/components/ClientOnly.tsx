'use client';

import React, { useState, useEffect } from 'react';

// Create props interface to define the structure of the "ClientOnly" component's props.
interface ClientOnlyProps {
  children: React.ReactNode; // The content to be rendered within the component.
}

// Define the "ClientOnly" component using a functional component syntax.

const ClientOnly: React.FC<ClientOnlyProps> = ({ 
  children // Destructure the "children" prop from the component's props.
}) => {
  // Declare a state variable named "hasMounted" to track whether the component has mounted.
  const [hasMounted, setHasMounted] = useState(false);

  // Use the "useEffect" hook to set "hasMounted" to true after the component mounts.
  useEffect(() => {
    setHasMounted(true); // This effect runs once after the initial render.
  }, [])

  // If the component has not yet mounted, return "null" to prevent rendering.
  if (!hasMounted) return null;

  // If the component has mounted, render the content wrapped by an empty fragment.
  return (
    <>
      {children}
    </>
  );
};

// Export the "ClientOnly" component as the default export of the module.
export default ClientOnly;
