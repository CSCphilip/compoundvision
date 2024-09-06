import { CompoundInterestFormProvider } from "../_context/CompoundInterestFormContext";

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-hidden">
      <CompoundInterestFormProvider>{children}</CompoundInterestFormProvider>
    </div>
  );
}
