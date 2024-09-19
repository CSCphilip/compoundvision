import Link from "next/link";

export default function InformationSection() {
  return (
    <div className="flex flex-col items-center">
      <p className="px-5 sm:px-0 sm:max-w-[715px] sm:mx-5 text-center sm:text-xl text-neutral-200 mt-[20px] sm:mt-[30px]">
        CompoundVision combines the concept of compound interest with
        interactive visualization, demonstrating the powerful impact of this
        financial principle. Compound interest is like a snowball that grows
        faster as it gets bigger; you earn interest not only on the initial
        amount invested but also on the interest you've already earned. This
        calculator can also factor in inflation, allowing you to see the real
        future value of your savings, and monthly contributions for even greater
        returns. Those who neglect it miss out on a significant opportunity. The
        goal of CompoundVision is to motivate people to start saving for a more
        secure and prosperous future.
      </p>

      <Link
        href="/v3/information"
        className="mt-14 sm:mt-20 text-sm sm:text-lg font-medium hover:text-cyan-200 border rounded-md px-14 sm:px-20 py-3 sm:py-4 text-white"
      >
        Read more
      </Link>
    </div>
  );
}
