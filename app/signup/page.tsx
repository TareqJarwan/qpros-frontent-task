'use client';

// Packages
import { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    email: string,
    password: string,
    birthday: Date,
    subscribe: boolean
};

// TODO: 
// 1- create input component
// 2- move the password validation to util file

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data)
    };

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <div className="w-full flex">

                    <h1 className="text-3xl font-bold text-center text-gray-700">Sign Up</h1>

                </div>
                
                <p className="py-2 text-sm text-gray-500">
                    Become a member &#8212; you&#39;ll enjoy exclusive deals, offers, invites and rewards.
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
                            placeholder="Enter your email address"
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
                            Create a password <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Enter your password"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                {...register("password", {
                                    required: "Password is required",
                                    min: {
                                        value: 8,
                                        message: 'At least 8 characters'
                                    },
                                    validate: (val: string) => {
                                        if (!/[A-Z]/.test(val)) {
                                            return "It should contains uppercase letters.";
                                        } else if (!/[a-z]/.test(val)) {
                                            return 'It should contains lowercase letters.';
                                        } else if (!/\d/.test(val)) {
                                            return 'Contains at least one numeric digit';
                                        } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(val)) {
                                            return 'Contains at least one special character';
                                        }
                                    },
                                })}
                            />
                            {errors.password && <p role="alert" className="text-red-400 text-xs">{errors.password.message}</p>}
                            <button
                                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                                type='button'
                                onClick={() => setIsPasswordVisible((prevState) => !prevState)}
                            >
                                {isPasswordVisible ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div >

                    <div className="mb-4">
                        <label
                            htmlFor="birthDate"
                            className="block text-sm font-semibold text-gray-500"
                        >
                            Date of Birth <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="birthDate"
                            type="date"
                            placeholder="MM / DD / YYYY"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            {...register("birthday", { required: "Date of Birth is required", })}
                        />
                        {errors.birthday && <p role="alert" className="text-red-400 text-xs">{errors.birthday.message}</p>}
                        <p className="py-2 text-sm text-gray-400">We want to give you a special treat on your birthday</p>
                    </div>

                    <div className="flex items-center mb-4">
                        <input id="subscribe"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-600 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            {...register("subscribe")}
                        />
                        <label htmlFor="subscribe" className="ml-2 block text-sm font-semibold text-gray-500">Subscribe to newsletter</label>
                    </div>

                    <div className="mt-2">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500" type="submit">
                            Become a member
                        </button>
                    </div>
                </form>

                <div className="relative flex items-center justify-center w-full mt-6 border border-t" />

                <p className="mt-4 text-sm text-center text-gray-700">
                    <span> Already have an account? {' '}
                        <Link
                            href="/login"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Log in
                        </Link>
                    </span>
                </p>
            </div>
        </div>
    );
}

export default SignUp;