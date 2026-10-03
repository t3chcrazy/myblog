// Routes abhishekprashant.dev/blog* to the Vercel deployment of this blog.
// Every other path never reaches this Worker and is served by the portfolio.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = new URL(env.ORIGIN);

    const target = new URL(url.pathname + url.search, origin);
    const proxied = new Request(target, request);
    proxied.headers.set("x-forwarded-host", url.host);

    // Manual so redirects reach the browser instead of being followed here.
    const response = await fetch(proxied, { redirect: "manual" });

    const location = response.headers.get("location");
    if (!location) return response;

    // Point redirects back at the public domain, not the vercel.app origin.
    const rewritten = new Response(response.body, response);
    rewritten.headers.set(
      "location",
      location.startsWith(origin.origin)
        ? url.origin + location.slice(origin.origin.length)
        : location
    );
    return rewritten;
  },
};
