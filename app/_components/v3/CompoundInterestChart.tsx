"use client";

import { useCompoundInterest } from "@/app/_context/CompoundInterestFormContext";
import {
  InputFormData,
  CompoundInterestData,
  ResponsiveChart,
} from "@/app/_types";
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

export default function CompoundInterestChart() {
  const { inputFormData, compoundInterestData, setCompoundInterestData } =
    useCompoundInterest();

  useEffect(() => {
    if (!inputFormData) return;

    const calculatedCompoundedInterest = calcCompoundInterest(inputFormData);

    console.log(JSON.stringify(inputFormData));
    console.log(calculatedCompoundedInterest);

    setCompoundInterestData(calculatedCompoundedInterest);
  }, [inputFormData]);

  const [isMounted, setIsMounted] = useState(false);
  // Variables related to responsiveness. For the YAxis placement (inner/outer)
  // and the orientation in the chart.
  const [responsiveState, setResponsiveState] = useState<ResponsiveChart>({
    height: 550,
    isMirror: false,
    yAxisOrientation: "right",
  }); // These should be the default values for larger (so far sm)

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      // 640px is threshold for sm in tailwindcss
      if (window.innerWidth < 640) {
        setResponsiveState({
          height: 400,
          isMirror: true,
          yAxisOrientation: "left",
        });
      } else {
        setResponsiveState({
          height: 550,
          isMirror: false,
          yAxisOrientation: "right",
        });
      }
    };

    // Run on mount to set initial value
    handleResize();

    // Add event listener for window resizing
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-screen max-w-[1105px] px-4 sm:px-0 sm:ps-14 sm:pe-4">
      <ResponsiveContainer height={responsiveState.height} width="100%">
        <AreaChart
          data={compoundInterestData}
          margin={{ top: 0, right: 5, left: 0, bottom: 0 }}
          className="sm:border-l-2 sm:border-l-[#363a41]"
        >
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#104f42" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#104f42" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient
              id="colorInflationTotal"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#facc15" stopOpacity={0.5} />
              <stop offset="100%" stopColor="" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6b66cf" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#6b66cf" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" opacity={0.5} />

          <XAxis dataKey="year" stroke="#d4d4d4" />

          <YAxis
            type="number"
            domain={["auto", "auto"]}
            mirror={responsiveState.isMirror}
            tickCount={9}
            stroke="#d4d4d4"
            padding={{ top: 20 }}
            tickFormatter={formatYAxis}
            orientation={responsiveState.yAxisOrientation}
          />

          <Tooltip animationDuration={500} content={<CustomTooltip />} />

          {inputFormData!.monthlyContribution ? (
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
      </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  const { inputFormData } = useCompoundInterest();

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
      <div className="bg-gray-700 py-2 px-3 text-sm rounded-lg">
        <p className="inline-flex justify-center w-full sm:justify-center sm:w-auto items-center font-bold text-lg text-white">
          {label}
          {(age || age === 0) && (
            <>
              <p className="pt-[1px] ms-1.5 text-sm font-normal text-gray-300">{`Age: ${
                Number(age) + Number(label) - Number(currentYear)
              }`}</p>
            </>
          )}
        </p>
        <br />
        <p className="inline-flex mt-1 sm:mt-0 items-center text-white">
          <span className="size-[10px] bg-[#15bf7f] rounded-full inline-block mr-[8px]" />
          Nominal amount:
          <span className="w-[16px]" />
          <p className="text-white">${formatAmount(payload[0].value)}</p>
        </p>
        <br />
        {payload[2] ? (
          <>
            <p className="inline-flex items-center mt-1 text-white">
              <span className="size-[10px] bg-[#facc15] rounded-full inline-block mr-[8px]" />
              Real amount:
              <span className="w-[42px]" />
              <p className="text-white">${formatAmount(payload[1].value)}</p>
            </p>
            <br />
            <p className="inline-flex items-center mt-1 text-white">
              <span className="size-[10px] bg-[#8884d8] rounded-full inline-block mr-[8px]" />
              Capital inputs:
              <span className="w-[33.5px]" />
              <p className="text-white">${formatAmount(payload[2].value)}</p>
            </p>
          </>
        ) : (
          <p className="inline-flex items-center mt-1 text-white">
            <span className="size-[10px] bg-[#8884d8] rounded-full inline-block mr-[8px]" />
            Capital inputs:
            <span className="w-[33.5px]" />
            <p className="text-white">${formatAmount(payload[1].value)}</p>
          </p>
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
    totalInflationAdjusted: inputFormData.annualInflationRate
      ? inputFormData.initialAmount
      : undefined,
    totalWithContributions: inputFormData.monthlyContribution
      ? inputFormData.initialAmount
      : undefined,
    totalWithContributionsInflationAdjusted:
      inputFormData.monthlyContribution && inputFormData.annualInflationRate
        ? inputFormData.initialAmount
        : undefined,
    contributions: inputFormData.initialAmount,
  });

  const interestRate = inputFormData.estimatedInterestRate / 100;

  const calcInflationAdjustment = inputFormData.annualInflationRate;
  const calcCompoundWithMonthlyContribution = inputFormData.monthlyContribution;

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

    // Compound interest of monthly contributions with an annual period (not compounded every month)
    // Formula based on: https://rikatillsammans.se/ranta-pa-ranta-formler-excels-slutvarde-och-min-kalkylator/
    let totalWithContributions: number | undefined = undefined;
    let totalWithContributionsInflationAdjusted: number | undefined = undefined;
    if (calcCompoundWithMonthlyContribution) {
      const currentMonthlyContribution =
        inputFormData.annualContributionIncreaseRate
          ? inputFormData.monthlyContribution! *
            Math.pow(
              1 + inputFormData.annualContributionIncreaseRate / 100,
              i - 1
            )
          : inputFormData.monthlyContribution!;
      contributions += currentMonthlyContribution * 12;
      totalWithContributions = total;
      totalWithContributions +=
        (currentMonthlyContribution *
          12 *
          (Math.pow(1 + interestRate, i) - 1)) /
        interestRate;

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
