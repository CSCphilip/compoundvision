import { useCompoundInterest } from "@/app/_context/CompoundInterestFormContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FutureValueDisplay() {
  const { compoundInterestData } = useCompoundInterest();

  const [futureValue, setFutureValue] = useState("");
  const [futureValueComments, setFutureValueComments] = useState<string | null>(
    null
  );

  const formatAmount = (num: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  useEffect(() => {
    if (!compoundInterestData.length) {
      setFutureValue("No data available");
      return;
    }

    const finalFutureValue = compoundInterestData.at(-1)!;

    if (finalFutureValue.totalWithContributionsInflationAdjusted) {
      setFutureValue(
        "$" +
          formatAmount(finalFutureValue.totalWithContributionsInflationAdjusted)
      );
      setFutureValueComments("inflation adjusted + contributions included");
    } else if (finalFutureValue.totalWithContributions) {
      setFutureValue(
        "$" + formatAmount(finalFutureValue.totalWithContributions)
      );
      setFutureValueComments("contributions included");
    } else if (finalFutureValue.totalInflationAdjusted) {
      setFutureValue(
        "$" + formatAmount(finalFutureValue.totalInflationAdjusted)
      );
      setFutureValueComments("inflation adjusted");
    } else {
      setFutureValue("$" + formatAmount(finalFutureValue.total));
      setFutureValueComments(null);
    }
  }, [compoundInterestData]);

  return (
    <motion.div
      className="pt-12 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 2 }}
    >
      <p className="text-xl text-gray-400 font-medium">Future Value:</p>
      <p className="mt-1 text-3xl text-white">{futureValue}</p>
      <p className="mt-1 italic text-gray-400 text-sm">
        {futureValueComments && futureValueComments}
      </p>
    </motion.div>
  );
}
