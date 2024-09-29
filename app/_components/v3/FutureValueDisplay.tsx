import { useCompoundInterest } from "@/app/_context/CompoundInterestFormContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FutureValueDisplay() {
  const { compoundInterestData, inputFormData } = useCompoundInterest();

  const [futureValue, setFutureValue] = useState("");
  const [finalYear, setFinalYear] = useState(0);
  const [futureAge, setFutureAge] = useState<number | undefined>(undefined);
  const [futureValueComments, setFutureValueComments] =
    useState<string>("\u00A0");

  const formatAmount = (num: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (!compoundInterestData.length) {
      setFutureValue("No data available");
      return;
    }

    if (inputFormData!.age || inputFormData!.age === 0) {
      setFutureAge(
        inputFormData!.age! + compoundInterestData.at(-1)!.year - currentYear
      );
    } else {
      setFutureAge(undefined);
    }

    const finalFutureValue = compoundInterestData.at(-1)!;
    setFinalYear(finalFutureValue.year);

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
      setFutureValueComments("\u00A0");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compoundInterestData]);

  return (
    <motion.div
      className="pt-8 sm:pt-12 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 2 }}
    >
      <div className="text-center space-y-1">
        {/* Section Heading */}
        <p className="inline-flex items-center sm:text-xl font-medium text-gray-300">
          Future Value in {finalYear}
          {futureAge && (
            <>
              {"\u00A0"}
              <p className="text-gray-400 text-xs sm:text-sm sm:pb-0.5">
                {" "}
                (Age: {futureAge})
              </p>
            </>
          )}
        </p>

        {/* Future Value */}
        <p className="text-2xl sm:text-4xl text-white font-bold">
          {futureValue}
        </p>

        {/* Comments */}
        {futureValueComments && (
          <p className="text-gray-400 text-xs sm:text-sm italic">
            {futureValueComments}
          </p>
        )}
      </div>
    </motion.div>
  );
}
