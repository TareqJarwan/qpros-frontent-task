'use client';

import React, { forwardRef, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type IProps = {
    name: string;
    label: string;
    error?: string
}

// eslint-disable-next-line react/display-name
const PasswordInput = forwardRef<HTMLInputElement, IProps>(
    ({ name, label, error, ...rest }, ref) => {
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);

        return (
            <div className="mb-4">
                <label
                    htmlFor={name}
                    className="block text-sm font-semibold text-gray-500"
                >
                    {label} <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                    <input
                        name={name}
                        ref={ref}
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        {...rest}
                    />
                    {error && <p role="alert" className="text-red-400 text-xs">{error}</p>}

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
        )
    }
);

export default PasswordInput