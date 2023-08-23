//In summary, the Counter component displays a title and subtitle, along with a numeric value, minus button, and plus button. The component accepts a value prop, an onChange callback, a title, and a subtitle. The plus and minus buttons are implemented as clickable div elements with appropriate styling and hover effects. The onAdd and onReduce callback functions handle incrementing and decrementing the value while considering the minimum value of 1. The Counter component provides a clean and reusable way to create increment and decrement UI controls for numeric values.

'use client';

// Importing the necessary dependencies
import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

// Defining the props that the Counter component accepts
interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

// The actual Counter component
const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  // Callback function to increment the value
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  // Callback function to decrement the value
  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return ( 
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        {/* Displaying the title and subtitle */}
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">
          {subtitle}
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        {/* Minus button */}
        <div
          onClick={onReduce}
          className="
            w-10 h-10 rounded-full border-[1px] border-neutral-400
            flex items-center justify-center text-neutral-600 cursor-pointer
            hover:opacity-80 transition
          "
        >
          <AiOutlineMinus />
        </div>
        
        {/* Displaying the value */}
        <div className="font-light text-xl text-neutral-600">
          {value}
        </div>
        
        {/* Plus button */}
        <div
          onClick={onAdd}
          className="
            w-10 h-10 rounded-full border-[1px] border-neutral-400
            flex items-center justify-center text-neutral-600 cursor-pointer
            hover:opacity-80 transition
          "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
   );
}
 
export default Counter;
