"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const data = [
    { year: 2024, amount: 100000 },
    { year: 2025, amount: 200000 },
    { year: 2026, amount: 400000 },
    { year: 2027, amount: 800000 },
    { year: 2028, amount: 1600000 },
    { year: 2029, amount: 3200000 },
    { year: 2030, amount: 6400000 },
  ];

  const [data2, setData2] = useState<{ year: number; amount: number }[]>([]);

  const originalPrincipalSum = 100000;
  const nominalAnnualInterestRate = 0.08;
  const futureYears = 53;

  const compoundInterest = (years: number) =>
    originalPrincipalSum * Math.pow(1 + nominalAnnualInterestRate, years);

  const partialAmounts = [];

  for (var i = 0; i <= futureYears; i++) {
    partialAmounts.push(compoundInterest(i));
  }

  const startYear = 2024;

  const tmpData = partialAmounts.map((amount, index) => {
    const year = startYear + index;
    return { year, amount: Math.floor(amount) };
  });

  return (
    <main className="w-screen py-20 px-14 flex flex-col items-center">
      <h1 className="text-3xl">CompoundVision</h1>
      <button
        onClick={() => setData2(tmpData)}
        className="my-10 p-2 rounded-md bg-blue-600 hover:bg-blue-500"
      >
        Set Data
      </button>

      {data2.length ? (
        <LineChart
          width={1000}
          height={500}
          data={data2}
          margin={{ top: 5, right: 10, bottom: 0, left: 20 }}
        >
          <XAxis dataKey="year" />
          <YAxis tickCount={10} scale={"pow"} padding={{ bottom: 10 }} />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid vertical={false} strokeDasharray="3" />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      ) : (
        <p>No input yet</p>
      )}
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

  if (active && payload && payload.length) {
    return (
      <div className="border-2 border-[#8884d8] px-2 py-3 bg-slate-200 text-black">
        <p>{`${label}: ${formatAmount(payload[0].value)} SEK`}</p>
        <p>Years: {label - 2024}</p>
        <p>Age: {27 + label - 2024}</p>
      </div>
    );
  }

  return null;
}
