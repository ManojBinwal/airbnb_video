//n this code, the ToasterProvider component is rendering the <Toaster /> component as its child. This means that when you include the ToasterProvider component in your application's component hierarchy, it will ensure that the toast notifications rendered by the <Toaster /> component are displayed at the appropriate location in your UI.

// To use the ToasterProvider, you would typically include it in a higher-level component, such as a layout component or a component that wraps the main content of your application. This way, the toast notifications will be accessible and visible to the entire application.

'use client';

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return ( 
    <Toaster />
   );
}
 
export default ToasterProvider;
