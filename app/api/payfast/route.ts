import { NextRequest, NextResponse } from "next/server";

function generateSignature(data: Record<string, string>, passPhrase?: string) {
  let pfOutput = "";
  for (const key in data) {
    if (data[key] !== "") {
      pfOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, "+")}&`;
    }
  }
  let getString = pfOutput.slice(0, -1);
  if (passPhrase) {
    getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, "+")}`;
  }
  return require("crypto").createHash("md5").update(getString).digest("hex");
}

export async function POST(req: NextRequest) {
  const passphrase = "jt7NOE43FZPn";

  const data: Record<string, string> = {
    merchant_id: "10000100",
    merchant_key: "46f0cd694581a",
    return_url: "https://yourdomain.com/checkout/success",
    cancel_url: "https://yourdomain.com/checkout/cancel",
    notify_url: "https://yourdomain.com/api/payfast/notify",
    name_first: "Nilton",
    name_last: "Novele",
    email_address: "nilton@example.com",
    m_payment_id: "core-1234", // unique ID
    amount: "90.00", // must be in ZAR
    item_name: "Core Plan Subscription",
    item_description: "Monthly subscription for Core Plan",
    email_confirmation: "1",
    confirmation_address: "nilton@example.com",
    payment_method: "cc", // or 'cc' if you want only card
  };

  const signature = generateSignature(data, passphrase);
  data["signature"] = signature;

  const host = "sandbox.payfast.co.za"; // change to www.payfast.co.za for live

  let html = `<form action="https://${host}/eng/process" method="post">`;
  for (const name in data) {
    html += `<input type="hidden" name="${name}" value="${data[name]}" />\n`;
  }
  html += `<button type="submit" class="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 mt-4 rounded-md shadow">Pay Now</button></form>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
