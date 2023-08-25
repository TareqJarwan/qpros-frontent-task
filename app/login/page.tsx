'use client';

// Packages
import { useContext, useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillCarryOut } from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";
import bcrypt from 'bcryptjs';

// Context API
import { AccountContext } from "../context/account.context";

type Inputs = {
  email: string,
  password: string,
};

// TODO: 
// 1- create input component
// 2- move the password validation to util file

const LoginPage = () => {
  const router = useRouter();
  const params = useSearchParams();

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      email: params.get('email') || '',
      password: ''
    }
  });
  const { dispatch } = useContext(AccountContext);

  const onSubmit: SubmitHandler<Inputs> = data => {
    dispatch({ type: 'LOGIN', payload: data });
    router.push('/');
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <div className="w-full flex items-center gap-3">
          <AiFillCarryOut size="24px" color="green" />
          <h1 className="text-3xl font-bold text-center text-gray-700">
            Log In
          </h1>

        </div>

        <p className="py-2 text-sm text-gray-500">
          Join our community &#8212; unlock exclusive deals, offers, invitations, and rewards.
        </p>

        <div className="relative flex items-center justify-center w-full mt-6 border border-t" />

        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-500"
            >
              Email <span className="text-red-400">*</span>
            </label>
            <input
              placeholder="example@email.com"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: "Email Address is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && <p role="alert" className="text-red-400 text-xs">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-500"
            >
              Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter your password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                {...register("password", {
                  required: "Password is required"
                })}
              />
              {errors.password && <p role="alert" className="text-red-400 text-xs">{errors.password.message}</p>}
              <button
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                type='button'
                onClick={() => setIsPasswordVisible((prevState) => !prevState)}
              >
                {isPasswordVisible ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </button>
            </div>
          </div>

          <div className="mt-2">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500" type="submit">
              Login
            </button>
          </div>
        </form>

        <div className="relative flex items-center justify-center w-full mt-6 border border-t" />

        <p className="mt-4 text-sm text-center text-gray-700">
          <span> Don&#39;t have an account? {' '}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;