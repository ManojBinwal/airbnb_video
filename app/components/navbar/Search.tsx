'use client';
import { useSearchParams } from 'next/navigation'; // Import the useSearchParams hook from Next.js.
import { useMemo } from 'react'; // Import the useMemo hook from React.
import { BiSearch } from 'react-icons/bi'; // Import the BiSearch icon from the react-icons library.
import { differenceInDays } from 'date-fns'; // Import the differenceInDays function from date-fns library.
import useSearchModal from '@/app/hooks/useSearchModal'; // Custom hook for handling search modal.
import useCountries from '@/app/hooks/useCountries'; // Custom hook for managing country data.

// Define the Search component as a functional component.
const Search = () => {
  // ---- Initializing Hooks ----
  
  // Use the searchModal custom hook.
  const searchModal = useSearchModal();
  // Use the useSearchParams hook.
  const params = useSearchParams();
  // Use the getByValue function from useCountries hook.
  const { getByValue } = useCountries();

  // ---- Retrieving Query Parameter Values ----

  // Retrieve locationValue, startDate, endDate, and guestCount from query parameters.
  const locationValue = params?.get('locationValue'); 
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  // ---- Calculating Labels using useMemo ----

  // Calculate the location label using useMemo.
  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    return 'Anywhere';
  }, [locationValue, getByValue]);

  // Calculate the duration label using useMemo.
  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);
      if (diff === 0) {
        diff = 1;
      }
      return `${diff} Days`;
    }
    return 'Any Week';
  }, [startDate, endDate]);

  // Calculate the guest label using useMemo.
  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return 'Add Guests';
  }, [guestCount]);

  // ---- Rendering Search Component UI ----

  return ( 
    <div
      onClick={searchModal.onOpen} // Open the search modal on click.
      className="
        border-[1px] 
        w-full 
        md:w-auto 
        py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
      "
    >
      <div 
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div 
          className="
            text-sm 
            font-semibold 
            px-6
          "
        >
          {locationLabel} {/* Display the location label */}
        </div>
        <div 
          className="
            hidden 
            sm:block 
            text-sm 
            font-semibold 
            px-6 
            border-x-[1px] 
            flex-1 
            text-center
          "
        >
          {durationLabel} {/* Display the duration label */}
        </div>
        <div 
          className="
            text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
          "
        >
          <div className="hidden sm:block">{guestLabel}</div> {/* Display the guest label */}
          <div 
            className="
              p-2 
              bg-rose-500 
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} /> {/* Render the search icon */}
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the Search component as the default export of this module.
export default Search;