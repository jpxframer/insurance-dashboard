import { CustomerActivityCard, CustomerCommunicationCard } from "./CustomerActivity";
import { CustomerAside } from "./CustomerAside";
import { CustomerClaimsCard, CustomerPoliciesCard } from "./CustomerRecords";

/**
 * Desktop customer detail body: the 280px aside beside a column holding the two
 * record tables, then activity and communication side by side beneath them.
 */
export function CustomerDetailDesktop() {
  return (
    <div className="leading-figma hidden flex-1 gap-4 px-6 py-4 lg:flex">
      <CustomerAside />

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <CustomerPoliciesCard />
        <CustomerClaimsCard />

        <div className="flex min-h-0 flex-1 gap-4">
          <CustomerActivityCard />
          <CustomerCommunicationCard />
        </div>
      </div>
    </div>
  );
}
