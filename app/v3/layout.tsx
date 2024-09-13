import { CompoundInterestProvider } from "../_context/CompoundInterestFormContext";

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-hidden">
      <CompoundInterestProvider>{children}</CompoundInterestProvider>
    </div>
  );
}
