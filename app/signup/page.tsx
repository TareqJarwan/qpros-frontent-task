'use client';

// Packages
import { useContext, useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiFillCarryOut, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';

// Context API
import { AccountContext } from "../context/account.context";

type Inputs = {
    email: string,
    password: string,
    birthdate: Date,
    subscribeToNewsletter: boolean
};

// TODO: 
// 1- create input component
// 2- move the password validation to util file

const SignUpPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const { dispatch } = useContext(AccountContext);
    const router = useRouter()

    const onSubmit: SubmitHandler<Inputs> = data => {
        const newAccount = {
            ...data,
            active: false,
            password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(10)),
            avatar: faker.image.avatar()
        }

        dispatch({ type: 'SIGNUP', payload: newAccount });
        router.push('/');
    };

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <div className="w-full flex items-center gap-3">
                    <AiFillCarryOut size="24px" color="green" />
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
                                    <AiOutlineEyeInvisible />
                                ) : (
                                    <AiOutlineEye />
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
                            {...register("birthdate", { required: "Date of Birth is required", })}
                        />
                        {errors.birthdate && <p role="alert" className="text-red-400 text-xs">{errors.birthdate.message}</p>}
                        <p className="py-2 text-sm text-gray-400">We want to give you a special treat on your birthday</p>
                    </div>

                    <div className="flex items-center mb-4">
                        <input id="subscribeToNewsletter"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-600 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            {...register("subscribeToNewsletter")}
                        />
                        <label htmlFor="subscribeToNewsletter" className="ml-2 block text-sm font-semibold text-gray-500">Subscribe to newsletter</label>
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

export default SignUpPage;