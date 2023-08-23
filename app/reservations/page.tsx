//In this code, the ReservationsPage component first fetches the current user using the getCurrentUser function. If there is no authenticated user, it renders an unauthorized empty state message within the ClientOnly component.

// If there is an authenticated user, it fetches reservations using the getReservations function with the authorId parameter set to the current user's ID. If there are no reservations, it renders an empty state message indicating that there are no reservations.

// If there are reservations, it renders the TripsClient component and passes the reservations and current user as props.


import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import TripsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly> 
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}
 
export default ReservationsPage;
