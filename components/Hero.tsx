"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, Rocket } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-orange-900 via-orange-700 to-[#0c1b33] flex items-center py-20 overflow-hidden text-white">
      {/* Background blur elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-orange-800 rounded-full mix-blend-overlay filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-900 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full flex flex-col-reverse md:flex-row items-center justify-between gap-16 px-6 md:px-12">
        {/* Left Text Section */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 bg-orange-600/80 text-sm text-white rounded-full shadow-md animate-bounce">
            <Rocket size={16} className="text-white" />
              <span>New Updates Just Dropped!</span>
          </div>


          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Meet <span className="text-orange-400">BroFessor</span> 🧠 <br className="hidden md:block" />
            Your AI Study Buddy
          </h1>
          <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-xl mx-auto md:mx-0">
            Stuck cramming at 2AM? Need help explaining that one annoying topic?
            BroFessor’s got your back — from high school to uni. Ask anything, study
            anytime, and actually <span className="italic text-orange-200">understand</span> stuff.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              href="https://brofessor.niltonnovele.com/companions/new"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-base font-medium shadow-md transition duration-300"
            >
              <Bot size={20} />
              Try It Now
            </Link>
          </div>
        </motion.div>

        {/* Right Image/Illustration */}
        <motion.div
          className="flex-1 flex justify-center md:justify-end w-full max-w-xl lg:max-w-2xl"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="relative w-full aspect-[3/2] min-h-[220px] md:min-h-0 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <video
              src="/video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
