// Import the necessary modules or components.
'use client'; 
// The "use client" directive is a convention to declare a boundary between a Server and Client Component module graph. "use client" sits between server-only and client code.

// Define an interface to specify the expected props for the Container component.
interface ContainerProps {
  children: React.ReactNode; 
  // ReactNode is a type that represents a React element, an array of React elements, or a string, number, or boolean. It is defined in the react module and can be used to specify the type of a variable that can hold any of these types.
}

// Define the Container component as a functional component.
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    // Render a <div> element that acts as the container.
    <div
      className="
        max-w-[2520px]  // Set maximum width to 2520 pixels.
        mx-auto          // Center the container horizontally.
        xl:px-20         // Add horizontal padding for extra-large screens.
        md:px-10         // Add horizontal padding for medium screens.
        sm:px-2          // Add horizontal padding for small screens.
        px-4             // Add horizontal padding for all screens.
      "
    >
      {/* Render the child components passed to the Container. */}
      {children}
    </div>
  );
};

// Export the Container component as the default export of this module.
export default Container;
