import { MutableRefObject } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type InputFormData = {
  initialAmount: number;
  years: number;
  estimatedInterestRate: number;
  age?: number;
  annualInflationRate?: number;
  monthlyContribution?: number;
  annualContributionIncreaseRate?: number; // The increase rate per year for the monthly contributions
};

export type CompoundInterestData = {
  year: number;
  total: number;
  interest: number;
  totalInflationAdjusted?: number;
  totalWithContributions?: number;
  accumulatedContributions?: number; // From monthly contributions (accumulated), initial + contributions
  totalWithContributionsInflationAdjusted?: number;
};

export type ResponsiveChart = {
  isMirror: boolean;
  yAxisOrientation: "left" | "right";
  height: number;
};

export type InputField = {
  registerInput: UseFormRegisterReturn;
  ref: MutableRefObject<HTMLInputElement | null>;
};

export type FormFields = {
  [key: string]: InputField;
};
