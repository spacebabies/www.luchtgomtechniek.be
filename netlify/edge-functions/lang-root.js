function parsePreferredLanguage(header) {
  if (!header) return "nl";

  const supported = new Set(["nl", "fr"]);

  const preferences = header
    .split(",")
    .map((part) => {
      const [rawTag, ...params] = part.trim().split(";");
      const tag = rawTag.toLowerCase();
      const qParam = params.find((p) => p.trim().startsWith("q="));
      const q = qParam ? Number(qParam.trim().slice(2)) : 1;
      return { tag, q: Number.isFinite(q) ? q : 0 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferences) {
    const base = tag.split("-")[0];

    if (supported.has(tag)) return tag;
    if (supported.has(base)) return base;
  }

  return "nl";
}

export default async function handler(request, context) {
  const url = new URL(request.url);

  // Safety: this function is intended only for the homepage.
  if (url.pathname !== "/") {
    return;
  }

  // Important gotcha:
  // Let your old-domain redirects keep doing their job.
  // If this runs on alias domains first, it could redirect to /nl/ or /fr/
  // before your canonical-domain redirect fires.
  const host = (request.headers.get("host") || "").toLowerCase();
  const allowedHosts = new Set([
    "luchtgomtechniek.be",
    "www.luchtgomtechniek.be",
    "localhost:8888",
    "localhost"
  ]);

  if (!allowedHosts.has(host)) {
    return;
  }

  // 1. Explicit user choice wins.
  const cookieLang = context.cookies.get("nf_lang");
  if (cookieLang === "nl" || cookieLang === "fr") {
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/${cookieLang}/`,
        "Cache-Control": "no-store"
      }
    });
  }

  // 2. Otherwise parse Accept-Language properly, including q-values.
  const detectedLang = parsePreferredLanguage(
    request.headers.get("accept-language")
  );

  return new Response(null, {
    status: 302,
    headers: {
      Location: `/${detectedLang}/`,
      "Cache-Control": "no-store"
    }
  });
}
