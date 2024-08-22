"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useEffect, useState } from "react";

export default function BarChartVision() {
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

  const startYear = 2024;
  const originalPrincipalSum = 100000;

  const [YTYInterest, setYTYInterest] =
    useState<{ year: number; interest: number }[]>();

  const nominalAnnualInterestRate = 0.08;
  const futureYears = 30;

  const compoundInterest = (years: number) =>
    originalPrincipalSum * Math.pow(1 + nominalAnnualInterestRate, years);

  const partialAmounts = [];

  for (var i = 0; i <= futureYears; i++) {
    partialAmounts.push(compoundInterest(i));
  }

  const tmpData = partialAmounts.map((amount, index) => {
    const year = startYear + index;
    return { year, amount: Math.floor(amount) };
  });

  const tmpYTYInterest = tmpData.map((dataPoint) => {
    const interest = dataPoint.amount * nominalAnnualInterestRate;
    return { year: dataPoint.year, interest };
  });

  const [data3, setData3] = useState<
    { year: number; amount: number; interest: number }[]
  >([]);

  const tmp2 = [{ ...tmpData[0], interest: 0 }];
  for (var i = 0; i < tmpData.length; i++) {
    tmp2.push({ ...tmpData[i], interest: tmpYTYInterest[i].interest });
  }

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setData2(tmpData);
    setYTYInterest(tmpYTYInterest);
    setData3(tmp2);
  }, []);

  if (!isMounted) return null;

  return (
    <main className="w-screen h-screen py-10 px-5 bg-white flex justify-center">
      {data2.length ? (
        <BarChart
          width={1000}
          height={500}
          data={data3}
          margin={{ top: 5, right: 10, bottom: 0, left: 20 }}
        >
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="amount" fill="#82ca9d" stackId="a" />
          <Bar dataKey="interest" fill="#8884d8" stackId="a" />
        </BarChart>
      ) : (
        <p>Nothing to display</p>
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
      <div className="border-2 border-gray-300 bg-white px-2 py-3 text-black">
        <p className="font-bold">{label}</p>
        <p>{`Amount: ${formatAmount(payload[0].value)} SEK`}</p>
        <p>{`Interest: ${formatAmount(payload[1].value)} SEK`}</p>
        <p>{`Total: ${formatAmount(
          payload[0].value + payload[1].value
        )} SEK`}</p>
        <p>Years: {label - 2024}</p>
        <p>Age: {27 + label - 2024}</p>
      </div>
    );
  }
}
