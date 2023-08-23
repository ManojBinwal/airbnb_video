// This code defines the behavior of the TripsPage component in a web application.
// It fetches information about the current user and their reservations,
// and renders different content based on the user's authentication status and reservation data.

// Import necessary components and functions
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import TripsClient from "./TripsClient";

// Define the TripsPage component as an asynchronous function
const TripsPage = async () => {
  // Fetch the current user's data
  const currentUser = await getCurrentUser();

  // If the user is not logged in, display an unauthorized message
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    );
  }

  // Fetch reservations associated with the current user
  const reservations = await getReservations({ userId: currentUser.id });

  // If the user has no reservations, display a message indicating no trips
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you haven't reserved any trips."
        />
      </ClientOnly>
    );
  }

  // If the user has reservations, render the TripsClient component to display the trip information
  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}

// Export the TripsPage component as the default export of this module
export default TripsPage;



//------------------------- Explanation of Code -------------------------

// This code defines a React functional component named TripsPage.
// It serves as a page that displays the trips associated with the current user.

// The component fetches the current user's data by calling the getCurrentUser() function.
// This function is presumably defined elsewhere and returns the user's information.

// If the currentUser is falsy (indicating that the user is not authenticated), the component displays an EmptyState component
// with a message stating that the user is unauthorized and needs to log in. The ClientOnly component is used to ensure
// that this content is only rendered on the client side (not during server-side rendering).

// If the currentUser is authenticated, the component fetches reservations associated with the user by calling the getReservations() function.
// The getReservations() function takes an object with a userId property to retrieve the reservations for the current user.

// If the user has no reservations (reservations.length === 0), the component displays an EmptyState component with a message
// indicating that no trips were found for the user.

// If the user has reservations, the component renders the TripsClient component. This component presumably takes the reservations
// and currentUser as props and displays the trip information in a meaningful way.

// The entire component is wrapped in the ClientOnly component, which ensures that the content is only rendered on the client side.
// This is useful for components that rely on client-specific data or behavior.

// Finally, the TripsPage component is exported as the default export of the module, making it available for use in other parts of the application.
