// Overall Purpose: This code defines a React component for a login modal. It uses several imported components and hooks to manage user login and display the modal.

// Importing required modules and dependencies.
'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal"; // A component for rendering a modal dialog.
import Input from "../inputs/Input"; // A component for rendering an input field.
import Heading from "../Heading"; // A component for rendering a heading.
import Button from "../Button"; // A component for rendering a button.

// Defining the LoginModal component.
const LoginModal = () => {
  // Accessing the router object from Next.js.
  const router = useRouter();
  
  // Using custom hooks to manage the visibility of the login and register modals.
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  
  // State to manage loading status during form submission.
  const [isLoading, setIsLoading] = useState(false);

  // React Hook Form setup.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });
  
  // Function to handle form submission.
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // Using next-auth to sign in with credentials.
    signIn('credentials', { 
      ...data, 
      redirect: false,
    })
    .then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh(); // Refreshing the page after successful login.
        loginModal.onClose(); // Closing the login modal.
      }
      
      if (callback?.error) {
        toast.error(callback.error); // Displaying an error toast message.
      }
    });
  }

  // Function to toggle between login and register modals.
  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  // Content for the body of the modal.
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back"
        subtitle="Login to your account!"
      />
      {/* Rendering input fields for email and password */}
      <Input
        id="email"
        label="Email"
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

  // Content for the footer of the modal.
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      {/* Buttons to log in with Google and Github */}
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
      {/* Text and link to switch to the register modal */}
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>First time using Airbnb?
          <span 
            onClick={onToggle} 
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  )

  // Rendering the modal with provided content and props.
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal; // Exporting the LoginModal component for use in other parts of the application.
