// In this code, the PropertiesPage component first fetches the current user using the getCurrentUser function. If the user is not logged in, it renders an "Unauthorized" message using the EmptyState component. If the user is logged in, it fetches the user's listings using the getListings function with the user's ID. If the user has no properties, an "EmptyState" indicating so is displayed. Finally, if the user has properties, the PropertiesClient component is rendered with the fetched data, including the listings and the current user's information. The ClientOnly wrapper ensures that the component is only rendered on the client side.

import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  // Get the current user
  const currentUser = await getCurrentUser();

  // If user is not logged in, show an "Unauthorized" message
  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
      />
    );
  }

  // Fetch listings associated with the current user
  const listings = await getListings({ userId: currentUser.id });

  // If user has no properties, show an "EmptyState"
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    );
  }

  // Render the PropertiesClient component with the fetched data
  return (
    <ClientOnly>
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default PropertiesPage;
