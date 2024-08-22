"use client";

import { useForm, SubmitHandler } from "react-hook-form";

export type Input = {
  initialAmount: number;
  years: number;
  nominalInterestRate: number;
  age: number;
  applyInflationAdjustment: true | false;
  inflationRate: number;
};

type FormProps = {
  onSubmitFn: (data: Input) => void;
};

export default function CompoundInterestForm({ onSubmitFn }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  // const fields = {
  //   lastName: register("lastName", {
  //     required: "Last name is required",
  //     maxLength: { value: 50, message: "Last name is too long" },
  //   }),
  // };

  const onSubmit: SubmitHandler<Input> = (data) => onSubmitFn(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-[260px]"
    >
      <input
        className="bg-sky-800 ps-2 py-1 rounded-sm placeholder-white"
        placeholder="Initial Amount (SEK)"
        defaultValue={100000}
        {...register("initialAmount", {
          required: { value: true, message: "Field must be filled" },
          valueAsNumber: true,
          min: {
            value: 0,
            message: "Amount must be greater than zero.",
          },
        })}
      />
      {errors.initialAmount && (
        <p className="text-white text-sm mt-[-17px] mb-[-9px]">
          {errors.initialAmount.message?.toString()}
        </p>
      )}
      <input
        className="bg-sky-800 ps-2 py-1 rounded-sm placeholder-white"
        placeholder="Years"
        defaultValue={25}
        {...register("years", {
          required: { value: true, message: "Field must be filled" },
          valueAsNumber: true,
          min: { value: 1, message: "Value must be greater than one." },
          max: { value: 200, message: "Value must be less than 200." },
        })}
      />
      {errors.years && (
        <p className="text-white text-sm mt-[-17px] mb-[-9px]">
          {errors.years.message?.toString()}
        </p>
      )}
      <input
        className="bg-sky-800 ps-2 py-1 rounded-sm placeholder-white"
        placeholder="Interest Rate (%)"
        defaultValue={8}
        {...register("nominalInterestRate", {
          required: { value: true, message: "Field must be filled" },
          valueAsNumber: true,
          min: { value: 0, message: "Value must be greater than zero." },
        })}
      />
      {errors.nominalInterestRate && (
        <p className="text-white text-sm mt-[-17px] mb-[-9px]">
          {errors.nominalInterestRate.message?.toString()}
        </p>
      )}
      <input
        className="bg-sky-800 ps-2 py-1 rounded-sm placeholder-white"
        placeholder="Age"
        defaultValue={27}
        {...register("age", {
          required: { value: true, message: "Field must be filled" },
          valueAsNumber: true,
          min: { value: 0, message: "Value must be greater than zero." },
        })}
      />
      {errors.age && (
        <p className="text-white text-sm mt-[-17px] mb-[-9px]">
          {errors.age.message?.toString()}
        </p>
      )}
      <label className="text-white">
        <input
          type="checkbox"
          {...register("applyInflationAdjustment")}
          // checked={includeInflation}
          // onChange={handleCheckboxChange}
        />
        Include Inflation in Calculation
      </label>
      <button
        className="bg-gray-600 hover:bg-gray-500 rounded-md py-1 mx-5 mt-1"
        type="submit"
      >
        Calculate
      </button>
    </form>
  );
}
