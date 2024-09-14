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
  contributions?: number; // From monthly contributions (accumulated), initial + contributions
  totalWithContributionsInflationAdjusted?: number;
};

export type ResponsiveChart = {
  isMirror: boolean;
  yAxisOrientation: "left" | "right";
  height: number;
};
