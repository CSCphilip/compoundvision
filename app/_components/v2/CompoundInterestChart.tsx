"use client";

import { useCompoundInterestForm } from "@/app/_context/CompoundInterestFormContext";
import { InputFormData, CompoundInterestData } from "@/app/_types";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

interface CompoundInterestChartProps {
  inputFormData: InputFormData;
}

export default function CompoundInterestChart() {
  const { inputFormData } = useCompoundInterestForm();
  const [compoundInterestData, setCompoundInterestData] = useState<
    CompoundInterestData[]
  >([]);

  useEffect(() => {
    const calculatedCompoundedInterest = calcCompoundInterest(inputFormData!);
    console.log(calculatedCompoundedInterest);
    setCompoundInterestData(calculatedCompoundedInterest);
  }, [inputFormData]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="ms-14">
      <AreaChart
        width={1105} // The 5 is because of the margin right // Old: 1000
        height={550} // Old: 500
        data={compoundInterestData}
        margin={{ top: 0, right: 5, left: 0, bottom: 0 }}
        className="border-l-2 border-l-[#363a41]"
      >
        <defs>
          <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#104f42" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#104f42" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="colorInflationTotal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#facc15" stopOpacity={0.5} />
            <stop offset="100%" stopColor="" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6b66cf" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#6b66cf" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" opacity={0.5} />

        <XAxis dataKey="year" />

        <YAxis
          type="number"
          domain={["auto", "auto"]}
          tickCount={9}
          padding={{ top: 20 }}
          tickFormatter={formatYAxis}
          orientation="right"
        />

        <Tooltip animationDuration={500} content={<CustomTooltip />} />

        {inputFormData!.monthlyDeposit ? (
          <>
            <Area
              type="monotone"
              dataKey="totalWithContributions"
              stroke="#15bf7f"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTotal)"
            />
            {inputFormData!.annualInflationRate && (
              <Area
                type="monotone"
                dataKey="totalWithContributionsInflationAdjusted"
                stroke="#facc15"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorInflationTotal)"
              />
            )}
          </>
        ) : (
          <>
            <Area
              type="monotone"
              dataKey="total"
              stroke="#15bf7f"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorTotal)"
            />
            {inputFormData!.annualInflationRate && (
              <Area
                type="monotone"
                dataKey="totalInflationAdjusted"
                stroke="#facc15"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorInflationTotal)"
              />
            )}
          </>
        )}
        <Area
          type="monotone"
          dataKey="contributions"
          stroke="#8884d8"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorContributions)"
        />
      </AreaChart>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  const { inputFormData } = useCompoundInterestForm();

  const age = inputFormData!.age;
  const currentYear = new Date().getFullYear();

  const formatAmount = (num: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-700 p-2 text-sm rounded-lg">
        <p className="font-bold text-base">{label}</p>
        <p className="">{`Nominal amount: $${formatAmount(
          payload[0].value
        )}`}</p>
        {payload[2] ? (
          <>
            <p>{`Real amount: $${formatAmount(payload[1].value)}`}</p>
            <p>{`Capital inputs: $${formatAmount(payload[2].value)}`}</p>
          </>
        ) : (
          <p>{`Capital inputs: $${formatAmount(payload[1].value)}`}</p>
        )}
        {age && (
          <p>{`Age: ${Number(age) + Number(label) - Number(currentYear)}`}</p>
        )}
      </div>
    );
  }

  return null;
}

function formatYAxis(number: any, index: number): string {
  return abbrNum(number, 1);
}

// Based on: https://stackoverflow.com/questions/2685911/is-there-a-way-to-round-numbers-into-a-reader-friendly-format-e-g-1-1k
function abbrNum(number: number, decPlaces: number) {
  // 1 decimal places => 10 , 2 decimal places => 100 , 3 => 1000 , etc
  decPlaces = Math.pow(10, decPlaces);

  // Enumerate number abbreviations
  var abbrev = ["k", "m", "b", "t"];

  let res: string = "$" + number.toString();

  // Go through the array backwards, so we do the largest first
  for (var i = abbrev.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    var size = Math.pow(10, (i + 1) * 3);

    // If the number is bigger or equal do the abbreviation
    if (size <= number) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      number = Math.round((number * decPlaces) / size) / decPlaces;

      // Handle special case where we round up to the next abbreviation
      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      // Add the letter for the abbreviation
      res = "$" + number + abbrev[i];

      // We are done... stop
      break;
    }
  }

  return res;
}

//TODO: optional: the reverse where a user clicks on a year and amount where the initial is calculated and the rest from there.
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
