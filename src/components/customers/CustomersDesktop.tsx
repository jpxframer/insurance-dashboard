"use client";

import { useState } from "react";
import { CustomerStatTiles } from "./CustomerStatTiles";
import { CustomersTable } from "./CustomersTable";
import { CustomersToolbar } from "./CustomersToolbar";
import { customerTabs } from "@/lib/customers";
import type { DensityId } from "@/lib/policies";

/**
 * Desktop Customers list. Pinned to one viewport height so the table card can
 * flex and hold its footer at the bottom, as the frame shows.
 *
 * Tabs and dropdowns carry their designed states but do not filter — no frame
 * defines a result set for any of them.
 */
export function CustomersDesktop() {
  const [tab, setTab] = useState(customerTabs[0].id);
  const [density, setDensity] = useState<DensityId>("compact");

  return (
    <div className="leading-figma hidden h-[calc(100dvh-var(--spacing-topbar))] flex-col gap-3 px-6 pt-[18px] pb-5 lg:flex">
      <CustomerStatTiles />
      <CustomersToolbar
        activeTab={tab}
        onTabChange={setTab}
        density={density}
        onDensityChange={setDensity}
      />
      <CustomersTable density={density} />
    </div>
  );
}
