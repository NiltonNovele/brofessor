export const dynamic = "force-dynamic";
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import Hero from "@/components/Hero";
import Info from "@/components/info";

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  return (
  <main>
    <Hero />

    <h1>Popular Companions</h1>
    <section className="home-section">
      {companions.map((companion) => (
        <CompanionCard
          key={companion.id}
          {...companion}
          color={getSubjectColor(companion.subject)}
        />
      ))}
    </section>

    <section className="home-section">
      <CompanionsList
        title="Recently completed sessions"
        companions={recentSessionsCompanions}
        classNames="w-2/3 max-lg:w-full"
      />
      <CTA />
    </section>

    <hr className="my-10 h-1 bg-orange-500 border-none rounded-full" />

    {/* Move Info OUTSIDE of previous section */}
    <section className="container mx-auto py-12">
      <Info />
    </section>
  </main>
);

};

export default Page;
