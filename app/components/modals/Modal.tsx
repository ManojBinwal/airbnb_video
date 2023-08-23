'use client';
// Import necessary modules and components.
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "../Button"; 

// Define the props interface to specify the expected properties of the Modal component.
interface ModalProps {
  isOpen?: boolean; // Whether the modal is open or not.
  onClose: () => void; // Function to call when the modal is closed.
  onSubmit: () => void; // Function to call when the main action button is clicked.
  title?: string; // Title of the modal.
  body?: React.ReactElement; // Content to display in the modal body.
  footer?: React.ReactElement; // Additional content to display in the modal footer.
  actionLabel: string; // Label for the main action button.
  disabled?: boolean; // Whether the main action button is disabled.
  secondaryAction?: () => void; // Function to call when the secondary action button is clicked.
  secondaryActionLabel?: string; // Label for the secondary action button.
}

// Define the Modal component using the functional component syntax.
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  // State to control the visibility of the modal.
  const [showModal, setShowModal] = useState(isOpen);

  // Use useEffect to update the showModal state when isOpen changes.
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // ---- Callback Functions ----
  
  // Callback function to handle modal close.
  const handleClose = useCallback(() => {
    if (disabled) {
      return; // If disabled, don't perform any action.
    }
    setShowModal(false); // Hide the modal with an animation.
    setTimeout(() => {
      onClose(); // Call the provided onClose function after a delay.
    }, 300); // Delay before calling the onClose function.
  }, [onClose, disabled]);

  // Callback function to handle main action button click.
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return; // If disabled, don't perform any action.
    }
    onSubmit(); // Call the provided onSubmit function.
  }, [onSubmit, disabled]);

  // Callback function to handle secondary action button click.
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return; // If disabled or no secondaryAction, don't perform any action.
    }
    secondaryAction(); // Call the provided secondaryAction function.
  }, [secondaryAction, disabled]);

  // ---- Rendering ----

  // If the modal is not open, return null to prevent rendering.
  if (!isOpen) {
    return null;
  }

  // ---- Modal Rendering ----
  
  // Render the modal content.
  return (
    <>
      <div className="
        justify-center 
        items-center 
        flex 
        overflow-x-hidden 
        overflow-y-auto 
        fixed 
        inset-0 
        z-50 
        outline-none 
        focus:outline-none
        bg-neutral-800/70
      ">
        <div className="
          relative 
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto 
          h-full 
          lg:h-auto
          md:h-auto
        ">
          {/* ---- Modal Content ---- */}

          {/* {adding animation on open and close} */}
          <div className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              outline-none 
              focus:outline-none
            ">
              {/* ---- Modal Header ---- */}
              <div className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
              ">
                {/* Close button */}
                <button
                  className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  "
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                {/* Title */}
                <div className="text-lg font-semibold">
                  {title}
                </div>
              </div>
              {/* ---- Modal Body ---- */}
              <div className="relative p-6 flex-auto">
                {body}
              </div>
              {/* ---- Modal Footer ---- */}
              <div className="flex flex-col gap-2 p-6">
                <div 
                  className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    w-full
                  "
                >
                  {/* Secondary action button */}
                  {secondaryAction && secondaryActionLabel && (
                    <Button 
                      disabled={disabled} 
                      label={secondaryActionLabel} 
                      onClick={handleSecondaryAction}
                      outline
                    />  
                  )}
                  {/* Main action button */}
                  <Button 
                    disabled={disabled} 
                    label={actionLabel} 
                    onClick={handleSubmit}
                  />
                </div>
                {/* Additional footer content */}
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Export the Modal component as the default export of the module.
export default Modal;
