'use client';

// Packages
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { AiFillCarryOut, AiOutlineCheckCircle, AiOutlineLogout, AiOutlinePlusCircle } from "react-icons/ai";

// Context API
import { AccountContext } from "./context/account.context";

const ACCOUNTS_LIST_SIZE = 5;

const HomePage = () => {
  const { state, dispatch } = useContext(AccountContext);

  const activeAccount = state.accounts.find(account => account.active);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <div className="w-full flex items-center gap-3">
          <AiFillCarryOut size="24px" color="green" />
          <h1 className="text-3xl font-bold text-center text-gray-700">Accounts</h1>
        </div>

        <p className="py-2 text-sm text-gray-500">
          If you have more than on account, you can add them and easily switch between.
        </p>

        <div className="relative flex items-center justify-center w-full mt-6 border border-t" />

        <ul className="w-full divide-y border rounded-lg p-2 mt-6 divide-gray-200 dark:divide-gray-700">
          {state.accounts.length > 0 ? (
            state.accounts.slice(0, ACCOUNTS_LIST_SIZE).map((account, index) => (
              <li className="p-3" key={index}>
                <Link href={{ pathname: 'login', query: { email: account.email } }}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image className="w-8 h-8 rounded-full" width={24} height={24} src={account.avatar} alt="Avatar" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {account.email}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400 mt-1">
                        {account.birthdate}
                      </p>
                    </div>
                    {account.active && <AiOutlineCheckCircle color="blue" size="24px" />}
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p className="text-gray-600 text-center py-6">There is no existing account</p>
          )}
          <li className="py-2">
            <Link href='/signup' className="flex items-center gap-4 py-auto">
              <AiOutlinePlusCircle color="gray" size="24px" />
              <p className="text-gray-600">Add an Existing Account</p>
            </Link>

          </li>
        </ul>

        <p className="pt-2 pb-5 text-sm text-gray-400">You can add up to 5 accounts</p>

        {activeAccount && (
          <div className="w-full border p-3 rounded-lg flex items-center gap-4 cursor-pointer"
            onClick={() => dispatch({ type: "LOGOUT", payload: activeAccount })}
          >
            <AiOutlineLogout color="gray" size="24px" />
            <p><span className="text-gray-600">Log Out</span> {activeAccount.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;