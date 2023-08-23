//In summary, the Home component fetches listings and the current user's information, then dynamically renders listing cards using the fetched data. It utilizes the ListingCard component to display each listing's details. If there are no listings to display, an EmptyState component is rendered. The grid layout adapts responsively to different screen sizes. Additionally, the ClientOnly component ensures that the rendering occurs on the client side, which can be important for components that depend on browser-specific functionality.
'use-client';

import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

// Importing functions to fetch data
import getListings, { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";

// Importing a component to ensure client-side rendering
import ClientOnly from "./components/ClientOnly";

// Defining the props that the Home component accepts
interface HomeProps {
  searchParams: IListingsParams; // Parameters for fetching listings
}

// The actual Home component
const Home = async ({ searchParams }: HomeProps) => {
  // Fetching listings and current user information
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  // Handling the case where there are no listings to display
  if (listings.length === 0) {
    return (
      <ClientOnly> {/* Ensuring client-side rendering */}
        <EmptyState showReset /> {/* Showing an empty state component */}
      </ClientOnly>
    );
  }

  // Rendering the listings in a grid layout
  return (
    <ClientOnly>
      <Container>
        <div 
          className="
            pt-24
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
          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;
