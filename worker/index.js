export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/inquiry" && request.method === "POST") {
      return handleInquiry(request, env);
    }

    const response = await env.ASSETS.fetch(request);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");

    if (response.status !== 404 || !acceptsHtml || !["GET", "HEAD"].includes(request.method)) {
      return response;
    }

    const indexUrl = new URL(request.url);
    indexUrl.pathname = "/index.html";
    indexUrl.search = "";
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s().-]{7,20}$/;

async function handleInquiry(request, env) {
  let data;
  try { data = await request.json(); } catch { return json({ error: "Invalid request body." }, 400); }
  if (data.website) return json({ ok: true });
  if (!data.name?.trim() || !emailPattern.test(data.email ?? "") || !phonePattern.test(data.phone ?? "")) return json({ error: "Please provide a valid name, email and phone number." }, 422);
  if (!env.RESEND_API_KEY || !env.INQUIRY_FROM_EMAIL) return json({ error: "Enquiry delivery is not configured." }, 503);

  const fields = [["Name", data.name], ["Email", data.email], ["Phone / WhatsApp", data.phone], ["Company", data.company], ["Country / region", data.country], ["Product requirement", data.productNeed], ["Message", data.message]];
  const text = fields.filter(([, value]) => value?.trim()).map(([label, value]) => `${label}: ${value.trim()}`).join("\n");
  const delivery = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({ from: env.INQUIRY_FROM_EMAIL, to: [env.INQUIRY_TO_EMAIL || "li18061128988@gmail.com"], reply_to: data.email, subject: `New website enquiry from ${data.name.trim()}`, text }),
  });
  if (!delivery.ok) return json({ error: "Email delivery failed." }, 502);
  return json({ ok: true });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8" } });
}
