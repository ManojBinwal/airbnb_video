// In summary, the CategoryView component takes in three props: icon, label, and description. It renders these props in a flex container, with the provided icon displayed at the left, the label in a larger and bold font, and the description in a lighter font. This component is versatile and can be used to create a consistent and visually appealing layout for displaying various categories or features in your application.

'use client';

import { IconType } from "react-icons";

interface CategoryViewProps {
  icon: IconType,
  label: string,
  description: string
}

const CategoryView: React.FC<CategoryViewProps> = ({ 
  icon: Icon,
  label,
  description
 }) => {
  return ( 
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col">
            <div 
              className="text-lg font-semibold"
            >
              {label}
            </div>
            <div 
              className="text-neutral-500 font-light"
            >
              {description}
            </div>
        </div>
      </div>
    </div>
   );
}
 
export default CategoryView;