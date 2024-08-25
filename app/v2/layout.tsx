import { CompoundInterestFormProvider } from "../_context/CompoundInterestFormContext";

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <CompoundInterestFormProvider>{children}</CompoundInterestFormProvider>
  );
}
