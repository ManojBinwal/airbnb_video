// In summary, the EmptyState component provides a user-friendly message to indicate that there are no matching results. It includes customizable title and subtitle props for displaying different messages. If the showReset prop is set to true, it displays a "Remove all filters" button. Clicking this button will navigate the user back to the main page ('/') to reset any applied filters. The Heading component is used to display the title and subtitle in a visually appealing way.

// This component is useful for improving the user experience when there are no results to display and provides an option to reset filters if necessary.

'use client';

// Importing necessary dependencies
import { useRouter } from "next/navigation";

// Importing custom components
import Button from "./Button";
import Heading from "./Heading";

// Defining the props that the EmptyState component accepts
interface EmptyStateProps {
  title?: string;  // Title of the empty state message
  subtitle?: string;  // Subtitle of the empty state message
  showReset?: boolean;  // Whether to show the reset button
}

// The actual EmptyState component
const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset
}) => {
  const router = useRouter();

  return ( 
    <div 
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
   );
}
 
export default EmptyState;
