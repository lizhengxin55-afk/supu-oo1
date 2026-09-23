const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s().-]{7,20}$/;
const formSubmitEndpoint = "https://formsubmit.co/ajax/aad4c1360e31ef5c56175c3b588100a0";

export async function POST(request) {
  let data;
  try { data = await request.json(); } catch { return Response.json({ error: "Invalid request body." }, { status: 400 }); }
  if (data.website) return Response.json({ ok: true });
  if (!data.name?.trim() || !emailPattern.test(data.email ?? "") || !phonePattern.test(data.phone ?? "")) {
    return Response.json({ error: "Please provide a valid name, email and phone number." }, { status: 422 });
  }

  const delivery = await fetch(formSubmitEndpoint, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      company: data.company?.trim() || "",
      country: data.country?.trim() || "",
      product_need: data.productNeed?.trim() || "",
      message: data.message?.trim() || "",
      _subject: `New Supfield website enquiry from ${data.name.trim()}`,
      _template: "table",
      _replyto: data.email.trim(),
      _honey: "",
    }),
  });
  const result = await delivery.json().catch(() => null);
  if (!delivery.ok || (result?.success !== "true" && result?.success !== true)) return Response.json({ error: "Email delivery failed." }, { status: 502 });
  return Response.json({ ok: true });
}
