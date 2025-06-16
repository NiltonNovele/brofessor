"use client";

import { useState } from "react";
import { Accordion, AccordionItem } from "@radix-ui/react-accordion";
import {
  Brain,
  Users,
  MessageCircle,
  FileText,
  ChevronDown,
  Bot,
  Lightbulb,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Dialog } from "@headlessui/react";

const sections = [
  { id: "about", label: "About" },
  { id: "team", label: "Team" },
  { id: "how", label: "How It Works" },
  { id: "ai", label: "AI Companions" },
  { id: "docs", label: "Docs" },
];

const AboutPage = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const images = [
    { src: "/2.png", alt: "Chat UI" },
    { src: "/1.png", alt: "Feature UI" },
    { src: "/3.png", alt: "Analytics" },
    { src: "/4.png", alt: "AI Avatar" },
  ];

  const openModal = (index: number) => {
    setCurrent(index);
    setIsOpen(true);
  };

  const next = () => setCurrent((current + 1) % images.length);
  const prev = () => setCurrent((current - 1 + images.length) % images.length);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const toggleAccordion = (item: string) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <main className="w-full bg-white text-[#333]">
      <nav className="relative w-full bg-white/90 backdrop-blur border-b border-orange-100 shadow-sm py-4">
        <ul className="flex justify-center gap-6 text-sm sm:text-base font-semibold text-orange-600">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="hover:underline">
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section
        id="about"
        className="max-w-7xl mx-auto px-6 py-20 text-center space-y-8"
      >
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <Brain className="w-12 h-12 text-orange-500 mx-auto" />
          <h1 className="text-5xl font-bold text-orange-600">
            BroFessor: Learn Anything, With Anyone
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            BroFessor lets you create and customize your own AI learning
            companions — trained to help you master anything, from algebra to
            astrophysics. It's education, but personal.
          </p>
          <div className="w-full h-[700px] rounded-xl bg-orange-100 shadow-inner flex items-center justify-center mt-6 relative">
            <Image
              src="/botkid.jpg"
              alt="BroFessor Banner"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-xl"
            />
          </div>
        </motion.div>
      </section>

      <section
        id="team"
        className="max-w-7xl mx-auto px-6 py-20 space-y-12 text-center"
      >
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <Users className="w-12 h-12 text-orange-500 mx-auto" />
          <h2 className="text-4xl font-bold text-orange-600">
            The Brain Behind BroFessor
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto mt-4">
            It's Literally just me.
          </p>

          <div className="flex flex-col gap-16 pt-12 max-w-4xl mx-auto">
            {/* Founder 1 */}
            <div className="flex items-center gap-6 text-left">
              <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                <Image
                  src="/nilton.jpeg"
                  alt="Nilton Novele"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold">Nilton Novele</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Founder & Developer
                </p>
                <p className="text-gray-700 mb-4 max-w-md">
                  As a procrastinator, I was looking for quickest and most
                  effective way to study for an exam. I didn't find on the
                  internet so I decided to create one, and then I decided to not
                  be a gatekeeper, BroFessor is here now.
                </p>
                {/* <blockquote className="bg-orange-50 border-l-4 border-orange-400 p-4 italic text-orange-700 shadow-sm rounded mb-4 max-w-md">
                  “I will always choose a lazy person to do a difficult job
                  because a lazy person will find an easy way to do it” - Steve
                  Jobs
                </blockquote> */}
                <a
                  href="https://www.linkedin.com/in/nilton-novele-82211821b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="how" className="bg-orange-50 py-20 px-6">
        <motion.div
          className="max-w-7xl mx-auto space-y-16"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl font-bold text-orange-600 text-center">
            How BroFessor Works
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-2xl text-orange-500 font-semibold">
                <Bot /> For Learners
              </h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Create your own AI study buddy</li>
                <li>Talk to it like a friend, learn like a boss</li>
                <li>Supports any topic, any style</li>
                <li>Track what you have learned over time</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-2xl text-orange-500 font-semibold">
                <Lightbulb /> For Educators
              </h3>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Instantly create your own AI study buddy</li>
                <li>
                  Chat like it is your friend — learn like it is your coach
                </li>
                <li>Ask anything, anytime — any topic, any style</li>
                <li>Track your progress and stay on top of your goals</li>
              </ul>
            </div>
          </div>

          {/* Responsive YouTube Embed */}
          <div className="mt-12 aspect-w-16 aspect-h-9 max-w-4xl mx-auto">
            <iframe
              src="https://www.youtube.com/embed/6LPQu21pQlQ?si=sXKpLdiFJTjWDHar"
              title="How BroFessor Works Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-120 rounded-lg shadow-lg"
            />
            <p className="text-gray-700 mb-4 max-w-md pt-8 mx-auto text-center">
              I'm still trying to make a tutorial video (harder than what I
              expected). But in the meantime, you can enjoy this waiting video.
            </p>
          </div>
        </motion.div>
      </section>

      <section
        id="ai"
        className="max-w-7xl mx-auto px-6 py-20 text-center space-y-8"
      >
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <MessageCircle className="text-orange-500 w-10 h-10 mx-auto" />
          <h2 className="text-4xl font-bold text-orange-600">
            Your Personal AI Companion
          </h2>
          <p className="max-w-2xl mx-auto text-gray-700">
            Think of it as your tutor, motivator, and friend — powered by AI.
            Whether you need help with math, coding, languages or test prep,
            your BroFessor has your back 24/7.
          </p>

          {/* Images — update paths as needed */}
          <div className="relative max-w-4xl mx-auto mt-10 h-64 sm:h-80 grid grid-cols-3 grid-rows-2 gap-4 select-none overflow-hidden">
            <div
              className="col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
              onClick={() => openModal(0)}
            >
              <Image
                src="/2.png"
                alt="Chat UI"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
              onClick={() => openModal(1)}
            >
              <Image
                src="/1.png"
                alt="Feature UI"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
              onClick={() => openModal(2)}
            >
              <Image
                src="/3.png"
                alt="Analytics"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              className="absolute bottom-0 right-0 w-40 h-40 rounded-xl overflow-hidden shadow-2xl border-4 border-white cursor-pointer"
              style={{ transform: "translate(25%, 25%)" }}
              onClick={() => openModal(3)}
            >
              <Image
                src="/4.png"
                alt="AI Avatar"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Modal */}
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="fixed inset-0 z-50"
          >
            <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <div className="relative max-w-3xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold leading-none"
                  aria-label="Close modal"
                >
                  &times;
                </button>
                <div className="relative w-full h-[70vh] bg-black">
                  <Image
                    src={images[current].src}
                    alt={images[current].alt}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="flex justify-between mt-4 px-4 pb-4 space-x-4">
                  <button
                    onClick={prev}
                    className="flex-1 text-white px-4 py-2 bg-orange-500 rounded hover:bg-orange-600 transition"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-white px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition"
                  >
                    Exit
                  </button>
                  <button
                    onClick={next}
                    className="flex-1 text-white px-4 py-2 bg-orange-500 rounded hover:bg-orange-600 transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </Dialog>
        </motion.div>
      </section>

      <section id="docs" className="bg-orange-50 py-20 px-6">
        <motion.div
          className="max-w-4xl mx-auto space-y-10"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <FileText className="text-orange-500 w-10 h-10 mx-auto" />
          <h2 className="text-4xl font-bold text-orange-600 text-center">
            Legal & Documentation
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                title: "Terms & Conditions",
                desc: "All terms, responsibilities, and platform rules.",
                file: "/tncs.pdf",
              },
              {
                title: "Privacy Policy",
                desc: "How BroFessor collects, protects, and uses your data.",
                file: "/privacy.pdf",
              },
              {
                title: "AI Ethics Policy",
                desc: "How we ensure responsible and transparent AI use.",
                file: "/aipolicy.pdf",
              },
            ].map(({ title, desc, file }, i) => (
              <AccordionItem key={i} value={title}>
                <button
                  onClick={() => toggleAccordion(title)}
                  className="w-full text-left flex justify-between items-center py-4 px-5 bg-orange-100 rounded-lg shadow"
                >
                  <span className="font-semibold text-orange-800">{title}</span>
                  <ChevronDown
                    className={`transition-transform ${
                      openItem === title ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openItem === title && (
                  <div className="bg-white px-5 py-4 border border-orange-200 rounded-b-xl shadow-sm">
                    <p className="text-sm text-gray-700 mb-2">{desc}</p>
                    <a
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 underline text-sm font-medium"
                    >
                      Download PDF
                    </a>
                  </div>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>
    </main>
  );
};

export default AboutPage;
