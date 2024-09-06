"use client";

import { motion } from "framer-motion";

import CompoundInterestChart from "../_components/v2/CompoundInterestChart";
import { useCompoundInterestForm } from "../_context/CompoundInterestFormContext";
import CompoundInterestForm2 from "../_components/v2/CompoundInterestForm";
import SlidingQuote from "../_components/v2/SlidingQuote";
import Link from "next/link";
import InformationSection from "../_components/v2/InformationSection";

export default function CompoundVisionV2() {
  const { inputFormData } = useCompoundInterestForm();

  return (
    <main className="flex flex-col bg-[#0d1421] w-screen min-h-screen overflow-x-hidden">
      <div className="flex justify-center mr-2 -mt-2">
        <img src="/CompoundVision_logo.png" className="scale-[0.7]" />
      </div>

      <div className="relative left-1/2 transform -translate-x-1/2 w-fit h-fit mt-10">
        {/* Chart: */}
        <div className="relative left-1/2 transform -translate-x-1/2 w-fit">
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: inputFormData !== null ? "auto" : 0,
              opacity: inputFormData !== null ? 1 : 0,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {inputFormData && <CompoundInterestChart />}
          </motion.div>
        </div>

        {/* Form: */}
        {/* NOTE: The padding bottom of the div should be the same as the y in animate when inputFormData is not null */}
        <div className="relative left-1/2 transform -translate-x-1/2 w-fit pb-[90px]">
          <motion.div
            initial={{ y: 0 }}
            animate={{
              y: inputFormData !== null ? 90 : 0,
              marginBottom: inputFormData !== null ? 100 : 0,
            }}
            transition={{ type: "easeInOut", duration: 1.4 }}
          >
            <CompoundInterestForm2 />
          </motion.div>
        </div>
      </div>

      {/* TODO: You could add a pie chart here somewhere of some sort as well. 
      Perhaps, StraightAnglePieChart from Recharts. */}

      <InformationSection />

      {/* To always push the link to the bottom of the content of the page  */}
      <div className="grow" />
      <div className="flex justify-center mt-48">
        <Link
          href="/v2/about"
          className="pb-4 pt-3 hover:rounded-t-xl px-56 hover:bg-slate-900 hover:bg-opacity-85 text-white"
        >
          About this project
        </Link>
      </div>

      <SlidingQuote />
    </main>
  );
}
