"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import { useCompoundInterest } from "../../_context/CompoundInterestFormContext";
import { FormFields, InputFormData } from "../../_types";
import FormButtons from "./form-sub-components/FormButtons";
import AdvancedFields from "./form-sub-components/AdvancedFields";
import SimpleFields from "./form-sub-components/SimpleFields";

export default function CompoundInterestForm() {
  const { setInputFormData } = useCompoundInterest();

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

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

  const fields: FormFields = {
    initialAmount: {
      registerInput: register("initialAmount", {
        required: { value: true, message: "Field must be filled." },
        valueAsNumber: true,
        validate: (value) => !isNaN(value) || "Must be a valid number.",
        min: { value: 1, message: "Amount must be at least 1." },
        max: {
          value: 1_000_000_000_000,
          message: "Value must be 1 trillion or less.",
        },
      }),
      ref: useRef<HTMLInputElement | null>(null),
    },
    years: {
      registerInput: register("years", {
        required: { value: true, message: "Field must be filled." },
        valueAsNumber: true,
        validate: (value) => !isNaN(value) || "Must be a valid number.",
        min: { value: 1, message: "Value must be at least 1." },
        max: { value: 120, message: "Value must be 120 or less." },
      }),
      ref: useRef<HTMLInputElement | null>(null),
    },
    estimatedInterestRate: {
      registerInput: register("estimatedInterestRate", {
        required: { value: true, message: "Field must be filled." },
        valueAsNumber: true,
        validate: (value) => !isNaN(value) || "Must be a valid number.",
        min: { value: 0, message: "Value must be at least 0." },
        max: { value: 100, message: "Value must be 100 or less." },
      }),
      ref: useRef<HTMLInputElement | null>(null),
    },
    // Advanced fields:
    annualInflationRate: {
      registerInput: register("annualInflationRate", {
        /* The following setValueAs is to differentiate "" from NaN when no input is given (default case). 
        Without this the validate will complain when the input is empty as default. 
        This leads to the form to not submit when the advanced fields are empty. */
        setValueAs: (value: string) => (value === "" ? 0 : Number(value)),
        validate: (value) => !isNaN(value!) || "Must be a valid number.",
        min: { value: 0, message: "Value must be at least 0." },
        max: { value: 100, message: "Value must be 100 or less." },
      }),
      ref: useRef<HTMLInputElement | null>(null),
    },
    monthlyContribution: {
      registerInput: register("monthlyContribution", {
        setValueAs: (value: string) => (value === "" ? 0 : Number(value)),
        validate: (value) => !isNaN(value!) || "Must be a valid number.",
        min: { value: 0, message: "Value must be at least 0." },
        max: { value: 10000, message: "Value must be 10000 or less." },
      }),
      ref: useRef<HTMLInputElement | null>(null),
    },
    annualContributionIncreaseRate: {
      registerInput: register("annualContributionIncreaseRate", {
        disabled: monthlyContribution === 0,
        setValueAs: (value: string) => (value === "" ? 0 : Number(value)),
        validate: (value) => !isNaN(value!) || "Must be a valid number.",
        min: { value: 0, message: "Value must be at least 0." },
        max: { value: 100, message: "Value must be 100 or less." },
      }),
      ref: useRef<HTMLInputElement | null>(null),
    },
    age: {
      registerInput: register("age", {
        setValueAs: (value: string) =>
          value === "" ? undefined : Number(value),
        validate: (value) =>
          value === undefined || !isNaN(value!) || "Must be a valid number.",
        min: { value: 0, message: "Value must be at least 0." },
        max: { value: 120, message: "Value must be 120 or less." },
      }),
      ref: useRef<HTMLInputElement | null>(null),
    },
  };

  const handleFocus = (ref: MutableRefObject<HTMLInputElement | null>) => {
    const inputElement = ref.current;
    inputElement && inputElement.select();
  };

  const onSubmitCompoundInterestForm: SubmitHandler<InputFormData> = (
    inputFormData
  ) => {
    setInputFormData(inputFormData);

    // Close the mobile keyboard by blurring the active element
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Scroll to the top on submit to always see the chart
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitCompoundInterestForm)}
      className="sm:flex w-fit bg-[#101010] rounded-md pt-5 pb-4 sm:pb-0 px-8 sm:px-14 bg-opacity-80"
      autoComplete="off"
    >
      <ul className="flex flex-col gap-y-4 sm:gap-y-2 min-w-[180px] max-w-[235px] mx-4">
        <SimpleFields
          fields={fields}
          errors={errors}
          handleFocus={handleFocus}
        />
        <AdvancedFields
          isAdvancedOpen={isAdvancedOpen}
          fields={fields}
          errors={errors}
          monthlyContribution={monthlyContribution}
          handleFocus={handleFocus}
        />
      </ul>
      <FormButtons
        isAdvancedOpen={isAdvancedOpen}
        setIsAdvancedOpen={setIsAdvancedOpen}
      />
    </form>
  );
}
