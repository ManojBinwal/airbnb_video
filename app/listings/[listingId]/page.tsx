//In this code, the ListingPage component fetches the necessary data using the provided utility functions getListingById, getReservations, and getCurrentUser. It then conditionally renders either an EmptyState component (if the listing doesn't exist) or the ListingClient component, which displays the detailed listing information, including reservations and user information. The ClientOnly wrapper ensures that the component is only rendered on the client side.

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  // Fetch the listing details, reservations, and current user
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  // If listing does not exist, show an empty state
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  // Render the ListingClient component with fetched data
  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ListingPage;
