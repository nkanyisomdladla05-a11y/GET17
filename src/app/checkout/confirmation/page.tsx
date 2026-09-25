import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Confirmation } from "@/components/commerce/Confirmation";

export const metadata: Metadata = { title: "Order confirmation" };

export default function ConfirmationPage() {
  return (
    <>
      <PageHeader eyebrow="Confirmation" title="Thank you" />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Suspense fallback={<div className="glass h-64 animate-pulse rounded-[2rem]" />}>
            <Confirmation />
          </Suspense>
        </div>
      </section>
    </>
  );
}
