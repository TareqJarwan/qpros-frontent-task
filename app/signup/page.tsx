'use client';

// Packages
import { useContext } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiFillCarryOut } from "react-icons/ai";
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';

// Components
import PasswordInput from "../components/PasswordInput";
import CustomInput from "../components/CustomInput";

// Context API
import { AccountContext } from "../context/account.context";


type Inputs = {
    email: string,
    password: string,
    birthdate: Date,
    subscribeToNewsletter: boolean
};

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
                    <CustomInput
                        label="Email"
                        placeholder="example@email.com"
                        error={errors?.email?.message}
                        required={true}
                        {...register("email", {
                            required: "Email Address is required",
                            pattern: {
                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: 'Invalid Email Address'
                            }
                        })}
                    />

                    <PasswordInput
                        label="Create a password"
                        error={errors?.password?.message}
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

                    <CustomInput
                        type="date"
                        label="Date of Birth"
                        placeholder="MM / DD / YYYY"
                        error={errors?.birthdate?.message}
                        required={true}
                        {...register("birthdate", {
                            required: "Date of Birth is required"
                        })}
                        hint="We want to give you a special treat on your birthday"
                    />

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