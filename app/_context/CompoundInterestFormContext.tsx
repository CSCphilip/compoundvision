"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import { InputFormData } from "../_types";

type CompoundInterestFormProviderProps = {
  children: ReactNode;
};

type CompoundInterestFormContext = {
  inputFormData: InputFormData | null;
  setInputFormData: (inputFormData: InputFormData) => void;
};

const CompoundInterestFormContext = createContext(
  {} as CompoundInterestFormContext
);

export function useCompoundInterestForm() {
  return useContext(CompoundInterestFormContext);
}

export function CompoundInterestFormProvider({
  children,
}: CompoundInterestFormProviderProps) {
  const [inputFormData, setInputFormData] = useState<InputFormData | null>(
    null
  );

  return (
    <CompoundInterestFormContext.Provider
      value={{ inputFormData, setInputFormData }}
    >
      {children}
    </CompoundInterestFormContext.Provider>
  );
}
