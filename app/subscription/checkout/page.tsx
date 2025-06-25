"use client";

import { useEffect, useState } from "react";

export default function Checkout() {
  const [htmlForm, setHtmlForm] = useState("");

  useEffect(() => {
    const fetchForm = async () => {
      const res = await fetch("/api/payfast", { method: "POST" });
      const html = await res.text();
      setHtmlForm(html);
    };
    fetchForm();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-orange-600">Payfast Checkout</h1>
      <p className="mb-4 text-center max-w-md text-gray-600">
        You're subscribing to the <strong>Core Plan</strong> for <strong>R90.00</strong>. Please proceed to payment.
      </p>

      {/* Render the raw Payfast HTML form */}
      <div dangerouslySetInnerHTML={{ __html: htmlForm }} />
    </main>
  );
}
