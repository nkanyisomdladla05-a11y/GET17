import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { AccountView } from "@/components/commerce/AccountView";

export const metadata: Metadata = { title: "My Account" };

export default function AccountPage() {
  return (
    <>
      <PageHeader eyebrow="My account" title="Your orders and access" />
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AccountView />
        </div>
      </section>
    </>
  );
}
