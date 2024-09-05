export default function InformationSection() {
  return (
    <div className="flex flex-col items-center">
      {/* NOTE: The following text paragraph could be some exotic color like text-teal-200 */}

      <p className="w-[715px] text-center text-xl text-neutral-200">
        CompoundVision combines the concept of compound interest with
        interactive visualization, demonstrating the powerful impact of this
        financial principle. Compound interest is like a snowball that grows
        faster as it gets bigger; you earn interest not only on the initial
        amount invested but also on the interest you've already earned. This
        calculator can also factor in inflation, allowing you to see the real
        future value of your savings, and monthly contributions for even greater
        returns. Those who neglect it miss out on a significant opportunity. The
        goal of CompoundVision was to motivate people to start saving for a more
        secure and prosperous future.
      </p>

      {/* <Link>Read more</Link> */}

      {/* TODO: More detailed description of compound interest in compared to the above. */}
      <p></p>

      {/* TODO: More detailed description of the graph and this calculator and fields in the form. */}
      <p></p>

      {/* TODO: Historical stats with reference. Things like average return on stock market,
       the chance of positive return, annual inflation rate  */}
      <div></div>

      {/* TODO: short facts related to compound interest and investing */}
      <div></div>
    </div>
  );
}
