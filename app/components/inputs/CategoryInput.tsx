//In summary, the CategoryBox component provides a simple and reusable way to display selectable category boxes. The component accepts an icon, label, selected status, and an onClick callback. The component's appearance changes based on whether it's selected or not. When clicked, it triggers the provided onClick callback with the label as a parameter, allowing the parent component to handle the category box selection. This component can be used to create a visually appealing and interactive way to choose from a set of categories.

'use client';

// Importing necessary dependencies
import { IconType } from "react-icons";

// Defining the props that the CategoryBox component accepts
interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

// The actual CategoryBox component
const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,       // The provided icon from a React Icons library
  label,            // The label for the category box
  selected,         // Whether the category box is selected or not
  onClick           // The click event handler for the category box
}) => {
  return ( 
    <div
      onClick={() => onClick(label)}  // Triggering the onClick event with the label as a parameter
      className={`
        rounded-xl border-2 p-4 flex flex-col gap-3
        hover:border-black transition cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
    >
      <Icon size={30} />  {/* Displaying the provided icon with a size of 30 */}
      <div className="font-semibold">
        {label}  {/* Displaying the label */}
      </div>
    </div>
   );
}
 
export default CategoryBox;
