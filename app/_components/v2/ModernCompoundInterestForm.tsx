"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { useCompoundInterestForm } from "../../_context/CompoundInterestFormContext";
import { InputFormData } from "../../_types";
import { useState } from "react";

export default function ModernCompoundInterestForm() {
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
      className="w-fit px-16 pt-10 pb-7 bg-[#101010] rounded-md flex flex-col items-center bg-opacity-70"
    >
      <ul className="flex flex-col gap-y-2">
        <li className="flex flex-col items-center">
          <label className="font-medium mb-2">Initial amount:</label>
          <input
            {...fields.initialAmount}
            defaultValue={10000}
            className="rounded-lg p-2 text-white bg-[#323546] outline-none"
            autoComplete="off"
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
            className="rounded-lg p-2 text-white bg-[#323546] outline-none"
            autoComplete="off"
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
            className="rounded-lg p-2 text-white bg-[#323546] outline-none"
            autoComplete="off"
          />
          {errors.estimatedInterestRate && (
            <p className="text-sm italic text-red-500">
              {errors.estimatedInterestRate.message?.toString()}
            </p>
          )}
        </li>
      </ul>
      <button
        type="submit"
        className="bg-sky-800 hover:bg-sky-600 rounded-lg py-2 px-4 mt-10"
      >
        Calculate
      </button>
    </form>
  );
}
