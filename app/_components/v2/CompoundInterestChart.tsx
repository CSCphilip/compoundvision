"use client";

import { InputFormData, CompoundInterestData } from "@/app/_types";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface CompoundInterestChartProps {
  inputFormData: InputFormData;
}

export default function CompoundInterestChart({
  inputFormData,
}: CompoundInterestChartProps) {
  const [compoundInterestData, setCompoundInterestData] = useState<
    CompoundInterestData[]
  >([]);

  useEffect(() => {
    const calculatedCompoundedInterest = calcCompoundInterest(inputFormData);
    console.log(calculatedCompoundedInterest);
    setCompoundInterestData(calculatedCompoundedInterest);
  }, [inputFormData]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="py-8 px-20 rounded-md">
      <AreaChart
        width={1000}
        height={500}
        data={compoundInterestData}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis domain={["dataMin", "auto"]} />
        <Tooltip />
        {inputFormData.monthlyDeposit && (
          <>
            <Area
              type="monotone"
              dataKey="totalWithContributions"
              stroke="#dc2626"
              fill="#dc2626"
            />
            {inputFormData.annualInflationRate && (
              <Area
                type="monotone"
                dataKey="totalWithContributionsInflationAdjusted"
                stroke="#84cc16"
                fill="#84cc16"
              />
            )}
          </>
        )}
        <Area type="monotone" dataKey="total" stroke="#82ca9d" fill="#82ca9d" />
        {inputFormData.annualInflationRate && (
          <Area
            type="monotone"
            dataKey="totalInflationAdjusted"
            stroke="#8884d8"
            fill="#8884d8"
          />
        )}
        <Area
          type="monotone"
          dataKey="contributions"
          stroke="#6b7280"
          fill="#6b7280"
        />
      </AreaChart>
    </div>
  );
}

function calcCompoundInterest(
  inputFormData: InputFormData
): CompoundInterestData[] {
  const currentYear = new Date().getFullYear();

  const compoundInterestData: CompoundInterestData[] = [];

  compoundInterestData.push({
    total: inputFormData.initialAmount,
    year: currentYear,
    interest: 0,
    totalInflationAdjusted: isNaN(inputFormData.annualInflationRate!)
      ? undefined
      : inputFormData.initialAmount,
    totalWithContributions: isNaN(inputFormData.monthlyDeposit!)
      ? undefined
      : inputFormData.initialAmount,
    totalWithContributionsInflationAdjusted:
      isNaN(inputFormData.monthlyDeposit!) ||
      isNaN(inputFormData.annualInflationRate!)
        ? undefined
        : inputFormData.initialAmount,
    contributions: inputFormData.initialAmount,
  });

  const interestRate = inputFormData.estimatedInterestRate / 100;

  const calcInflationAdjustment = !isNaN(inputFormData.annualInflationRate!);
  const calcCompoundWithMonthlyDeposits = !isNaN(inputFormData.monthlyDeposit!);

  let total = inputFormData.initialAmount;
  let contributions = total;
  for (var i = 1; i <= inputFormData.years; i++) {
    const interest = total * interestRate;
    total += interest;

    let totalInflationAdjusted: number | undefined = undefined;
    if (calcInflationAdjustment) {
      totalInflationAdjusted =
        total / Math.pow(1 + inputFormData.annualInflationRate! / 100, i);
    }

    // Compound interest of monthly deposits with an annual period (not compounded every month)
    // Formula based on: https://rikatillsammans.se/ranta-pa-ranta-formler-excels-slutvarde-och-min-kalkylator/
    let totalWithContributions: number | undefined = undefined;
    let totalWithContributionsInflationAdjusted: number | undefined = undefined;
    if (calcCompoundWithMonthlyDeposits) {
      const currentMonthlyDeposits = inputFormData.monthlyDepositIncreaseRate
        ? inputFormData.monthlyDeposit! *
          Math.pow(1 + inputFormData.monthlyDepositIncreaseRate / 100, i - 1)
        : inputFormData.monthlyDeposit!;
      contributions += currentMonthlyDeposits * 12;
      totalWithContributions = total;
      totalWithContributions +=
        currentMonthlyDeposits *
        12 *
        ((Math.pow(1 + interestRate, i) - 1) / interestRate);

      if (calcInflationAdjustment) {
        totalWithContributionsInflationAdjusted =
          totalWithContributions /
          Math.pow(1 + inputFormData.annualInflationRate! / 100, i);
      }
    }

    compoundInterestData.push({
      year: currentYear + i,
      total,
      interest,
      totalInflationAdjusted,
      totalWithContributions,
      totalWithContributionsInflationAdjusted,
      contributions,
    });
  }

  return compoundInterestData;
}
