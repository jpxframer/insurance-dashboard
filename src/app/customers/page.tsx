import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { CustomersDesktop } from "@/components/customers/CustomersDesktop";
import {
  CustomersMobileHeader,
  CustomersMobileList,
} from "@/components/customers/CustomersMobile";
import { CustomersTopBar } from "@/components/customers/CustomersTopBar";
import { customersPage } from "@/lib/customers";

export const metadata: Metadata = {
  title: `${customersPage.title} · Surebase`,
  description: customersPage.meta,
};

/**
 * Customers list — Figma `20875-32342` (desktop) and `20875-33178` (mobile).
 *
 * One list at two breakpoints: a ten-column table under four stat tiles on
 * desktop, a stack of cards on mobile. Rows link through to `/customers/[id]`.
 */
export default function CustomersPage() {
  return (
    <DashboardShell
      activeId="customers"
      topBar={<CustomersTopBar />}
      mobileHeader={<CustomersMobileHeader />}
    >
      <CustomersDesktop />
      <CustomersMobileList />
    </DashboardShell>
  );
}
