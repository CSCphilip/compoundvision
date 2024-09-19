"use client";

import { MathJax, MathJaxContext } from "better-react-mathjax";

export default function Information() {
  return (
    /* NOTE: Add text-white (or other color you want) for all the browsers to interpret it correct */
    <div className="bg-[#0d1421] w-screen h-screen flex flex-col justify-center items-center">
      {/* Here goes more info on compound interest, the formula, historical data,
        etc. */}
      <div className="flex gap-x-4 text-black">
        <div className="bg-slate-50 rounded-lg px-6 pt-8 pb-5">
          <h2 className="font-bold text-2xl">Compound Interest</h2>
          <p className="text-neutral-800 w-[300px] mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            autem dolorum, expedita labore officiis vero sit, possimus alias
            voluptate quis dignissimos necessitatibus quos nisi, nam reiciendis.
            Minima quidem in laudantium.
          </p>
        </div>
        <div className="bg-slate-50 rounded-lg px-6 pt-8 pb-5">
          <h2 className="font-bold text-2xl">The Formula</h2>
          <MathJaxContext>
            <MathJax className="mt-4 pe-1">
              {"\\(FV=P\\cdot(1+r)^{n}\\)"}
            </MathJax>
            <p className="mt-3 text-neutral-800">where:</p>
            <ul className="list-disc list-inside ms-2 text-neutral-800">
              <li>
                <i>FV</i> - is the future value
              </li>
              <li>
                <i>P</i> - is the initial amount
              </li>
              <li>
                <i>r</i> - is the annual interest rate (decimal)
              </li>
              <li>
                <i>n</i> - is number of years of applied annual interest
              </li>
            </ul>
          </MathJaxContext>
          <p className="text-neutral-800 w-[300px] mt-4">
            You can use different compound frequencies like every month but the
            most common is yearly, and the formula above is derived from this.
          </p>
        </div>
      </div>
      <div className="bg-slate-50 rounded-lg px-6 pt-8 pb-5 mt-10 text-black">
        <h2 className="font-bold text-2xl">Historical Data</h2>
        <p className="text-neutral-800 w-[300px] mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam autem
          dolorum, expedita labore officiis vero sit, possimus alias voluptate
          quis dignissimos necessitatibus quos nisi, nam reiciendis. Minima
          quidem in laudantium.
        </p>
      </div>

      {/* TODO: Historical stats with reference. Things like average return on stock market,
       the chance of positive return, annual inflation rate. WARNING of   */}
      <div></div>

      {/* TODO: short facts related to compound interest and investing */}
      <div></div>
    </div>
  );
}
