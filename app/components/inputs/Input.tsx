'use client';
// Import necessary modules and components
import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister 
} from "react-hook-form";
import { BiDollar } from "react-icons/bi";

// Define the properties that the Input component can accept
interface InputProps {
  id: string; // The HTML 'id' attribute for the input element.
  label: string; // The label text for the input.
  type?: string; // Optional: The input type (default is "text").
  disabled?: boolean; // Optional: Whether the input is disabled.
  formatPrice?: boolean; // Optional: Whether to show a dollar icon for price formatting.
  required?: boolean; // Optional: Whether the input is required.
  register: UseFormRegister<FieldValues>; // React Hook Form's register function.
  errors: FieldErrors; // React Hook Form's error object.
}

// Define the Input component using the functional component syntax.
const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text", 
  disabled, 
  formatPrice,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {/* Show a dollar icon if 'formatPrice' prop is true */}
      {formatPrice && (
        <BiDollar
          size={24}  
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      {/* Input element */}
      <input
        id={id}
        disabled={disabled}
        // Register the input with React Hook Form and set 'required' validation if needed
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
      {/* Label element */}
      <label 
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
    </div>
  );
}

// Export the Input component as the default export of the module.
export default Input;
