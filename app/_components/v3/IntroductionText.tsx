"use client";

import { useCompoundInterest } from "@/app/_context/CompoundInterestFormContext";
import { motion } from "framer-motion";

export default function IntroductionText() {
  const { inputFormData } = useCompoundInterest();

  const variants = {
    closed: { height: 0, opacity: 0 },
    open: { height: "auto", opacity: 1, marginBottom: 16 },
  };

  return (
    <motion.div
      className="flex justify-center max-w-[315px] sm:max-w-[460px]"
      initial="open"
      animate={inputFormData !== null ? "closed" : "open"}
      variants={variants}
      transition={{ type: "easeInOut", duration: 0.7, delay: 0.3 }} // These should equal duration of graph appear animation for it to look good.
    >
      <p className="text-sm text-neutral-100 text-center sm:text-start">
        Easily project your savings growth with this compound interest
        calculator. Enter your starting amount, interest rate, and how many
        years you plan to save (or, try it out with default values already
        pre-filled). You can also use the advanced options for a deeper
        analysis.
      </p>
    </motion.div>
  );
}
