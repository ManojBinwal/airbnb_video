//In summary, the ImageUpload component integrates Cloudinary's upload widget to allow users to upload images. Upon successful upload, the provided onChange callback is called with the secure URL of the uploaded image. The component renders a clickable area that triggers the upload widget. If an value prop (URL of an uploaded image) is provided, the component displays the uploaded image using the Next.js Image component. This component provides a user-friendly way to handle image uploads and displays the uploaded image in a visually appealing manner.

'use client';

// Importing necessary dependencies
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb'

// Declaring a global variable for Cloudinary (this might be provided by the Cloudinary script)
declare global {
  var cloudinary: any
}

// Cloudinary upload preset for image upload
const uploadPreset = "z1wdo6ao";

// Defining the props that the ImageUpload component accepts
interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

// The actual ImageUpload component
const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value
}) => {
  // Callback function to handle image upload
  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, [onChange]);

  return (
    <CldUploadWidget 
      onUpload={handleUpload} 
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}  // Triggering the upload widget on click
            className="
              relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 
              border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600
            "
          >
            <TbPhotoPlus size={50} /> {/* Icon for adding photo */}
            <div className="font-semibold text-lg">
              Click to upload
            </div>
            {value && (
              // Displaying the uploaded image
              <div className="absolute inset-0 w-full h-full">
                <Image
                  fill 
                  style={{ objectFit: 'cover' }} 
                  src={value} 
                  alt="House" 
                />
              </div>
            )}
          </div>
        ) 
      }}
    </CldUploadWidget>
  );
}

export default ImageUpload;
