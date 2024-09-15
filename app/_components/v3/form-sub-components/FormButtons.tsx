import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

export default function FormButtons({
  isAdvancedOpen,
  setIsAdvancedOpen,
}: {
  isAdvancedOpen: boolean;
  setIsAdvancedOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="sm:ms-14 flex flex-col items-center">
      <button
        type="submit"
        className="bg-green-800 hover:bg-green-600 rounded-lg py-2 px-10 sm:p-2 mt-10 sm:mt-[72px] text-white"
        tabIndex={4}
      >
        Calculate
      </button>
      <p className="mt-4 sm:mt-12 text-white">Advanced:</p>
      <motion.div
        animate={{ rotate: isAdvancedOpen ? -180 : 0 }}
        transition={{ type: "linear", duration: 0.2 }}
      >
        <button
          className="mt-2"
          type="button"
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          tabIndex={5}
        >
          <svg
            viewBox="0 0 1024 1024"
            className="icon h-9 w-9 rounded-md p-0.5 hover:bg-[#323546] hover:bg-opacity-80"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"
                fill="#ffffff"
              ></path>
            </g>
          </svg>
        </button>
      </motion.div>
    </div>
  );
}
