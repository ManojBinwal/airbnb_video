// In summary, the ListingHead component is designed to render the header section of a listing with the title, location information, an image, and a heart button for favoriting the listing. It uses the Heading component to display the title and location information and the HeartButton component to render the heart-shaped button for favoriting. The image is displayed using the next/image component for optimal performance. This component provides a visually appealing and functional header for individual listings in your application.

'use client';

import Image from "next/image";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser
}) => {
  const { getByValue } = useCountries();

  // Get location details based on the locationValue using the useCountries hook
  const location = getByValue(locationValue);

  return ( 
    <>
      {/* Render the title and location information using the Heading component */}
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        {/* Render the listing image */}
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          {/* Render the HeartButton component for favoriting the listing */}
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
   );
}
 
export default ListingHead;
