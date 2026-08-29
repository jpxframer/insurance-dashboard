import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { CustomerDetailDesktop } from "@/components/customers/CustomerDetailDesktop";
import { CustomerDetailHeader } from "@/components/customers/CustomerDetailHeader";
import {
  CustomerDetailMobileBody,
  CustomerDetailMobileHeader,
} from "@/components/customers/CustomerDetailMobile";
import { customerDetail, customers } from "@/lib/customers";

export const metadata: Metadata = {
  title: `${customerDetail.name} · Surebase`,
  description: `Customer record for ${customerDetail.name}.`,
};

/** Every row in the list is a real route, so all ten prerender. */
export function generateStaticParams() {
  return customers.map((customer) => ({ id: customer.id.toLowerCase() }));
}

/**
 * Customer detail — Figma `20875-32812` (desktop) and `20875-33328` (mobile).
 *
 * Only Marcus Johnson is designed, so every id renders his record — see the
 * deviation note in AGENTS.md. `params` is a promise in Next 16.
 */
export default async function CustomerDetailPage(props: PageProps<"/customers/[id]">) {
  await props.params;

  return (
    <DashboardShell
      activeId="customers"
      topBar={<CustomerDetailHeader />}
      mobileHeader={<CustomerDetailMobileHeader />}
    >
      <CustomerDetailDesktop />
      <CustomerDetailMobileBody />
    </DashboardShell>
  );
}
