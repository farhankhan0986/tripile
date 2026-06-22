import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works  Tripile",
  description:
    "See exactly how Tripile books your perfect trip in three simple steps  search, speak with a real agent, then travel.",
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
