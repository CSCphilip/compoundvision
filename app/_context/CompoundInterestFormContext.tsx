"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import { CompoundInterestData, InputFormData } from "../_types";

type CompoundInterestProviderProps = {
  children: ReactNode;
};

type CompoundInterestContext = {
  inputFormData: InputFormData | null;
  setInputFormData: (inputFormData: InputFormData) => void;
  compoundInterestData: CompoundInterestData[];
  setCompoundInterestData: (
    compoundInterestData: CompoundInterestData[]
  ) => void;
};

const CompoundInterestContext = createContext({} as CompoundInterestContext);

export function useCompoundInterest() {
  return useContext(CompoundInterestContext);
}

export function CompoundInterestProvider({
  children,
}: CompoundInterestProviderProps) {
  const [inputFormData, setInputFormData] = useState<InputFormData | null>(
    null
  );
  const [compoundInterestData, setCompoundInterestData] = useState<
    CompoundInterestData[]
  >([]);

  return (
    <CompoundInterestContext.Provider
      value={{
        inputFormData,
        setInputFormData,
        compoundInterestData,
        setCompoundInterestData,
      }}
    >
      {children}
    </CompoundInterestContext.Provider>
  );
}
