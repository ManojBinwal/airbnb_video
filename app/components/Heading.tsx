// Overall Purpose: This code defines a reusable React component called "Heading" that displays a title and an optional subtitle with the option to center-align the content.

// Importing required modules and dependencies.
'use client';

// Defining the properties expected by the Heading component.
interface HeadingProps {
  title: string;      // The main title text.
  subtitle?: string;  // An optional subtitle text.
  center?: boolean;   // An optional flag to center-align the content.
}

// Defining the functional component named "Heading" using React.FC (Functional Component) type.
const Heading: React.FC<HeadingProps> = ({ 
  title, 
  subtitle,
  center
}) => {
  return ( 
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-2xl font-bold">
        {title}  {/* Displaying the main title */}
      </div>
      <div className="font-light text-neutral-500 mt-2">
        {subtitle}  {/* Displaying the subtitle */}
      </div>
    </div>
   );
}
 
export default Heading;  // Exporting the Heading component to be used in other parts of the application.
