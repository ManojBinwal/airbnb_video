// Import necessary modules or components.
import { SafeUser } from "@/app/types"; // Importing SafeUser type from a specific module.
import Categories from "./Categories"; // Importing the Categories component.
import Container from "../Container"; // Importing the Container component.
import Logo from "./Logo"; // Importing the Logo component.
import Search from "./Search"; // Importing the Search component.
import UserMenu from "./UserMenu"; // Importing the UserMenu component.

// Define an interface to specify the expected props for the Navbar component.
interface NavbarProps {
  currentUser?: SafeUser | null; // Props may include information about the current user.
}

// Define the Navbar component as a functional component.
const Navbar: React.FC<NavbarProps> = ({
  currentUser, // The current user passed as a prop.
}) => {
  return (
    // Render a <div> that forms the top navigation bar.
    <div className="fixed w-full bg-white z-10 shadow-sm">
      {/* Render a nested <div> that contains the navigation content. */}
      <div
        className="
          py-4               // Apply vertical padding.
          border-b-[1px]      // Add a 1-pixel bottom border.
        "
      >
        {/* Use the Container component to wrap the navigation content. */}
        <Container>
          {/* Render a flex container with various layout styles. Anything wrapped inside is passed as children to container component */}
          <div 
            className="
              flex             // Use flex layout.
              flex-row         // Arrange children horizontally.
              items-center     // Align items vertically centered.
              justify-between // Space out items along the row.
              gap-3            // Add a gap between flex items.
              md:gap-0         // Remove gap on medium-sized screens.
            "
          >
            <Logo />          {/* Render the Logo component. */}
            <Search />        {/* Render the Search component. */}
            {/* Render the UserMenu component with the currentUser prop. */}
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      {/* Render the Categories component outside the nested <div>. */}
      <Categories />
    </div>
  );
}

// Export the Navbar component as the default export of this module.
export default Navbar;
