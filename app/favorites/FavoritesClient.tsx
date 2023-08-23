// This code snippet defines a React functional component named FavoritesClient that is responsible for rendering a list of favorite listings. The component receives an array of SafeListing objects and the current user's information (SafeUser), and it displays these listings using the ListingCard component.

// In summary, the FavoritesClient component receives an array of favorite listings and the current user's information. It displays a heading indicating that these are the user's favorites, and then it maps through the array of listings and renders a ListingCard component for each listing. This component provides a structured way to display a user's favorite listings in a consistent and visually appealing manner.

import { SafeListing, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";

interface FavoritesClientProps {
  listings: SafeListing[], // Array of SafeListing objects
  currentUser?: SafeUser | null, // Current user's information
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser
}) => {
  return (
    <Container>
      {/* Displaying a heading for the favorites section */}
      <Heading
        title="Favorites"
        subtitle="List of places you favorited!"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {/* Mapping through the array of listings and rendering ListingCard components */}
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default FavoritesClient;
