'use client';
// Import necessary modules and components.
import { IconType } from "react-icons";

// Define the props interface to specify the expected properties of the Button component.
interface ButtonProps {
  label: string; // Label text for the button.
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // Function to call when the button is clicked.
  disabled?: boolean; // Whether the button is disabled.
  outline?: boolean; // Whether the button has an outline style.
  small?: boolean; // Whether to use a smaller button size.
  icon?: IconType; // Icon component (from react-icons) to be displayed before the label.
}

// Define the Button component using the functional component syntax.
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'border-black' : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
    >
      {/* ---- Icon (if provided) ---- */}
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {/* Button label */}
      {label}
    </button>
  );
}

// Export the Button component as the default export of the module.
export default Button;
