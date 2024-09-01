"use client";

import { motion } from "framer-motion";

import CompoundInterestChart from "../_components/v2/CompoundInterestChart";
import CompoundInterestForm from "../_components/v2/CompoundInterestForm";
import { useCompoundInterestForm } from "../_context/CompoundInterestFormContext";

export default function CompoundVisionV2() {
  const { inputFormData } = useCompoundInterestForm();

  return (
    <main className="bg-[#0d1421] w-screen min-h-screen overflow-x-hidden">
      <div className="flex justify-center mr-2 -mt-2">
        <img src="/CompoundVision_logo.png" className="scale-[0.7]" />
      </div>
      <div className="relative mt-10">
        {/* Form: */}
        <motion.div
          className="absolute left-1/2"
          initial={{ y: 0, x: "-50%" }}
          animate={{ y: inputFormData !== null ? 600 : 0, x: "-50%" }}
          transition={{ type: "easeInOut", duration: 1.4 }}
        >
          <CompoundInterestForm />
        </motion.div>

        {/* Chart: */}
        {inputFormData && (
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <CompoundInterestChart />
          </motion.div>
        )}
      </div>

      <div className="border border-white h-10 w-screen">Hello</div>

      <SlidingQuote />
    </main>
  );
}

function SlidingQuote() {
  return (
    <motion.div
      className="w-[600px] fixed bottom-0 right-0 mb-5 cursor-pointer bg-opacity-80 bg-[#0d1421] rounded-l-lg pl-5"
      initial={{ x: "78%" }}
      whileHover={{ x: 0 }}
      transition={{ type: "easeInOut", duration: 2 }}
    >
      <div className="flex items-center gap-x-4">
        <div className="rounded-full">
          <svg
            className="h-[100px] w-[100px]"
            fill="#ffffff"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <title>quote</title>
              <path d="M9.563 8.469l-0.813-1.25c-5.625 3.781-8.75 8.375-8.75 12.156 0 3.656 2.688 5.375 4.969 5.375 2.875 0 4.906-2.438 4.906-5 0-2.156-1.375-4-3.219-4.688-0.531-0.188-1.031-0.344-1.031-1.25 0-1.156 0.844-2.875 3.938-5.344zM21.969 8.469l-0.813-1.25c-5.563 3.781-8.75 8.375-8.75 12.156 0 3.656 2.75 5.375 5.031 5.375 2.906 0 4.969-2.438 4.969-5 0-2.156-1.406-4-3.313-4.688-0.531-0.188-1-0.344-1-1.25 0-1.156 0.875-2.875 3.875-5.344z"></path>{" "}
            </g>
          </svg>
        </div>

        <div className="">
          <p className="text-[15px]">
            <i>
              "Compound interest is the eighth wonder of the world. He who
              understands it, earns it ... he who doesn't ... pays it."
            </i>
          </p>
          <p className="mt-1 font-bold">― Albert Einstein</p>
        </div>
      </div>
    </motion.div>
  );
}
