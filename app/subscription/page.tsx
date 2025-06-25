"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Freemium",
    price: "$0",
    benefits: [
      "Up to 20 AI conversations per month",
      "Create up to 3 AI companions",
      "Save & export conversations",
      "Limited Access to Academic Library",
      "Use flashcards & practice quizzes",
    ],
  },
  {
    name: "Core",
    price: "$4.99/mo",
    benefits: [
      "Everything in Freemium",
      "Up to 100 AI conversations per month",
      "Create up to 10 AI companions",
      "Basic session summaries",
      "500MB Academic Library storage",
    ],
  },
  {
    name: "Ultimate",
    price: "$9.99/mo",
    benefits: [
      "Everything in Core + early feature access",
      "Unlimited conversations & companion creation",
      "AI chat & Smart Academic Calendar",
      "Performance dashboard & session recaps",
      "Bookmark companions",
      "Unlimited Academic Library storage",
      "And a lot more",
    ],
  },
];

const Subscription = () => {
  return (
    <main className="py-16 px-4">
      <div className="mb-20 text-center">
        <h2 className="text-3xl font-extrabold mb-8 text-orange-600 tracking-wide">
          Choose Your Plan
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {plans.map(({ name, price, benefits }, i) => {
            const isCore = name === "Core";
            const isFreemium = name === "Freemium";

            return (
              <div
                key={name}
                className={`w-full sm:w-80 rounded-lg p-8 border shadow-sm transition flex flex-col relative ${
                  isCore
                    ? "border-orange-500 ring-2 ring-orange-400 bg-orange-50"
                    : "border-orange-300 hover:shadow-lg"
                }`}
              >
                {isCore && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                    Most Popular
                  </span>
                )}

                <h3 className="text-2xl font-bold mb-4 text-[#0c1b33]">
                  {name}
                </h3>
                <p className="text-5xl font-extrabold mb-6 text-orange-500">
                  {price}
                </p>
                <ul className="mb-6 flex-1 space-y-3 text-gray-700 text-left">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <CheckCircle
                        size={20}
                        className="text-orange-500 flex-shrink-0"
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                {isFreemium ? (
                  <button
                    disabled
                    className="mt-auto bg-gray-300 text-gray-600 py-3 rounded-md font-semibold cursor-default"
                  >
                    Current Plan
                  </button>
                ) : (
                  <Link href="/subscription/checkout" passHref>
                    <button
                      className={`group mt-auto w-full py-3 px-6 rounded-lg font-semibold tracking-wide transition-all duration-200
                        ${
                          isCore
                            ? "bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-300/30"
                            : "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-200/20"
                        }
                        hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2`}
                    >
                      <span className="group-hover:tracking-wider transition-all duration-200">
                        Try Now
                      </span>
                    </button>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Subscription;
