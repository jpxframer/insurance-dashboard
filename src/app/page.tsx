import { AiInsightsCard, MobileAiInsight } from "@/components/dashboard/AiInsightsCard";
import { MobileQuickActions } from "@/components/dashboard/MobileQuickActions";
import { PolicyDistributionCard } from "@/components/dashboard/PolicyDistributionCard";
import {
  MobileRecentClaims,
  RecentClaimsCard,
} from "@/components/dashboard/RecentClaimsCard";
import { RevenueTrendCard } from "@/components/dashboard/RevenueTrendCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { TasksCard } from "@/components/dashboard/TasksCard";
import { UpcomingRenewalsCard } from "@/components/dashboard/UpcomingRenewalsCard";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { stats } from "@/lib/data";

/*
  The desktop column ratios below are the measured Figma widths (1156px of
  content across three columns with two 16px gaps). Expressing them as `fr`
  keeps the proportions while letting the grid scale past 1440px.

  Each block stacks on mobile in exactly the order the mobile frame uses, so no
  `order` overrides are needed — only Policy distribution, which the mobile
  frame omits, drops out.
*/
export default function DashboardPage() {
  return (
    <DashboardShell activeId="dashboard">
      <div className="flex flex-col gap-4 px-5 pb-6 pt-4 lg:gap-4 lg:px-6 lg:pb-5 lg:pt-[18px]">
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </section>

        <MobileQuickActions />

        <section className="grid gap-4 lg:grid-cols-[548fr_279fr_297fr]">
          <RevenueTrendCard />
          <PolicyDistributionCard />
          <AiInsightsCard />
          <MobileAiInsight />
        </section>

        <section className="grid gap-4 lg:grid-cols-[843fr_297fr] lg:items-start">
          <RecentClaimsCard />
          <MobileRecentClaims />

          <div className="flex flex-col gap-4">
            <UpcomingRenewalsCard />
            <TasksCard />
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
