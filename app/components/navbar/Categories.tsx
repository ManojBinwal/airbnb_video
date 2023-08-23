// Purpose of the code: This module defines a React component called 'Categories' that displays a list of categorized items with icons and descriptions. The component allows users to filter content based on selected categories by updating query parameters in the URL.

// Import necessary modules and components
'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import CategoryBox from "../CategoryBox"; 
import Container from '../Container'; 

// Define an array of category objects, each with a label, icon, and description
export const categories = [
  {
    label: 'Beach',
    icon: TbBeach,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
    description: 'This property is has windmills!',
  },
  {
    label: 'Modern',
    icon: MdOutlineVilla,
    description: 'This property is modern!'
  },
  {
    label: 'Countryside',
    icon: TbMountain,
    description: 'This property is in the countryside!'
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This is property has a beautiful pool!'
  },
  {
    label: 'Islands',
    icon: GiIsland,
    description: 'This property is on an island!'
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This property is near a lake!'
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This property has skiing activies!'
  },
  {
    label: 'Castles',
    icon: GiCastle,
    description: 'This property is an ancient castle!'
  },
  {
    label: 'Caves',
    icon: GiCaveEntrance,
    description: 'This property is in a spooky cave!'
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This property offers camping activities!'
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This property is in arctic environment!'
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This property is in the desert!'
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This property is in a barn!'
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This property is brand new and luxurious!'
  }
]

// Define the 'Categories' component
const Categories = () => {
  // Get query parameters and current pathname using hooks
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  // If not on the main page, return null (no rendering)
  if (!isMainPage) {
    return null;
  }

  // Render the category list within a 'Container'
  return (
    <Container>
      <div className="
        pt-4
        flex 
        flex-row 
        items-center 
        justify-between
        overflow-x-auto
      ">
        {/* Map through the 'categories' array and render a 'CategoryBox' for each */}
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label} // Highlight selected category based on query parameter
          />
        ))}
      </div>
    </Container>
  );
}

// Export the 'Categories' component as the default export
export default Categories;
