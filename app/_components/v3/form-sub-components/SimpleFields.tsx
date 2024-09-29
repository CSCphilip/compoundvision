import { FormFields, InputFormData } from "@/app/_types";
import React, { MutableRefObject } from "react";
import { FieldErrors } from "react-hook-form";

interface SimpleFieldsProps {
  fields: FormFields;
  errors: FieldErrors<InputFormData>;
  handleFocus: (ref: MutableRefObject<HTMLInputElement | null>) => void;
}

export default function SimpleFields({
  fields,
  errors,
  handleFocus,
}: SimpleFieldsProps) {
  return (
    <>
      <li className="flex flex-col items-center">
        <label className="font-medium mb-2 text-white">Initial amount:</label>
        <div className="flex justify-center">
          <span className="inline-flex items-center justify-center ps-3 pe-[10px] text-sm rounded-s-lg bg-gray-600 text-gray-400">
            $
          </span>
          <input
            {...fields.initialAmount.registerInput}
            type="number"
            defaultValue={1000}
            className="rounded-lg rounded-s-none p-2 text-white bg-[#323546] outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            tabIndex={1}
            onFocus={() => handleFocus(fields.initialAmount.ref)}
            ref={(e) => {
              fields.initialAmount.registerInput.ref(e);
              fields.initialAmount.ref.current = e;
            }}
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
          {...fields.years.registerInput}
          type="number"
          defaultValue={15}
          className="rounded-lg p-2 text-white bg-[#323546] outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          tabIndex={2}
          onFocus={() => handleFocus(fields.years.ref)}
          ref={(e) => {
            fields.years.registerInput.ref(e);
            fields.years.ref.current = e;
          }}
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
            {...fields.estimatedInterestRate.registerInput}
            type="number"
            defaultValue={8}
            className="rounded-lg rounded-e-none p-2 text-white bg-[#323546] outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            tabIndex={3}
            onFocus={() => handleFocus(fields.estimatedInterestRate.ref)}
            ref={(e) => {
              fields.estimatedInterestRate.registerInput.ref(e);
              fields.estimatedInterestRate.ref.current = e;
            }}
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
    </>
  );
}
