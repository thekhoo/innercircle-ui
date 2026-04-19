import { NavBar } from "@/components/nav-bar";
import { CountdownTimer } from "@/components/countdown-timer";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const placeholderCards = [
  {
    title: "My Draws",
    description: "Your assigned teams will appear here once the draw is live.",
  },
  {
    title: "Leaderboard",
    description: "Rankings and points will be tracked throughout the tournament.",
  },
  {
    title: "Fixtures",
    description: "Match schedules and results will be displayed here.",
  },
];

export default function HomePage() {
  return (
    <div
      className="min-h-screen flex flex-col bg-[var(--color-warm-white)]"
      style={{ animation: "page-fade-in 800ms ease-out forwards" }}
    >
      <NavBar />

      <main className="flex-1 flex flex-col items-center px-6 py-12 max-w-4xl mx-auto w-full">
        {/* Hero: Countdown */}
        <section className="w-full text-center border-b border-stone-200 pb-12 mb-12">
          <CountdownTimer />
        </section>

        {/* Placeholder Cards */}
        <section className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
          {placeholderCards.map((card) => (
            <Card
              key={card.title}
              className="border-stone-200 bg-white shadow-none hover:shadow-sm transition-shadow duration-200"
            >
              <CardHeader>
                <CardTitle className="text-stone-800 font-normal text-sm tracking-[0.15em] uppercase">
                  {card.title}
                </CardTitle>
                <CardDescription className="text-stone-400 text-xs leading-relaxed">
                  {card.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
