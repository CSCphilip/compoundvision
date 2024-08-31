"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { useCompoundInterestForm } from "../../_context/CompoundInterestFormContext";
import { InputFormData } from "../../_types";
import { useState } from "react";

export default function CompoundInterestForm() {
  const { setInputFormData } = useCompoundInterestForm();

  const [optionals, setOptionals] = useState(false);

  const optionalVariants = {
    open: { height: "auto" },
    closed: { height: 0 },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputFormData>();

  const fields = {
    initialAmount: register("initialAmount", {
      required: { value: true, message: "Field must be filled." },
      valueAsNumber: true,
      validate: (value) => !isNaN(value) || "Must be a valid number.",
      min: { value: 1, message: "Amount must be greater than 0." },
    }),
    years: register("years", {
      required: { value: true, message: "Field must be filled." },
      valueAsNumber: true,
      validate: (value) => !isNaN(value) || "Must be a valid number.",
      min: { value: 1, message: "Value must be greater than 1." },
      max: { value: 200, message: "Value must be less than 200." },
    }),
    estimatedInterestRate: register("estimatedInterestRate", {
      required: { value: true, message: "Field must be filled." },
      valueAsNumber: true,
      validate: (value) => !isNaN(value) || "Must be a valid number.",
      min: { value: 0, message: "Value must be greater than 0." },
      max: { value: 500, message: "Value mest be less than 500." },
    }),
    age: register("age", {
      validate: (value) =>
        value === undefined || !isNaN(value) || "Must be a valid number.",
      min: { value: 0, message: "Value must be greater than 0." },
      max: { value: 200, message: "Value must be less than 200." },
    }),
    annualInflationRate: register("annualInflationRate", {
      validate: (value) =>
        value === undefined || !isNaN(value) || "Must be a valid number.",
      min: { value: 0, message: "Value must be greater than 0." },
      max: { value: 100, message: "Value must be less than 100." },
    }),
    monthlyDeposit: register("monthlyDeposit", {
      validate: (value) =>
        value === undefined || !isNaN(value) || "Must be a valid number.",
      min: { value: 0, message: "Value must be greater than 0." },
    }),
    monthlyDepositIncreaseRate: register("monthlyDepositIncreaseRate", {
      validate: (value) =>
        value === undefined || !isNaN(value) || "Must be a valid number.",
      min: { value: 0, message: "Value must be greater than 0." },
      max: { value: 1000, message: "Value must be less than 1000." },
    }),
  };

  const onSubmitCompoundInterestForm: SubmitHandler<InputFormData> = (
    inputFormData
  ) => setInputFormData(inputFormData);

  return (
    <form
      onSubmit={handleSubmit(onSubmitCompoundInterestForm)}
      className="flex w-fit border-gray-400 border rounded-lg pt-5 pb-8 px-14"
    >
      <ul className="flex flex-col gap-y-2">
        <li className="flex flex-col items-center">
          <label className="font-medium mb-2">Initial amount:</label>
          <input
            {...fields.initialAmount}
            defaultValue={10000}
            className="rounded-lg p-2 text-white bg-[#323546] opacity-80"
          />
          {errors.initialAmount && (
            <p className="text-sm italic text-red-500">
              {errors.initialAmount.message?.toString()}
            </p>
          )}
        </li>
        <li className="flex flex-col items-center">
          <label className="font-medium mb-2">Years:</label>
          <input
            {...fields.years}
            defaultValue={15}
            className="rounded-lg p-2 text-white bg-[#323546] opacity-90"
          />
          {errors.years && (
            <p className="text-sm italic text-red-500">
              {errors.years.message?.toString()}
            </p>
          )}
        </li>
        <li className="flex flex-col items-center">
          <label className="font-medium mb-2">Estimated interest rate:</label>
          <input
            {...fields.estimatedInterestRate}
            defaultValue={8}
            className="rounded-lg p-2 text-white bg-[#323546] opacity-80"
          />
          {errors.estimatedInterestRate && (
            <p className="text-sm italic text-red-500">
              {errors.estimatedInterestRate.message?.toString()}
            </p>
          )}
        </li>
        {/* Optional input fields */}
        <li className="overflow-hidden mt-5 pt-5 border-t px-1 pb-1">
          <motion.div
            initial={false}
            animate={optionals ? "open" : "closed"}
            variants={optionalVariants}
          >
            <ul className="flex flex-col gap-y-2">
              <li className="flex flex-col items-center">
                <label className="font-medium mb-2">
                  Annual inflation rate:
                </label>
                <input
                  {...fields.annualInflationRate}
                  className="rounded-lg p-2 text-white bg-[#323546] opacity-80"
                />
                {errors.annualInflationRate && (
                  <p className="text-sm italic text-red-500">
                    {errors.annualInflationRate.message?.toString()}
                  </p>
                )}
              </li>
              <li className="flex flex-col items-center">
                <label className="font-medium mb-2">Monthly deposit:</label>
                <input
                  {...fields.monthlyDeposit}
                  className="rounded-lg p-2 text-white bg-[#323546] opacity-80"
                />
                {errors.monthlyDeposit && (
                  <p className="text-sm italic text-red-500">
                    {errors.monthlyDeposit.message?.toString()}
                  </p>
                )}
              </li>
              <li className="flex flex-col items-center">
                <label className="font-medium mb-2">
                  Deposit increase rate:
                </label>
                <input
                  {...fields.monthlyDepositIncreaseRate}
                  className="rounded-lg p-2 text-white bg-[#323546] opacity-80"
                />
                {errors.monthlyDepositIncreaseRate && (
                  <p className="text-sm italic text-red-500">
                    {errors.monthlyDepositIncreaseRate.message?.toString()}
                  </p>
                )}
              </li>
              <li className="flex flex-col items-center">
                <label className="font-medium mb-2">Age:</label>
                <input
                  {...fields.age}
                  className="rounded-lg p-2 text-white bg-[#323546] opacity-80"
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
      </ul>
      <div className="ms-14 flex flex-col items-center">
        <button
          type="submit"
          className="bg-sky-800 hover:bg-sky-600 rounded-lg p-2 mt-[72px]"
        >
          Calculate
        </button>
        <p className="mt-12">Optional:</p>
        <motion.div
          animate={{ rotate: optionals ? 90 : 0 }}
          transition={{ type: "linear", duration: 0.1 }}
        >
          <button
            className="mt-2"
            type="button"
            onClick={() => setOptionals(!optionals)}
          >
            <svg
              viewBox="0 0 1024 1024"
              className="icon h-9 w-9 rounded-md p-0.5 hover:bg-gray-600 hover:bg-opacity-70"
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
    </form>
  );
}
