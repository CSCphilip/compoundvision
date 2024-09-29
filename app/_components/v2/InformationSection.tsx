import Link from "next/link";

export default function InformationSection() {
  return (
    <div className="flex flex-col items-center">
      <p className="w-[715px] text-center text-xl text-neutral-200 mt-[30px]">
        CompoundVision combines the concept of compound interest with
        interactive visualization, demonstrating the powerful impact of this
        financial principle. Compound interest is like a snowball that grows
        faster as it gets bigger; you earn interest not only on the initial
        amount invested but also on the interest you&apos;ve already earned.
        This calculator can also factor in inflation, allowing you to see the
        real future value of your savings, and monthly contributions for even
        greater returns. Those who neglect it miss out on a significant
        opportunity. The goal of CompoundVision is to motivate people to start
        saving for a more secure and prosperous future.
      </p>

      <Link
        href="/v2/information"
        className="mt-20 text-lg font-medium hover:text-lime-200 border rounded-md px-20 py-4 text-white"
      >
        Read more
      </Link>
    </div>
  );
}
