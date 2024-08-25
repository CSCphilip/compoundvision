export type InputFormData = {
  initialAmount: number;
  years: number;
  estimatedInterestRate: number;
  age?: number;
  annualInflationRate?: number;
  monthlyDeposit?: number;
  monthlyDepositIncreaseRate?: number;
};

export type CompoundInterestData = {
  year: number;
  total: number;
  interest: number;
  totalInflationAdjusted?: number;
  totalWithContributions?: number;
  contributions?: number; // From monthly deposits (accumulated), initial + contributions
  totalWithContributionsInflationAdjusted?: number;
};

// total
// total after inflation
// initial + contributions
// total + contributions
// total + contributions after inflation
