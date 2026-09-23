const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s().-]{7,20}$/;

export async function POST(request) {
  let data;
  try { data = await request.json(); } catch { return Response.json({ error: "Invalid request body." }, { status: 400 }); }
  if (data.website) return Response.json({ ok: true });
  if (!data.name?.trim() || !emailPattern.test(data.email ?? "") || !phonePattern.test(data.phone ?? "")) {
    return Response.json({ error: "Please provide a valid name, email and phone number." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const to = process.env.INQUIRY_TO_EMAIL || "li18061128988@gmail.com";
  if (!apiKey || !from) return Response.json({ error: "Enquiry delivery is not configured." }, { status: 503 });

  const fields = [["Name", data.name], ["Email", data.email], ["Phone / WhatsApp", data.phone], ["Company", data.company], ["Country / region", data.country], ["Product requirement", data.productNeed], ["Message", data.message]];
  const text = fields.filter(([, value]) => value?.trim()).map(([label, value]) => `${label}: ${value.trim()}`).join("\n");
  const delivery = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: data.email, subject: `New website enquiry from ${data.name.trim()}`, text }),
  });
  if (!delivery.ok) return Response.json({ error: "Email delivery failed." }, { status: 502 });
  return Response.json({ ok: true });
}
