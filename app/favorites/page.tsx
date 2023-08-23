// This code snippet defines a React functional component named ListingPage that is responsible for rendering the user's favorite listings page. The component fetches the user's favorite listings using the getFavoriteListings action and retrieves the current user's information using the getCurrentUser action. It then conditionally renders either the FavoritesClient component or an EmptyState component, based on whether the user has any favorite listings.

//In summary, the ListingPage component fetches the user's favorite listings and the current user's information using the respective actions. It then conditionally renders either the FavoritesClient component, which displays the user's favorite listings, or an EmptyState component with a message indicating that the user has no favorite listings. This component provides a structured way to present the user's favorite listings in a visually appealing manner and provide feedback when there are no favorites to display. The ClientOnly component is used to ensure that the components are only rendered on the client side to avoid potential issues during server-side rendering.
'use-client';

import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";

import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  // Fetching the user's favorite listings
  const listings = await getFavoriteListings();
  
  // Fetching the current user's information
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    // If no favorite listings are found, display the EmptyState component
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  // If there are favorite listings, render the FavoritesClient component
  return (
    <ClientOnly>
      <FavoritesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ListingPage;
