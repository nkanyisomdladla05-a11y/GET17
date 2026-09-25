import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CheckoutForm } from "@/components/commerce/CheckoutForm";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <>
      <PageHeader eyebrow="Checkout" title="Almost there" />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <CheckoutForm />
        </div>
      </section>
    </>
  );
}
