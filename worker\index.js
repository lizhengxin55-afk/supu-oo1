export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/inquiries" && request.method === "POST") {
      let inquiry;
      try { inquiry = await request.json(); } catch { return Response.json({ error: "invalid_payload" }, { status: 400 }); }
      const email = String(inquiry.email || "").trim();
      const phone = String(inquiry.phone || "").trim();
      const name = String(inquiry.name || "").trim();
      const isSpam = String(inquiry.website || "").trim().length > 0;
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const validPhone = /^\+?[0-9][0-9\s().-]{5,24}$/.test(phone);
      if (isSpam) return Response.json({ ok: true }, { status: 201 });
      if (!name || !validEmail || !validPhone) return Response.json({ error: "validation_failed" }, { status: 400 });
      if (!env.INQUIRY_WEBHOOK_URL) return Response.json({ error: "delivery_not_configured" }, { status: 503 });
      const upstream = await fetch(env.INQUIRY_WEBHOOK_URL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...inquiry, receivedAt: new Date().toISOString(), source: "JILONG TECHNOLOGY website" }) });
      if (!upstream.ok) return Response.json({ error: "delivery_failed" }, { status: 502 });
      return Response.json({ ok: true }, { status: 201 });
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
