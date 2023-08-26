'use client';

import { useContext } from 'react';
import { AiFillInfoCircle, AiOutlineClose } from 'react-icons/ai';
import { AccountContext } from '../context/account.context';

const CustomErrorAlert = () => {
    const { state, dispatch } = useContext(AccountContext);

    return (
        state.error && (
            <div id="alert-2" className="absolute top-4 right-4 max-w-[500px] z-10 flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <AiFillInfoCircle color="#991b1b" size="18px" />
                <span className="sr-only">Info</span>
                <div className="ml-3 text-sm font-medium">
                    {state.error}
                </div>
                <button type="button" className="cursor-pointer ml-auto -mx-3 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close"
                    onClick={() => dispatch({ type: 'CLEAR_ERROR' })}
                >
                    <span className="sr-only">Close</span>
                    <AiOutlineClose color="#991b1b" size="40px" className="cursor-pointer" />
                </button>
            </div>
        )
    )
}

export default CustomErrorAlert;