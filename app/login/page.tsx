'use client';

// Packages
import { useContext } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiFillCarryOut } from "react-icons/ai";
import { useRouter, useSearchParams } from "next/navigation";

// Components
import CustomInput from "../components/CustomInput";
import PasswordInput from "../components/PasswordInput";
import CustomErrorAlert from "../components/CustomErrorAlert";

// Context API
import { AccountContext } from "../context/account.context";

type Inputs = {
  email: string,
  password: string,
};

const LoginPage = () => {
  const router = useRouter();
  const params = useSearchParams();

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      email: params.get('email') || '',
      password: ''
    }
  });
  const { state, dispatch } = useContext(AccountContext);

  const onSubmit: SubmitHandler<Inputs> = data => {
    dispatch({ type: 'LOGIN', payload: data });
    if (!state.error) router.push('/');
  };

  return (
    <>
      {state.error && (
        <CustomErrorAlert
          error={state.error}
          clearError={() => dispatch('CLEAR_ERROR')}
        />
      )}

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
              label="Password"
              error={errors?.password?.message}
              {...register("password", {
                required: "Password is required"
              })}
            />

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
    </>
  );
}

export default LoginPage;