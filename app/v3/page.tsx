"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import CompoundInterestChart from "../_components/v3/CompoundInterestChart";
import { useCompoundInterest } from "../_context/CompoundInterestFormContext";
import CompoundInterestForm from "../_components/v3/CompoundInterestForm";
import SlidingQuote from "../_components/v3/SlidingQuote";
import InformationSection from "../_components/v3/InformationSection";
import FutureValueDisplay from "../_components/v3/FutureValueDisplay";

// TODO: Make three versions for responsiveness (to start with): default, sm, lg

export default function CompoundVisionV3() {
  const { inputFormData } = useCompoundInterest();

  const chartAndFvVariants = {
    closed: { height: 0, opacity: 0 },
    open: { height: "auto", opacity: 1 },
  };

  return (
    <main className="flex flex-col bg-[#0d1421] w-screen min-h-screen overflow-x-hidden">
      <div className="flex justify-center mr-2 mt-2 sm:-mt-2">
        <img
          src="/CompoundVision_logo.png"
          className="scale-[0.8] sm:scale-[0.7]"
        />
      </div>

      <div className="hidden 2xl:inline z-0 w-11/12 h-5/6 self-center absolute mt-32 border-t-2 border-x-2 border-blue-700 rounded-full border-shadow" />

      <div className="relative left-1/2 transform -translate-x-1/2 w-fit h-fit mt-6 sm:mt-20">
        {/* Chart and FV: */}
        <div className="relative left-1/2 transform -translate-x-1/2 w-fit">
          <motion.div
            initial="closed"
            animate={inputFormData !== null ? "open" : "closed"}
            variants={chartAndFvVariants}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {inputFormData && (
              <>
                <CompoundInterestChart />
                <FutureValueDisplay />
              </>
            )}
          </motion.div>
        </div>

        {/* Form: */}
        <div className="relative left-1/2 transform -translate-x-1/2 w-fit pb-[90px]">
          <motion.div
            initial={{ y: 0 }}
            animate={{
              y: inputFormData !== null ? 20 : 0,
              marginBottom: inputFormData !== null ? 40 : 0,
            }}
            transition={{ type: "easeInOut", duration: 1.4 }}
          >
            <CompoundInterestForm />
          </motion.div>
        </div>
      </div>

      <InformationSection />

      {/* To always push the link to the bottom of the content of the page  */}
      <div className="grow" />

      <div className="flex justify-center mt-20 sm:mt-48">
        <Link
          href="/v3/about"
          className="pb-4 pt-3 sm:hover:rounded-t-xl w-full sm:w-fit text-center sm:px-56 hover:bg-slate-900 hover:bg-opacity-85 text-white"
        >
          About this project
        </Link>
      </div>

      <SlidingQuote />
    </main>
  );
}
