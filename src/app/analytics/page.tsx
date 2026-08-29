import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/DashboardShell";
import {
  AgentPerformanceCard,
  AgentPerformanceList,
  ClaimsByTypeCard,
  PremiumByRegionCard,
  PremiumChartCard,
} from "@/components/analytics/AnalyticsCards";
import {
  AnalyticsKpis,
  AnalyticsMobileHeader,
  AnalyticsTopBar,
} from "@/components/analytics/AnalyticsChrome";
import { analyticsPage } from "@/lib/analytics";

export const metadata: Metadata = {
  title: `${analyticsPage.title} · Surebase`,
  description: "Loss ratio, retention and agent performance across the book.",
};

/**
 * Analytics — Figma `20875-33493` (desktop) and `20875-33812` (mobile).
 *
 * Desktop lays the four cards on a 1.5 : 1 grid of two rows; mobile stacks them
 * and turns the agent table into one card per agent.
 */
export default function AnalyticsPage() {
  return (
    <DashboardShell
      activeId="analytics"
      topBar={<AnalyticsTopBar />}
      mobileHeader={<AnalyticsMobileHeader />}
    >
      {/* Desktop */}
      <div className="leading-figma hidden h-[calc(100dvh-var(--spacing-topbar))] flex-col gap-3 px-6 py-4 lg:flex">
        <AnalyticsKpis />

        <div className="grid h-[272px] w-full shrink-0 grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-3">
          <PremiumChartCard />
          <ClaimsByTypeCard />
        </div>

        <div className="grid min-h-0 w-full flex-1 grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-3">
          <AgentPerformanceCard />
          <PremiumByRegionCard />
        </div>
      </div>

      {/* Mobile */}
      <div className="leading-figma flex flex-col gap-4 px-4 py-4 lg:hidden">
        <AnalyticsKpis variant="mobile" />
        <PremiumChartCard variant="mobile" />
        <ClaimsByTypeCard variant="mobile" />
        <AgentPerformanceList />
        <PremiumByRegionCard variant="mobile" />
      </div>
    </DashboardShell>
  );
}
