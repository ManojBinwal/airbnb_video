//This component handles the rendering of individual category items within the Categories component (which you previously provided). When a category item is clicked, it updates the URL query parameters using the router from Next.js, allowing users to filter or navigate based on the selected category.

// Import necessary modules and hooks
'use client';

import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

// Define the prop types for the CategoryBox component
interface CategoryBoxProps {
  icon: IconType,
  label: string;
  selected?: boolean;
}

// Define the CategoryBox component
const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  // Define a callback function to handle category item clicks
  const handleClick = useCallback(() => {
    let currentQuery = {};
    
    // If there are parameters, parse them into an object
    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    // Create an updated query object with the selected category
    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    // If the current category is already selected, remove it from the query
    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    // Generate the new URL with the updated query parameters
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    // Use the router to navigate to the new URL
    router.push(url);
  }, [label, router, params]);

  // Render the category item
  return ( 
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      {/* Render the icon with a specified size */}
      <Icon size={26} />
      {/* Render the label */}
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
   );
}
 
// Export the CategoryBox component as the default export
export default CategoryBox;
