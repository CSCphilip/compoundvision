"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

import CompoundInterestChart from "../_components/v2/CompoundInterestChart";
import { useCompoundInterest } from "../_context/CompoundInterestFormContext";
import CompoundInterestForm from "../_components/v2/CompoundInterestForm";
import SlidingQuote from "../_components/v2/SlidingQuote";
import InformationSection from "../_components/v2/InformationSection";
import FutureValueDisplay from "../_components/v2/FutureValueDisplay";

export default function CompoundVisionV2() {
  const { inputFormData } = useCompoundInterest();

  return (
    <main className="flex flex-col bg-[#0d1421] w-screen min-h-screen overflow-x-hidden">
      <div className="flex justify-center mr-2 -mt-2">
        <img
          src="/CompoundVision_logo.png"
          className="scale-[0.7]"
          alt="logo"
        />
      </div>

      <div className="z-0 w-11/12 h-5/6 self-center absolute mt-32 border-t-2 border-x-2 border-blue-700 rounded-full border-shadow" />

      <div className="relative left-1/2 transform -translate-x-1/2 w-fit h-fit mt-20">
        {/* Chart and FV: */}
        <div className="relative left-1/2 transform -translate-x-1/2 w-fit">
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: inputFormData !== null ? "auto" : 0,
              opacity: inputFormData !== null ? 1 : 0,
            }}
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
