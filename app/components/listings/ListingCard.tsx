//In summary, the ListingCard component displays information about a listing, including its image, location, category, price, and an optional action button. It provides interactivity by allowing users to click on the card to navigate to the listing's details page and to favorite listings. The component is highly customizable through its props and provides a visually appealing and functional way to display and interact with listings.

'use client';

// Importing necessary dependencies
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';

// Importing hooks and types
import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

// Importing custom components
import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";

// Defining the props that the ListingCard component accepts
interface ListingCardProps {
  data: SafeListing;  // Listing details
  reservation?: SafeReservation;  // Reservation details
  onAction?: (id: string) => void;  // Action handler
  disabled?: boolean;  // Whether the action button is disabled
  actionLabel?: string;  // Label for the action button
  actionId?: string;  // Action ID
  currentUser?: SafeUser | null;  // Current user's information
};

// The actual ListingCard component
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  // Getting location information using the useCountries hook
  const location = getByValue(data.locationValue);

  // Handling the action button's click event
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  // Calculating the displayed price based on reservation or listing data
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  // Calculating and formatting the reservation date range
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
  
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div 
      onClick={() => router.push(`/listings/${data.id}`)} 
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div 
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartButton 
              listingId={data.id} 
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {price}
          </div>
          {!reservation && (
            <div className="font-light">night</div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
   );
}
 
export default ListingCard;
