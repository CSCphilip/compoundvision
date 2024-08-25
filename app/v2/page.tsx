"use client";

import { motion } from "framer-motion";

import CompoundInterestChart from "../_components/v2/CompoundInterestChart";
import CompoundInterestForm from "../_components/v2/CompoundInterestForm";
import { useCompoundInterestForm } from "../_context/CompoundInterestFormContext";

export default function CompoundVisionV2() {
  const { inputFormData } = useCompoundInterestForm();

  const chartVariants = {
    open: { height: "auto" },
    closed: { height: 0 },
  };

  return (
    <main className="bg-[#1a2238] min-w-screen min-h-screen">
      <div className="px-14 py-4 text-slate-100">
        <h1 className="text-3xl">CompoundVision</h1>
        <p className="w-full mt-2 text-[15px]">
          <i>
            "Compound interest is the eighth wonder of the world. <br /> He who
            understands it, earns it ... he who doesn't ... pays it." <br />
          </i>
          ― Albert Einstein
        </p>
        <p className="mt-5">
          With this compound interest visualization tool you can see your wealth
          growth.
        </p>
      </div>
      <div className="relative h-[500px] mt-8 ms-20">
        {inputFormData && (
          // The chart, will be to the left of the form and therefore in the code before the form.
          <motion.div
            className="absolute top-0 left-0 "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <CompoundInterestChart inputFormData={inputFormData} />
          </motion.div>
        )}

        {/* The form */}
        <motion.div
          className="absolute top-0 left-0"
          initial={{ x: 0 }}
          animate={{ x: inputFormData !== null ? 900 : 0 }}
          transition={{ type: "easeInOut", duration: 1.4 }}
        >
          <CompoundInterestForm />
        </motion.div>
      </div>
      <p>test</p>
    </main>
  );
}
