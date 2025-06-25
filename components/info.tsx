"use client";

import { useState, useRef, useEffect } from "react";
import { Cpu, BookOpen, Globe, Clock, Zap, Users, CloudLightning, MessageCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

// Stats with animated count-up and comments
const stats = [
  { label: "Users", value: 53, comment: "and growing every day!" },
  { label: "Companions Created", value: 76, comment: "custom AI brains made." },
  { label: "Accuracy", value: 98, suffix: "%", comment: "based on real user feedback." },
  { label: "Update Rate", value: 1, suffix: "/week", comment: "We’re constantly improving." },
];

// 8 Key Features with Icons
const features = [
  {
    icon: <MessageCircle size={28} className="text-orange-500 mb-4" />,
    title: "Human-Like AI Conversations",
    description:
      "Chat naturally with AI that explains topics like a friend, making learning easy and fun.",
  },
  {
    icon: <BookOpen size={28} className="text-orange-500 mb-4" />,
    title: "Flashcards & Quizzes Generator",
    description:
      "Automatically create flashcards and quizzes to help you study and retain knowledge effectively.",
  },
  {
    icon: <Cpu size={28} className="text-orange-500 mb-4" />,
    title: "Personalized Academic Library",
    description:
      "Upload your notes and build AI companions tailored to your study materials.",
  },
  {
    icon: <Clock size={28} className="text-orange-500 mb-4" />,
    title: "Smart Academic Calendar",
    description:
      "Plan your tests, set study schedules, and stay on top of your academic deadlines.",
  },
  {
    icon: <Zap size={28} className="text-orange-500 mb-4" />,
    title: "Export & Summarize",
    description:
      "Export your notes and conversations, and get summaries to review key points quickly.",
  },
  {
    icon: <Globe size={28} className="text-orange-500 mb-4" />,
    title: "Wide Subject Coverage",
    description:
      "Support for diverse subjects and fields, from high school to university level.",
  },
  {
    icon: <Users size={28} className="text-orange-500 mb-4" />,
    title: "Community Support",
    description:
      "Connect with fellow learners and share study tips and resources.",
  },
  {
    icon: <CloudLightning size={28} className="text-orange-500 mb-4" />,
    title: "Regular Updates",
    description:
      "Continuous improvements to keep your learning tools fresh and effective.",
  },
];

// Pricing Plans
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
}
];


// FAQs
const faqs = [
  {
    question: "How accurate is BroFessor’s AI in providing answers?",
    answer:
      "BroFessor’s AI has a verified accuracy rate of over 90%, backed by real user feedback and weekly updates to improve performance and reliability.",
  },
  {
    question: "Can I use BroFessor for different school subjects and levels?",
    answer:
      "Absolutely! BroFessor supports a wide range of subjects — from math and science to history and languages — across primary, secondary, and university levels.",
  },
  {
    question: "Is there a free version of BroFessor I can try?",
    answer:
      "Yes! Our Freemium plan gives you access to essential features at no cost — including 10 AI conversations per month, flashcards, and more.",
  },
  {
    question: "How can I upgrade my plan?",
    answer:
      "Upgrading is simple — just head to your Account Settings, choose your desired plan, and follow the on-screen steps to unlock more features.",
  },
  {
    question: "What makes the Core plan the most popular?",
    answer:
      "The Core plan strikes the perfect balance — giving you more AI conversations, extra companion slots, and larger storage without breaking the bank.",
  },
  {
    question: "Can I customize or create my own AI companions?",
    answer:
      "Yes! You can create and personalize your own BroFessor companions, assigning them specific knowledge, roles, and personalities to suit your needs.",
  },
  {
    question: "Is my data safe with BroFessor?",
    answer:
      "Your privacy is our priority. We don’t share or sell your data. All conversations and content are encrypted and stored securely.",
  },
  {
    question: "Does BroFessor work on mobile and tablet devices?",
    answer:
      "Definitely. BroFessor is fully responsive and optimized for all modern devices, so you can study on the go, anytime, anywhere.",
  },
];



export default function Info() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Count-up animation
  useEffect(() => {
    const intervals = stats.map((stat, i) => {
      const step = Math.ceil(stat.value / 40);
      return setInterval(() => {
        setCounts((prev) => {
          const updated = [...prev];
          if (updated[i] < stat.value) {
            updated[i] = Math.min(updated[i] + step, stat.value);
          }
          return updated;
        });
      }, 30);
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  // Accordion animation
  useEffect(() => {
    contentRefs.current.forEach((el, i) => {
      if (!el) return;
      if (openFAQ === i) {
        el.style.maxHeight = el.scrollHeight + "px";
      } else {
        el.style.maxHeight = "0px";
      }
    });
  }, [openFAQ]);

  return (
    <section className="bg-transparent text-[#0c1b33] py-16 px-6 md:px-20 font-sans max-w-7xl mx-auto">
      {/* Stats */}
      <div className="mb-16 text-center">
        <h2 className="text-3xl font-extrabold mb-8 text-orange-600 tracking-wide">Stats</h2>
        <div className="flex justify-center flex-wrap gap-8">
          {stats.map(({ label, value, suffix, comment }, i) => (
            <div
              key={label}
              className="min-w-[160px] border border-orange-300 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition"
            >
              <p className="text-4xl font-bold text-orange-500">
                {counts[i]}
                {suffix || ""}
              </p>
              <p className="mt-2 text-lg font-medium">{label}</p>
              <p className="text-sm text-gray-500 mt-1">{comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-20 text-center">
        <h2 className="text-3xl font-extrabold mb-12 text-orange-600 tracking-wide">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="rounded-lg p-6 border border-orange-300 shadow-sm hover:shadow-lg transition flex flex-col items-center"
            >
              {icon}
              <h3 className="text-xl font-semibold mb-2 text-[#0c1b33]">{title}</h3>
              <p className="text-gray-700 text-center">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
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

          <h3 className="text-2xl font-bold mb-4 text-[#0c1b33]">{name}</h3>

          {/* Updated pricing display */}
          <p className="text-5xl font-extrabold mb-2 text-orange-500 line-through">{price}</p>
          <p className="text-2xl font-bold mb-6 text-green-600">Free</p>

          <ul className="mb-6 flex-1 space-y-3 text-gray-700 text-left">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <CheckCircle size={20} className="text-orange-500 flex-shrink-0" />
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
            <button
              disabled
              className="group mt-auto w-full py-3 px-6 rounded-lg font-semibold tracking-wide transition-all duration-200
              bg-gray-300 text-gray-600 cursor-default"
            >
              Free Access
            </button>
          )}
        </div>
      );
    })}
  </div>
</div>




      {/* FAQs */}
      <div className="mb-12 max-w-3xl mx-auto">
  <h2 className="text-3xl font-extrabold mb-10 text-orange-600 tracking-wide text-center">
    Frequently Asked Questions
  </h2>
  <div className="space-y-4">
    {faqs.map(({ question, answer }, idx) => {
      const isOpen = openFAQ === idx;
      return (
        <div
          key={question}
          className="border border-orange-300 rounded-lg cursor-pointer select-none shadow-sm hover:shadow-md transition"
        >
          <button
            type="button"
            aria-expanded={isOpen}
            onClick={() => setOpenFAQ(isOpen ? null : idx)}
            className="w-full flex justify-between items-center p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
          >
            <h3 className="font-semibold text-lg text-[#0c1b33] text-left">{question}</h3>
            <span
              aria-hidden="true"
              className={`flex items-center justify-center w-7 h-7 text-orange-500 font-bold text-xl select-none transition-transform duration-300 ${
                isOpen ? "rotate-45" : "rotate-0"
              }`}
            >
              +
            </span>
          </button>
          <div
            ref={(el) => {
              if (el && isOpen) {
                el.style.maxHeight = `${el.scrollHeight}px`;
              } else if (el) {
                el.style.maxHeight = "0px";
              }
            }}
            className="overflow-hidden transition-[max-height] duration-500 px-4 pb-4 text-gray-700 text-left leading-relaxed"
            aria-hidden={!isOpen}
          >
            {answer}
          </div>
        </div>
      );
    })}
  </div>
</div>


    </section>
  );
}
