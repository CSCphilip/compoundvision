"use client";

import { MathJax, MathJaxContext } from "better-react-mathjax";
import Link from "next/link";

export default function Information() {
  function scrollToTop() {
    // Scroll to the top on submit to always see the chart
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="bg-[#0d1421] w-screen min-h-screen overflow-x-hidden p-4 sm:p-6">
      <div className="w-full flex justify-center mb-4 sm:mb-6">
        <Link href="/v3">
          <svg
            className="fill-white hover:fill-gray-400 size-10"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M9.66088 8.53078C9.95402 8.23813 9.95442 7.76326 9.66178 7.47012C9.36913 7.17698 8.89426 7.17658 8.60112 7.46922L9.66088 8.53078ZM4.47012 11.5932C4.17698 11.8859 4.17658 12.3607 4.46922 12.6539C4.76187 12.947 5.23674 12.9474 5.52988 12.6548L4.47012 11.5932ZM5.51318 11.5771C5.21111 11.2936 4.73648 11.3088 4.45306 11.6108C4.16964 11.9129 4.18475 12.3875 4.48682 12.6709L5.51318 11.5771ZM8.61782 16.5469C8.91989 16.8304 9.39452 16.8152 9.67794 16.5132C9.96136 16.2111 9.94625 15.7365 9.64418 15.4531L8.61782 16.5469ZM5 11.374C4.58579 11.374 4.25 11.7098 4.25 12.124C4.25 12.5382 4.58579 12.874 5 12.874V11.374ZM15.37 12.124V12.874L15.3723 12.874L15.37 12.124ZM17.9326 13.1766L18.4614 12.6447V12.6447L17.9326 13.1766ZM18.25 15.7351C18.2511 16.1493 18.5879 16.4841 19.0021 16.483C19.4163 16.4819 19.7511 16.1451 19.75 15.7309L18.25 15.7351ZM8.60112 7.46922L4.47012 11.5932L5.52988 12.6548L9.66088 8.53078L8.60112 7.46922ZM4.48682 12.6709L8.61782 16.5469L9.64418 15.4531L5.51318 11.5771L4.48682 12.6709ZM5 12.874H15.37V11.374H5V12.874ZM15.3723 12.874C16.1333 12.8717 16.8641 13.1718 17.4038 13.7084L18.4614 12.6447C17.6395 11.8276 16.5267 11.3705 15.3677 11.374L15.3723 12.874ZM17.4038 13.7084C17.9435 14.245 18.2479 14.974 18.25 15.7351L19.75 15.7309C19.7468 14.572 19.2833 13.4618 18.4614 12.6447L17.4038 13.7084Z"
                // fill="#ffffff"
              ></path>
            </g>
          </svg>
        </Link>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-4 max-w-[1700px]">
          <div className="bg-slate-50 text-neutral-800 rounded-xl px-4 sm:px-6 pt-6 sm:pt-8 pb-3 sm:pb-5 lg:w-1/2">
            <h2 className="font-bold text-xl sm:text-2xl">Compound Interest</h2>
            <p className="mt-1 sm:mt-2">
              The financial principle of compound interest is powerful, and
              everyone should know about it. By learning about compound interest
              everyone can increase their future savings. With compound
              interest, you can make your money work for you instead of the
              other way around. Allegedly, Albert Einstein called compound
              interest the eighth wonder of the world.
            </p>
            <p className="mt-3 sm:mt-4">
              The way compound interest works is that you earn interest not only
              on your initial amount but also interest on the previously
              accumulated amount of interest over time. One common way to
              explain compound interest is like creating a snowball. In the
              beginning, when rolling a snowball in the snow it grows slowly but
              the more snow it picks up, the larger the snowball becomes and the
              faster it grows in size. That is why compound interest is often
              spoken of as the snowball effect.
            </p>
            <p className="mt-3 sm:mt-4">
              You can compare compound interest to simple interest where you
              only earn interest on the initial amount. Given you don't save any
              more money, you will earn the same amount of interest. The money
              will linearly grow instead of exponentially which it does with
              compound interest.
            </p>
            <p className="mt-3 sm:mt-4">
              When it comes to compound interest, the most important factor is
              the time you save and allow your saved money to compound. “The
              best time to plant a tree was 30 years ago, the second best time
              is now.” To really get to experience the effects of compound
              interest, it is important to start saving early. To achieve the
              same returns when saving smaller amounts over a longer period, you
              would need to significantly increase the initial amount if saving
              over a shorter period. So saving a small amount every month over a
              period of decades will yield a high return no matter what.
            </p>
            <p className="mt-3 sm:mt-4">
              Mathematically, the formula for compound interest is an
              exponential function that grows at an increasing rate for each
              period (see more in “The Formula”).
            </p>
            <p className="mt-3 sm:mt-4">
              There are different compound interest periods, for instance,
              annually, quarterly, and monthly. The more frequently you compound
              your savings, the higher the returns over time. The interval used
              in CompoundVision is annually which was decided because it is the
              most common.
            </p>
            <p className="mt-3 sm:mt-4">
              Monthly contributions, which you can include in the CompoundVision
              calculator, will also greatly increase your future amount of
              savings. This is because you will earn compound interest on these
              contributions as well. As for the frequency, the monthly
              contributions are compounded annually.
            </p>

            <h3 className="font-bold text-lg mt-3">Example:</h3>
            <p>
              Let's say your initial amount is $1000, and the interest rate each
              year is 10%.
            </p>

            <p className="mt-2">
              <b>Year 1</b> (one year after you started):
              <br />
              Interest: $1000 * 10% = $100
              <br />
              Total: $1000 + $100 = $1100
            </p>
            <p className="mt-2">
              <b>Year 2:</b>
              <br />
              Interest: $1100 * 10% = $110
              <br />
              Total: $1100 + $110 = $1210
            </p>
            <p className="mt-2">
              <b>Year 3:</b>
              <br />
              Interest: $1210 * 10% = $121
              <br />
              Total: $1210 + $121 = $1331
            </p>
            <p className="mt-2">
              As you can see the amount of interest grows each year.
            </p>
            <h3 className="font-bold text-lg mt-3">
              Contrary viewpoint - Debt:
            </h3>
            <p>
              Compound interest also applies to debt. If you have a loan and
              don't pay the interest, this will be added to the debt and
              increase the amount of interest you need to pay in the future. You
              could say it is the reverse as if you saved money with compound
              interest. The debt will increasingly grow, and it gets harder to
              pay it off. That's why it's crucial to pay it off as quickly as
              possible.
            </p>
          </div>

          <div className="flex flex-col gap-y-8 sm:gap-y-4 lg:w-1/2">
            <div className="bg-slate-50 text-neutral-800 rounded-xl px-4 sm:px-6 pt-6 sm:pt-8 pb-3 sm:pb-5 lg:grow">
              <h2 className="font-bold text-xl sm:text-2xl">Inflation</h2>
              <p className="mt-1 sm:mt-2">
                With the CompoundVision calculator, you can enter the annual
                inflation rate. This really shows how much of an impact
                inflation has on each person's savings. There is a common
                misconception when considering the future value of money.
              </p>
              <p className="mt-3 sm:mt-4">
                Inflation is a general increase in prices of goods and services
                over time. This leads to a loss of value of the savings you
                have. Let’s say you have $100, and there's a product you want to
                buy that costs exactly $100. However, when you return to buy the
                product later, it now costs $102 (2% increase). Even though you
                still have the same $100, you can no longer afford the product
                because its price has increased. This means the purchasing power
                of your money has decreased, and that you need more money to buy
                the same product.
              </p>
              <p className="mt-3 sm:mt-4">
                There are two key terms used to describe future monetary value:
                nominal and real. Nominal refers to the future value without
                accounting for inflation, while real value is adjusted for
                inflation, reflecting the true purchasing power.
              </p>
              <p className="mt-3 sm:mt-4">
                Without any interest on your savings, it will decrease in value
                over time. Try the calculator with an interest rate of zero and
                some inflation rate, and you will see the real future value of
                your savings. To counteract the impact of inflation, it is
                important to obtain a minimum of the same annual interest rate
                on your savings as the annual inflation rate. With compound
                interest, it will be easier to beat inflation and increase your
                chance of securing your future prosperity.
              </p>
            </div>

            <div className="bg-slate-50 text-neutral-800 rounded-xl px-4 sm:px-6 pt-6 sm:pt-8 pb-3 sm:pb-5 lg:grow">
              <MathJaxContext>
                <h2 className="font-bold text-xl sm:text-2xl">The Formula</h2>
                <p className="mt-1 sm:mt-2 mb-3 sm:mb-4">
                  The following formulas are used in CompoundVision to calculate
                  the future value.
                </p>
                <MathJax className="w-fit">
                  {"\\(FV=P\\cdot(1+r)^{n}\\)"}
                </MathJax>
                <p className="mt-2 sm:mt-3">where:</p>
                <ul className="list-disc list-inside ms-1">
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
                <p className="mt-3 sm:mt-4">
                  The formula is an exponential function that increasingly grows
                  the greater n becomes (increasingly grows over time). This
                  formula is derived from a more complex one, where the period
                  has been set to one year.
                </p>
                <h3 className="font-bold text-lg mt-3 mb-2 sm:mb-3">
                  Monthly contributions included:
                </h3>
                {/* Here there is two instances of this formula since the first does not fit on smaller screens. */}
                <div className="hidden formula:inline">
                  <MathJax className="w-fit">
                    {
                      "\\(FV=P\\cdot(1+r)^{n}+\\frac{c\\cdot12\\cdot(1+r)^{n}-1}{r}\\)"
                    }
                  </MathJax>
                </div>
                <div className="formula:hidden">
                  <MathJax className="w-fit">
                    {"\\(FV=P\\cdot(1+r)^{n}+\\)"}
                  </MathJax>
                  <MathJax className="w-fit">
                    {"\\(+\\frac{c\\cdot12\\cdot(1+r)^{n}-1}{r}\\)"}
                  </MathJax>
                </div>
                <p className="mt-2 sm:mt-3">where:</p>
                <ul className="list-disc list-inside ms-1">
                  <li>
                    <i>c</i> - is the monthly contribution
                  </li>
                </ul>
                <p className="mt-3 sm:mt-4">
                  The first part of this formula is the same as the previous one
                  shown above. The additional part includes the calculation of
                  compound interest on only the monthly contributions. These
                  parts are added together to obtain the future value. This
                  formula has also been derived from a more complex one, where
                  the period has been set to one year.
                </p>
              </MathJaxContext>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 sm:mt-12 flex justify-center">
        <button
          className="hover:bg-neutral-200 text-white hover:text-black bg-opacity-70 rounded-lg p-2 transition-all"
          onClick={scrollToTop}
        >
          To top
        </button>
      </div>
    </main>
  );
}
