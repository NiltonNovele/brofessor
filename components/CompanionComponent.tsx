"use client";

import { useEffect, useRef, useState } from "react";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import { addToSessionHistory } from "@/lib/actions/companion.actions";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Document, Packer, Paragraph, TextRun } from "docx";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice }: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<{ question: string, answer: string }[]>([]);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current) {
      isSpeaking ? lottieRef.current.play() : lottieRef.current.stop();
    }
  }, [isSpeaking]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setMessages((prev) => [{ role: message.role, content: message.transcript }, ...prev]);
      }
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", (e) => console.error("Error:", e));
    vapi.on("speech-start", () => setIsSpeaking(true));
    vapi.on("speech-end", () => setIsSpeaking(false));

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", () => setIsSpeaking(false));
      vapi.off("speech-end", () => setIsSpeaking(true));
    };
  }, []);

  const toggleMicrophone = () => {
    const muted = vapi.isMuted();
    vapi.setMuted(!muted);
    setIsMuted(!muted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ["transcript"],
      serverMessages: [],
    };
    // @ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const exportNotes = async () => {
    const doc = new Document({
      creator: "Your App",
      title: `${subject} - ${topic} Session Notes`,
      description: "Session export",
      sections: [
        {
          children: messages
            .slice()
            .reverse()
            .map((m) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${m.role === "assistant" ? name : userName}: `,
                    bold: true,
                  }),
                  new TextRun(m.content),
                ],
              })
            ),
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${subject}-${topic}-session.docx`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const generateSummary = async () => {
  const content = messages
    .slice()
    .reverse()
    .map(m => `${m.role === 'assistant' ? name : userName}: ${m.content}`)
    .join('\n');

  try {
    const response = await fetch("https://api.apyhub.com/ai/summarize-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apy-token": process.env.NEXT_PUBLIC_APYHUB_API_KEY!, // store this safely
      },
      body: JSON.stringify({
        text: content,
        summary_length: "medium", // "short", "medium", or "long"
        output_language: "en"
      })
    });
    const data = await response.json();

    if (data?.data?.summary) {
      setSummary(data.data.summary);
    } else {
      console.error("Invalid summary response", data);
      setSummary("Could not generate summary.");
    }
  } catch (error) {
    console.error("Summary generation failed", error);
    setSummary("An error occurred while generating the summary.");
  }
};

const exportSummary = async () => {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Session Summary",
                bold: true,
                size: 28,
              }),
            ],
            spacing: { after: 300 },
          }),
          ...(summary ?? "").split("\n").map((line) =>
            new Paragraph({
              children: [new TextRun(line)],
              })
            ),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${subject}-${topic}-summary.docx`;
  link.click();

  URL.revokeObjectURL(url);
};


  const handlePractice = () => {
    console.log("Redirect to Practice Page or open modal");
  };

  return (
  <section className="flex flex-col h-[80vh] bg-white rounded-2xl shadow-xl p-6 space-y-6 overflow-hidden">
    {/* Header with Avatars */}
    <div className="flex flex-col sm:flex-row sm:justify-between gap-6 sm:gap-10">
      <div className="flex items-center gap-4 sm:gap-6">
        <div
          className="relative w-24 h-24 sm:w-36 sm:h-36 rounded-full flex items-center justify-center shadow-inner"
          style={{ backgroundColor: getSubjectColor(subject) }}
        >
          {callStatus === CallStatus.ACTIVE ? (
            <Lottie lottieRef={lottieRef} animationData={soundwaves} autoplay={false} className="w-full h-full" />
          ) : (
            <Image src={`/icons/${subject}.svg`} alt={subject} width={80} height={80} />
          )}
        </div>
        <p className="font-bold text-lg sm:text-xl">{name}</p>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <Image src={userImage} alt={userName} width={100} height={100} className="rounded-xl shadow-md" />
        <div className="flex flex-col items-start gap-2">
          <p className="font-bold text-lg">{userName}</p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={toggleMicrophone}
              disabled={callStatus !== CallStatus.ACTIVE}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg border text-sm"
            >
              <Image src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"} alt="mic" width={20} height={20} />
              {isMuted ? "Unmute" : "Mute"}
            </button>
            <button
              onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
              className={cn(
                "px-4 py-2 rounded-lg font-semibold text-white shadow text-sm",
                callStatus === CallStatus.ACTIVE ? "bg-red-600 hover:bg-red-700" : "bg-orange-600 hover:bg-orange-700",
                callStatus === CallStatus.CONNECTING && "animate-pulse"
              )}
            >
              {callStatus === CallStatus.ACTIVE
                ? "End Session"
                : callStatus === CallStatus.CONNECTING
                ? "Connecting..."
                : "Start Session"}
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Chat Message Box */}
    <section className="flex-1 bg-gray-50 border rounded-md p-4 overflow-y-auto max-h-[45vh] min-h-[200px]">
      <div className="flex flex-col gap-3 text-sm">
        {messages.slice().reverse().map((m, i) => (
          <p key={i} className={cn(m.role === "assistant" ? "text-gray-800" : "text-orange-700 font-semibold")}>
            <strong>{m.role === "assistant" ? name : userName}:</strong> {m.content}
          </p>
        ))}
      </div>
    </section>

    {/* Action Buttons */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <button
        onClick={exportNotes}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 shadow transition active:scale-95"
      >
        <Image src="/icons/file-export.svg" alt="Export" width={20} height={20} />
        Export Notes
      </button>

      <button
        onClick={generateSummary}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 shadow transition active:scale-95"
      >
        <Image src="/icons/summary.svg" alt="Summary" width={20} height={20} />
        Generate Summary
      </button>

      <Link href="/practice" passHref>
        <button
          onClick={handlePractice}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-95 font-semibold"
        >
          <Image src="/icons/practice.svg" alt="Practice" width={20} height={20} />
          <span>Practice</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </Link>
    </div>

    {/* Summary Output */}
    {summary && (
  <div className="p-6 border rounded-md bg-white shadow space-y-4 max-h-[80vh] overflow-auto">
  <div>
    <h3 className="font-bold mb-3 text-lg text-gray-700">Summary:</h3>
    <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">{summary}</p>
  </div>

    <button
      onClick={exportSummary}
      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow inline-flex items-center gap-2"
    >
      <Image src="/icons/file-export.svg" alt="Export" width={18} height={18} />
      Export Summary
    </button>
  </div>
)}


  </section>
);
};

export default CompanionComponent;
