'use client';

// Packages
import Image from "next/image";
import Link from "next/link";
import { AiOutlineCheckCircle, AiOutlineLogout, AiOutlinePlusCircle } from "react-icons/ai";

const HomePage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <div className="w-full flex">

          <h1 className="text-3xl font-bold text-center text-gray-700">Accounts</h1>

        </div>

        <p className="py-2 text-sm text-gray-500">
          If you have more than on account, you can add them and easily switch between.
        </p>

        <div className="relative flex items-center justify-center w-full mt-6 border border-t" />

        <ul className="w-full divide-y border rounded-lg p-2 mt-6 divide-gray-200 dark:divide-gray-700">
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Image className="w-8 h-8 rounded-full" width={24} height={24} src="https://avatars.githubusercontent.com/u/33396144" alt="Avatar" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  mail@flowbite.com
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400 mt-1">
                  24/12/1990
                </p>
              </div>
              <AiOutlineCheckCircle color="blue" size="24px" />
            </div>
          </li>
          <li className="py-2">
            <Link href='/signup' className="flex items-center gap-4 py-auto">
              <AiOutlinePlusCircle color="gray" size="24px" />
              <p className="text-gray-600">Add an Existing Account</p>
            </Link>

          </li>
        </ul>

        <p className="pt-2 pb-5 text-sm text-gray-400">You can add up to 5 accounts</p>

        <div className="w-full border p-3 rounded-lg flex items-center gap-4">
          <AiOutlineLogout color="gray" size="24px" />
          <p><span className="text-gray-600">Log Out</span> @d.steward</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;