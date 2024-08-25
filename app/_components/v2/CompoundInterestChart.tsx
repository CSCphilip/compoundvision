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
  ResponsiveContainer,
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
    <div className="border border-gray-400 py-8 px-20 rounded-md">
      <AreaChart
        width={700}
        height={400}
        data={compoundInterestData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis domain={["dataMin", "auto"]} />
        <Tooltip />
        <Area type="monotone" dataKey="total" stroke="#82ca9d" fill="#82ca9d" />
        {inputFormData.annualInflationRate && (
          <Area
            type="monotone"
            dataKey="totalInflationAdjusted"
            stroke="#8884d8"
            fill="#8884d8"
            isAnimationActive={true}
          />
        )}
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
    totalInflationAdjusted:
      inputFormData.annualInflationRate && inputFormData.initialAmount,
  });

  const interestRate = inputFormData.estimatedInterestRate / 100;
  const monthlyInterestRate = interestRate / 12;

  const calcInflationAdjustment =
    inputFormData.annualInflationRate !== undefined;
  const calcCompoundWithMonthlyDeposits =
    inputFormData.monthlyDeposits !== undefined;

  let total = inputFormData.initialAmount;
  for (var i = 1; i <= inputFormData.years; i++) {
    const interest = total * interestRate;
    total += interest;

    let totalInflationAdjusted: number | undefined = undefined;
    if (calcInflationAdjustment) {
      totalInflationAdjusted =
        total / Math.pow(1 + inputFormData.annualInflationRate! / 100, i);
    }

    // TODO: Monthly payments
    let totalWithContributions: number | undefined = undefined;
    if (calcCompoundWithMonthlyDeposits) {
      totalWithContributions = 0;
    }

    compoundInterestData.push({
      year: currentYear + i,
      total,
      interest,
      totalInflationAdjusted,
      totalWithContributions,
    });
  }

  return compoundInterestData;
}
