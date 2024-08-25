"use client";

import CompoundInterestForm, {
  Input,
} from "../_components/v1/CompoundInterestForm";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

type CompoundInterestData = {
  year: number;
  amount: number;
  interest: number;
  total: number; // amount + interest
  inflationDecrease?: number;
  inflationAdjustedTotal?: number; // total - inflation
};

export default function BarChartAndForm() {
  const [inputData, setInputData] = useState<Input | null>(null);

  const handleFormSubmit = (inputData: Input) => {
    const inflationRate = 0.02; // Inflation target for the Central bank of Sweden
    setInputData({ ...inputData, inflationRate });
  };

  const [compoundInterestData, setCompoundInterestData] = useState<
    CompoundInterestData[]
  >([]);

  useEffect(() => {
    if (inputData) {
      const calculatedCompoundedInterest = calcCompoundInterest(inputData);
      console.log(calculatedCompoundedInterest);
      setCompoundInterestData(calculatedCompoundedInterest);
    }
  }, [inputData]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl my-10 text-gray-100 font-medium">
        CompoundVision
      </h1>
      <CompoundInterestForm onSubmitFn={handleFormSubmit} />
      {compoundInterestData.length > 0 &&
        (inputData!.applyInflationAdjustment ? (
          <AreaChart
            width={700}
            height={400}
            data={compoundInterestData}
            margin={{ top: 5, right: 10, bottom: 0, left: 20 }}
            className="mt-14"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis domain={["dataMin", "auto"]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="inflationAdjustedTotal"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
          </AreaChart>
        ) : (
          <BarChart
            width={700}
            height={400}
            data={compoundInterestData}
            margin={{ top: 5, right: 10, bottom: 0, left: 20 }}
            className="mt-14"
          >
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="total" fill="#82ca9d" />
          </BarChart>
        ))}
    </main>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  const formatAmount = (num: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
    })
      .format(num)
      .replace(/,/g, " ");
  };

  const currentYear = new Date().getFullYear();

  if (active && payload && payload.length) {
    return (
      <div className="border-2 border-gray-300 bg-white px-2 py-3 text-black opacity-90">
        <p className="font-bold">{label}</p>
        <p>{`Nominal Amount (SEK): ${formatAmount(payload[0].value)} SEK`}</p>
        {payload[1] && (
          <p>{`Real Amount (SEK): ${formatAmount(payload[1].value)} SEK`}</p>
        )}
        <p>Years: {label - currentYear}</p>
      </div>
    );
  }
}

function calcCompoundInterest(inputData: Input): CompoundInterestData[] {
  const currentYear = new Date().getFullYear();

  const compoundInterestData: CompoundInterestData[] = [];

  compoundInterestData.push({
    year: currentYear,
    amount: inputData.initialAmount,
    interest: 0,
    total: inputData.initialAmount,
  });

  // Calculate compound interest
  let amount = inputData.initialAmount;

  for (var i = 1; i <= inputData.years; i++) {
    const interest = amount * (inputData.nominalInterestRate / 100);
    const total = amount + interest;

    compoundInterestData.push({
      year: currentYear + i,
      amount,
      interest,
      total,
    });

    amount = total;
  }

  // Inflation adjustment
  if (inputData.applyInflationAdjustment) {
    compoundInterestData[0] = {
      ...compoundInterestData[0],
      inflationDecrease: 0,
      inflationAdjustedTotal: compoundInterestData[0].total,
    };

    for (var i = 1; i < compoundInterestData.length; i++) {
      const inflationAdjustedTotal =
        compoundInterestData[i].total /
        Math.pow(1 + inputData.inflationRate, i);

      const inflationDecrease =
        compoundInterestData[i].total - inflationAdjustedTotal;

      compoundInterestData[i] = {
        ...compoundInterestData[i],
        inflationDecrease: inflationDecrease,
        inflationAdjustedTotal: inflationAdjustedTotal,
      };
    }
  }

  return compoundInterestData;
}
