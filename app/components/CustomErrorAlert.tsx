import { AiOutlineClose } from 'react-icons/ai';

type IProps = {
    error: string;
    clearError?: () => void;
}

const CustomErrorAlert = ({ error, clearError }: IProps) => {
    return (
        <div id="alert-2" className="absolute top-4 right-4 max-w-[500px] z-10 flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div className="ml-3 text-sm font-medium">
                {error}
            </div>
            <button type="button" className="cursor-pointer ml-auto -mx-3 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-2" aria-label="Close"
                onClick={clearError}
            >
                <span className="sr-only">Close</span>
                <AiOutlineClose color="red" size="40px" className="cursor-pointer" />
            </button>
        </div>
    )
}

export default CustomErrorAlert