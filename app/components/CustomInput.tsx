import React, { forwardRef, HTMLProps } from 'react';

type CustomInputProps = {
    name: string;
    label: string;
    placeholder: string;
    error?: string;
    required?: boolean;
    hint?: string;
} & HTMLProps<HTMLInputElement>;

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
    ({ name, label, hint, placeholder, error, required = false, ...rest }, ref) => {
        return (
            <div className="mb-4">
                <label htmlFor={name} className="block text-sm font-semibold text-gray-500">
                    {label} {required && <span className="text-red-400">*</span>}
                </label>
                <input
                    name={name}
                    placeholder={placeholder}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    ref={ref}
                    {...rest}
                />
                {error && (
                    <p role="alert" className="text-red-400 text-xs">
                        {error}
                    </p>
                )}
                {hint && <p className="py-2 text-sm text-gray-400">{hint}</p>}
            </div>
        );
    }
);

export default CustomInput;
