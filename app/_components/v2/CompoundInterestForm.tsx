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
      className="flex w-fit bg-[#101010] rounded-md pt-5 px-14 bg-opacity-80"
      autoComplete="off"
    >
      <ul className="flex flex-col gap-y-2 w-[235px] mx-4">
        <li className="flex flex-col items-center">
          <label className="font-medium mb-2 text-white">Initial amount:</label>
          <div className="flex justify-center">
            <span className="inline-flex items-center justify-center ps-3 pe-[10px] text-sm rounded-s-lg bg-gray-600 text-gray-400">
              $
            </span>
            <input
              {...fields.initialAmount}
              defaultValue={10000}
              className="rounded-e-lg p-2 text-white bg-[#323546] outline-none w-full"
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
            defaultValue={15}
            className="rounded-lg p-2 text-white bg-[#323546] outline-none w-full"
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
              defaultValue={8}
              className="rounded-s-lg p-2 text-white bg-[#323546] outline-none w-full"
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
        {/* Optional input fields */}
        <li className="overflow-hidden mt-5 pt-5">
          <motion.div
            initial={false}
            animate={optionals ? "open" : "closed"}
            variants={optionalVariants}
          >
            <ul className="flex flex-col gap-y-2">
              <li className="flex flex-col items-center">
                <label className="font-medium mb-2 text-white">
                  Annual inflation rate:
                </label>
                <div className="flex justify-center">
                  <input
                    {...fields.annualInflationRate}
                    className="rounded-s-lg p-2 text-white bg-[#323546] outline-none w-full"
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
                  Monthly deposit:
                </label>
                <div className="flex justify-center">
                  <span className="inline-flex items-center justify-center ps-3 pe-[10px] text-sm rounded-s-lg bg-gray-600 text-gray-400">
                    $
                  </span>
                  <input
                    {...fields.monthlyDeposit}
                    className="rounded-e-lg p-2 text-white bg-[#323546] outline-none w-full"
                  />
                </div>
                {errors.monthlyDeposit && (
                  <p className="text-sm italic text-red-500">
                    {errors.monthlyDeposit.message?.toString()}
                  </p>
                )}
              </li>
              <li className="flex flex-col items-center">
                <label className="font-medium mb-2 text-white">
                  Deposit increase rate:
                </label>
                <div className="flex justify-center">
                  <input
                    {...fields.monthlyDepositIncreaseRate}
                    className="rounded-s-lg p-2 text-white bg-[#323546] outline-none w-full"
                  />
                  <span className="inline-flex items-center justify-center ps-[10px] pe-3 text-sm rounded-e-lg bg-gray-600 text-gray-400">
                    %
                  </span>
                </div>
                {errors.monthlyDepositIncreaseRate && (
                  <p className="text-sm italic text-red-500">
                    {errors.monthlyDepositIncreaseRate.message?.toString()}
                  </p>
                )}
              </li>
              <li className="flex flex-col items-center mb-8">
                <label className="font-medium mb-2 text-white">Age:</label>
                <input
                  {...fields.age}
                  className="rounded-lg p-2 text-white bg-[#323546] outline-none w-full"
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
          className="bg-green-800 hover:bg-green-600 rounded-lg p-2 mt-[72px] text-white"
          tabIndex={4}
        >
          Calculate
        </button>
        <p className="mt-12 text-white">Advanced:</p>
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
    </form>
  );
}
