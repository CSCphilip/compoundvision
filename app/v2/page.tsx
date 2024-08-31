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
    <main className="bg-[#0d1421] min-w-screen min-h-screen">
      <h1 className="pt-10 text-3xl text-center">CompoundVision</h1>
      <div className="relative h-[500px] mt-12">
        <motion.div
          className="absolute left-1/2"
          initial={{ y: 0, x: "-50%" }}
          animate={{ y: inputFormData !== null ? 600 : 0, x: "-50%" }}
          transition={{ type: "easeInOut", duration: 1.4 }}
        >
          <CompoundInterestForm />
        </motion.div>

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
      {/* <p className="mt-5">
          With this compound interest visualization tool you can see your wealth
          growth.
        </p> */}
      {/* TODO: Make this a quote character to the right (out of sight) which slides in on hover. */}
      {/* <p className="w-full mt-2 text-[15px]">
        <i>
          "Compound interest is the eighth wonder of the world. <br /> He who
          understands it, earns it ... he who doesn't ... pays it." <br />
        </i>
        ― Albert Einstein
      </p> */}
    </main>
  );
}
