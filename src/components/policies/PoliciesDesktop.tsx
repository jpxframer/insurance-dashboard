"use client";

import { useCallback, useMemo, useState } from "react";
import { BulkActionBar } from "./BulkActionBar";
import { PoliciesTable } from "./PoliciesTable";
import { PoliciesToolbar } from "./PoliciesToolbar";
import { initialSelection, policies, type DensityId } from "@/lib/policies";

/**
 * Desktop Policies view. Owns the two pieces of state the frame actually
 * documents — which rows are selected, and the row density — because the bulk
 * bar and the table both read them.
 *
 * The column is pinned to one viewport height so the table card can flex and
 * hold its footer at the bottom, matching the frame's 900px layout.
 */
export function PoliciesDesktop() {
  const [density, setDensity] = useState<DensityId>("compact");
  const [selected, setSelected] = useState<ReadonlySet<string>>(
    () => new Set(initialSelection),
  );

  const toggle = useCallback((id: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelected((current) =>
      current.size === policies.length ? new Set() : new Set(policies.map((p) => p.id)),
    );
  }, []);

  const deselect = useCallback(() => setSelected(new Set()), []);

  const count = useMemo(() => selected.size, [selected]);

  return (
    <div className="leading-figma hidden h-[calc(100dvh-var(--spacing-topbar))] flex-col gap-4 px-6 pt-3.5 pb-4 lg:flex">
      <PoliciesToolbar density={density} onDensityChange={setDensity} />

      {count > 0 ? <BulkActionBar count={count} onDeselect={deselect} /> : null}

      <PoliciesTable
        density={density}
        selected={selected}
        onToggle={toggle}
        onToggleAll={toggleAll}
      />
    </div>
  );
}
