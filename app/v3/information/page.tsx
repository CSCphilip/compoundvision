import { Button } from "@/components/ui/button";

// TODO: Work to be done here
export default function Information() {
  return (
    <div className="bg-[#0d1421] w-screen h-screen flex flex-col  justify-center items-center text-white">
      <p>
        Here goes more info on compound interest, the formula, historical data,
        etc.
      </p>

      <Button className="mt-10">Click me</Button>

      {/* NOTE: Add text-white (or other color you want) for all the browsers to interpret it correct */}

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
