"use client";

import { useForm, SubmitHandler, useWatch, FieldErrors } from "react-hook-form";
import { motion } from "framer-motion";
import { useCompoundInterest } from "../../_context/CompoundInterestFormContext";
import { InputFormData } from "../../_types";
import { useEffect, useState } from "react";

export default function CompoundInterestForm() {
  const { setInputFormData } = useCompoundInterest();

  const [optionals, setOptionals] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<InputFormData>();

  const monthlyContribution = useWatch({
    control,
    name: "monthlyContribution",
    defaultValue: 0,
  });

  useEffect(() => {
    if (monthlyContribution! === 0) {
      setValue("annualContributionIncreaseRate", undefined);
    }
  }, [monthlyContribution, setValue]);

  const fields = {
    initialAmount: register("initialAmount", {
      required: { value: true, message: "Field must be filled." },
      valueAsNumber: true,
      validate: (value) => !isNaN(value) || "Must be a valid number.",
      min: { value: 1, message: "Amount must be at least 1." },
      max: {
        value: 1_000_000_000_000,
        message: "Value must be 1 trillion or less.",
      },
    }),
    years: register("years", {
      required: { value: true, message: "Field must be filled." },
      valueAsNumber: true,
      validate: (value) => !isNaN(value) || "Must be a valid number.",
      min: { value: 1, message: "Value must be at least 1." },
      max: { value: 200, message: "Value must be 200 or less." },
    }),
    estimatedInterestRate: register("estimatedInterestRate", {
      required: { value: true, message: "Field must be filled." },
      valueAsNumber: true,
      validate: (value) => !isNaN(value) || "Must be a valid number.",
      min: { value: 0, message: "Value must be at least 0." },
      max: { value: 500, message: "Value must be 500 or less." },
    }),
    // Optional fields:
    annualInflationRate: register("annualInflationRate", {
      /* The following setValueAs is to differentiate "" from NaN when no input is given (default case). 
      Without this the validate will complain when the input is empty as default. 
      This leads to the form to not submit when the optional fields are empty. */
      setValueAs: (value: string) => (value === "" ? 0 : Number(value)),
      validate: (value) => !isNaN(value!) || "Must be a valid number.",
      min: { value: 0, message: "Value must be at least 0." },
      max: { value: 100, message: "Value must be 100 or less." },
    }),
    monthlyContribution: register("monthlyContribution", {
      setValueAs: (value: string) => (value === "" ? 0 : Number(value)),
      validate: (value) => !isNaN(value!) || "Must be a valid number.",
      min: { value: 0, message: "Value must be at least 0." },
      max: { value: 1_000_000, message: "Value must be 1 million or less." },
    }),
    annualContributionIncreaseRate: register("annualContributionIncreaseRate", {
      disabled: monthlyContribution === 0,
      setValueAs: (value: string) => (value === "" ? 0 : Number(value)),
      validate: (value) => !isNaN(value!) || "Must be a valid number.",
      min: { value: 0, message: "Value must be at least 0." },
      max: { value: 1000, message: "Value must be 1000 or less." },
    }),
    age: register("age", {
      setValueAs: (value: string) => (value === "" ? undefined : Number(value)),
      validate: (value) =>
        value === undefined || !isNaN(value!) || "Must be a valid number.",
      min: { value: 0, message: "Value must be at least 0." },
      max: { value: 200, message: "Value must be 200 or less." },
    }),
  };

  const onSubmitCompoundInterestForm: SubmitHandler<InputFormData> = (
    inputFormData
  ) => setInputFormData(inputFormData);

  return (
    <form
      onSubmit={handleSubmit(onSubmitCompoundInterestForm)}
      className="sm:flex w-fit bg-[#101010] rounded-md pt-5 pb-4 sm:pb-0 mx-3 sm:mx-0 px-4 sm:px-14 bg-opacity-80"
      autoComplete="off"
    >
      <ul className="flex flex-col gap-y-4 sm:gap-y-2 min-w-[200px] sm:w-[235px] mx-4">
        <li className="flex flex-col items-center">
          <label className="font-medium mb-2 text-white">Initial amount:</label>
          <div className="flex justify-center">
            <span className="inline-flex items-center justify-center ps-3 pe-[10px] text-sm rounded-s-lg bg-gray-600 text-gray-400">
              $
            </span>
            <input
              {...fields.initialAmount}
              type="number"
              defaultValue={10000}
              className="rounded-e-lg p-2 text-white bg-[#323546] outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              tabIndex={1}
            />
          </div>
          {errors.initialAmount && (
            <p className="text-sm italic text-red-500">
              {errors.initialAmount.message?.toString()}
            </p>
          )}
        </li>
        <li className="flex flex-col items-center">
          <label className="font-medium mb-2 text-white">Years:</label>
          <input
            {...fields.years}
            type="number"
            defaultValue={15}
            className="rounded-lg p-2 text-white bg-[#323546] outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            tabIndex={2}
          />
          {errors.years && (
            <p className="text-sm italic text-red-500">
              {errors.years.message?.toString()}
            </p>
          )}
        </li>
        <li className="flex flex-col items-center">
          <label className="font-medium mb-2 text-white">
            Estimated interest rate:
          </label>
          <div className="flex justify-center">
            <input
              {...fields.estimatedInterestRate}
              type="number"
              defaultValue={8}
              className="rounded-s-lg p-2 text-white bg-[#323546] outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              tabIndex={3}
            />
            <span className="inline-flex items-center justify-center ps-[10px] pe-3 text-sm rounded-e-lg bg-gray-600 text-gray-400">
              %
            </span>
          </div>
          {errors.estimatedInterestRate && (
            <p className="text-sm italic text-red-500">
              {errors.estimatedInterestRate.message?.toString()}
            </p>
          )}
        </li>
        {/* Optional input fields on sm or larger */}
        <div className="hidden sm:inline">
          <OptionalFields
            optionals={optionals}
            fields={fields}
            errors={errors}
            monthlyContribution={monthlyContribution}
          />
        </div>
      </ul>
      <div className="sm:ms-14 flex flex-col items-center">
        <button
          type="submit"
          className="bg-green-800 hover:bg-green-600 rounded-lg py-2 px-10 sm:p-2 mt-10 sm:mt-[72px] text-white"
          tabIndex={4}
        >
          Calculate
        </button>
        <p className="mt-4 sm:mt-12 text-white">Advanced:</p>
        <motion.div
          animate={{ rotate: optionals ? 90 : 0 }}
          transition={{ type: "linear", duration: 0.1 }}
        >
          <button
            className="mt-2"
            type="button"
            onClick={() => setOptionals(!optionals)}
            tabIndex={5}
          >
            <svg
              viewBox="0 0 1024 1024"
              className="icon h-9 w-9 rounded-md p-0.5 hover:bg-[#323546] hover:bg-opacity-80"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z"
                  fill="#ffffff"
                ></path>
              </g>
            </svg>
          </button>
        </motion.div>
      </div>
      {/* Optional input fields on smaller than sm */}
      <ul className="sm:hidden min-w-[200px] mx-4">
        <OptionalFields
          optionals={optionals}
          fields={fields}
          errors={errors}
          monthlyContribution={monthlyContribution}
        />
      </ul>
    </form>
  );
}

interface OptionalFieldsProps {
  optionals: boolean;
  fields: any;
  errors: FieldErrors<InputFormData>;
  monthlyContribution: number | undefined;
}

function OptionalFields({
  optionals,
  fields,
  errors,
  monthlyContribution,
}: OptionalFieldsProps) {
  const optionalVariants = {
    open: { height: "auto" },
    closed: { height: 0 },
  };

  return (
    <li className="overflow-hidden sm:mt-5 sm:pt-5">
      <motion.div
        initial={false}
        animate={optionals ? "open" : "closed"}
        variants={optionalVariants}
      >
        <ul className="flex flex-col gap-y-4 sm:gap-y-2 pt-6 sm:pt-0">
          <li className="flex flex-col items-center">
            <label className="font-medium mb-2 text-white">
              Annual inflation rate:
            </label>
            <div className="flex justify-center">
              <input
                {...fields.annualInflationRate}
                type="number"
                className="rounded-s-lg p-2 text-white bg-[#323546] outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                {...fields.monthlyContribution}
                type="number"
                className="rounded-e-lg p-2 text-white bg-[#323546] outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                {...fields.annualContributionIncreaseRate}
                type="number"
                className={`rounded-s-lg p-2 text-white bg-[#323546] outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  monthlyContribution === 0 && "cursor-not-allowed"
                }`}
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
              {...fields.age}
              type="number"
              className="rounded-lg p-2 text-white bg-[#323546] outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
