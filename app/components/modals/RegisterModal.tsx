'use client';
// Import necessary libraries and components
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

// -----------------------------------------------------------------------------
// Define the RegisterModal component
const RegisterModal= () => {
  // Use custom hooks to manage modals and their state
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);

  // React Hook Form configuration
  const { 
    register, 
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // Send a POST request to the registration endpoint
    axios.post('/api/register', data)
      .then(() => {
        toast.success('Registered!');
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  // Function to toggle between register and login modals
  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])

  // Define the content of the modal body
  const bodyContent = (
    <div className="flex flex-col gap-4">
      {/* Heading component */}
      <Heading
        title="Welcome to Airbnb"
        subtitle="Create an account!"
      />
      {/* Input components */}
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  // Define the content of the modal footer
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      {/* Button components for social sign-in */}
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')} 
      />
      <Button 
        outline 
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      {/* Text and link to toggle between modals */}
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Already have an account?
          <span 
            onClick={onToggle} 
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  )

  // Render the Modal component with the defined content
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;

