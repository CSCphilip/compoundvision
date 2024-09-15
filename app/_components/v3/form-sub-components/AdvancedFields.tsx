import { FormFields, InputFormData } from "@/app/_types";
import { motion } from "framer-motion";
import { MutableRefObject } from "react";
import { FieldErrors } from "react-hook-form";

interface AdvancedFieldsProps {
  isAdvancedOpen: boolean;
  fields: FormFields;
  errors: FieldErrors<InputFormData>;
  monthlyContribution: number | undefined;
  handleFocus: (ref: MutableRefObject<HTMLInputElement | null>) => void;
}

export default function AdvancedFields({
  isAdvancedOpen,
  fields,
  errors,
  monthlyContribution,
  handleFocus,
}: AdvancedFieldsProps) {
  const advancedVariants = {
    open: { height: "auto" },
    closed: { height: 0 },
  };

  return (
    <li className="overflow-hidden sm:mt-5 sm:pt-5">
      <motion.div
        initial={false}
        animate={isAdvancedOpen ? "open" : "closed"}
        variants={advancedVariants}
      >
        <ul className="flex flex-col gap-y-4 sm:gap-y-2 pt-6 sm:pt-0">
          <li className="flex flex-col items-center">
            <label className="font-medium mb-2 text-white">
              Annual inflation rate:
            </label>
            <div className="flex justify-center">
              <input
                {...fields.annualInflationRate.registerInput}
                type="number"
                className="rounded-s-lg p-2 text-white bg-[#323546] outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onFocus={() => handleFocus(fields.annualInflationRate.ref)}
                ref={(e) => {
                  fields.annualInflationRate.registerInput.ref(e);
                  fields.annualInflationRate.ref.current = e;
                }}
              />
              <span className="inline-flex items-center justify-center ps-[10px] pe-3 text-sm rounded-e-lg bg-gray-600 text-gray-400">
                %
              </span>
            </div>
            {errors.annualInflationRate && (
              <p className="text-sm italic text-red-500">
                {errors.annualInflationRate.message?.toString()}
              </p>
            )}
          </li>
          <li className="flex flex-col items-center">
            <label className="font-medium mb-2 text-white">
              Monthly contribution:
            </label>
            <div className="flex justify-center">
              <span className="inline-flex items-center justify-center ps-3 pe-[10px] text-sm rounded-s-lg bg-gray-600 text-gray-400">
                $
              </span>
              <input
                {...fields.monthlyContribution.registerInput}
                type="number"
                className="rounded-e-lg p-2 text-white bg-[#323546] outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onFocus={() => handleFocus(fields.monthlyContribution.ref)}
                ref={(e) => {
                  fields.monthlyContribution.registerInput.ref(e);
                  fields.monthlyContribution.ref.current = e;
                }}
              />
            </div>
            {errors.monthlyContribution && (
              <p className="text-sm italic text-red-500">
                {errors.monthlyContribution.message?.toString()}
              </p>
            )}
          </li>
          <li className="flex flex-col items-center">
            <label className="font-medium mb-2 text-white text-center">
              Yearly contribution increase:
            </label>
            <div className="flex justify-center">
              <input
                {...fields.annualContributionIncreaseRate.registerInput}
                type="number"
                className={`rounded-s-lg p-2 text-white bg-[#323546] outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  monthlyContribution === 0 && "cursor-not-allowed"
                }`}
                onFocus={() =>
                  handleFocus(fields.annualContributionIncreaseRate.ref)
                }
                ref={(e) => {
                  fields.annualContributionIncreaseRate.registerInput.ref(e);
                  fields.annualContributionIncreaseRate.ref.current = e;
                }}
              />
              <span className="inline-flex items-center justify-center ps-[10px] pe-3 text-sm rounded-e-lg bg-gray-600 text-gray-400">
                %
              </span>
            </div>
            {errors.annualContributionIncreaseRate && (
              <p className="text-sm italic text-red-500">
                {errors.annualContributionIncreaseRate.message?.toString()}
              </p>
            )}
          </li>
          <li className="flex flex-col items-center mb-3 sm:mb-8">
            <label className="font-medium mb-2 text-white">Age:</label>
            <input
              {...fields.age.registerInput}
              type="number"
              className="rounded-lg p-2 text-white bg-[#323546] outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              onFocus={() => handleFocus(fields.age.ref)}
              ref={(e) => {
                fields.age.registerInput.ref(e);
                fields.age.ref.current = e;
              }}
            />
            {errors.age && (
              <p className="text-sm italic text-red-500">
                {errors.age.message?.toString()}
              </p>
            )}
          </li>
        </ul>
      </motion.div>
    </li>
  );
}
