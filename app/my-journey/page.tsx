import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
  getBookmarkedCompanions,
} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";
import Link from "next/link";

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);
  const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

  // Weekly report mock data
  const weeklyReport = {
    quizzesCompleted: 5,
    accuracyRate: 88,
    timeSpent: '4h 30m',
  };

  return (
    <main className="min-lg:w-3/4 space-y-10">
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={110}
            height={110}
            className="rounded-full border-2 border-orange-500"
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl text-orange-600">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="border border-orange-200 bg-orange-50 rounded-lg p-3 gap-2 flex flex-col h-fit shadow-sm">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/check.svg"
                alt="checkmark"
                width={22}
                height={22}
              />
              <p className="text-2xl font-bold text-orange-600">{sessionHistory.length}</p>
            </div>
            <div className="text-sm text-gray-600">Lessons completed</div>
          </div>
          <div className="border border-orange-200 bg-orange-50 rounded-lg p-3 gap-2 flex flex-col h-fit shadow-sm">
            <div className="flex gap-2 items-center">
              <Image src="/icons/cap.svg" alt="cap" width={22} height={22} />
              <p className="text-2xl font-bold text-orange-600">{companions.length}</p>
            </div>
            <div className="text-sm text-gray-600">Companions created</div>
          </div>
        </div>
      </section>

      <Accordion type="multiple" className="space-y-4">
        <AccordionItem value="bookmarks">
          <AccordionTrigger className="text-2xl font-bold text-orange-700">
            Bookmarked Companions ({bookmarkedCompanions.length})
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              companions={bookmarkedCompanions}
              title="Bookmarked Companions"
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold text-orange-700">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              title="Recent Sessions"
              companions={sessionHistory}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold text-orange-700">
            My Companions ({companions.length})
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="My Companions" companions={companions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <section className="relative bg-orange-50 border border-orange-100 rounded-xl p-6 shadow-sm mt-8 overflow-hidden">
  <div className="absolute inset-0 backdrop-blur-sm bg-white/60 z-10 rounded-xl flex flex-col items-center justify-center text-center px-4">
    <h2 className="text-xl font-bold text-orange-700 mb-2">🔒 Upgrade to Unlock</h2>
    <p className="text-sm text-gray-700 mb-4">
      Get access to your personalized weekly report including quizzes, accuracy, and study time.
    </p>
    <Link href="/subscription">
      <button className="bg-orange-600 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-orange-700 transition">
        Upgrade Plan
      </button>
    </Link>
  </div>

  <h2 className="text-xl font-bold text-orange-700 mb-4 z-0">📈 Weekly Report</h2>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 opacity-30 pointer-events-none select-none z-0">
    <div className="flex flex-col items-center">
      <p className="text-3xl font-bold text-orange-600">5</p>
      <p className="text-sm text-gray-600">Quizzes Completed</p>
    </div>
    <div className="flex flex-col items-center">
      <p className="text-3xl font-bold text-orange-600">88%</p>
      <p className="text-sm text-gray-600">Average Accuracy</p>
    </div>
    <div className="flex flex-col items-center">
      <p className="text-3xl font-bold text-orange-600">4h 30m</p>
      <p className="text-sm text-gray-600">Time Spent Learning</p>
    </div>
  </div>
</section>

    </main>
  );
};

export default Profile;
