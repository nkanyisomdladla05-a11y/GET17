import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CartView } from "@/components/commerce/CartView";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <>
      <PageHeader eyebrow="Cart" title="Your cart" />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <CartView />
        </div>
      </section>
    </>
  );
}
