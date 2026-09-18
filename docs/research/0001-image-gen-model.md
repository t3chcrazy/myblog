# Image-Generation Model/API for the Weekly Blog Pipeline

**Ticket:** `.scratch/wayfinder/tickets/0001-image-gen-model.md`
**Date researched:** 2026-09-18

## Summary / Recommendation

For a headless, ~2-4-images/week automated pipeline that needs both (a) legible technical
diagrams with labels/arrows and (b) general header/illustration art:

**Use the Gemini API's image model family (`gemini-3.1-flash-image`, aka "Nano Banana 2"),
called with a plain API key.** It is the only candidate whose own product docs claim
strong, legible in-image text rendering — a documented requirement for labeled diagrams —
and its cost at this volume is negligible (well under $1/month). It has no free tier, but
neither does any other frontier-quality model; the paid cost floor is so low it doesn't
matter. Keep **Black Forest Labs' FLUX.2 [klein]** (~$0.014-0.015/image) as a cheaper
fallback/secondary option for general illustration art where text-in-image isn't required,
since it undercuts Gemini on flat per-image cost and is a plain API-key REST service.
Avoid OpenAI's `gpt-image-1` family for this use case unless diagram quality with Gemini
proves insufficient — it is more expensive per image and has a documented history of
text-rendering inconsistency between its ChatGPT UI and API paths. Stability AI is viable
but its per-image cost is higher than Flux for comparable quality and its docs did not
specifically claim strong text/label rendering.

All candidates below are plain REST/HTTP APIs authenticated with a static API key — none
requires a desktop app or interactive OAuth consent flow, so all are compatible with a
headless/cloud automation session.

---

## Candidate 1: Gemini API image models (Gemini 3.1 Flash Image / "Nano Banana 2" family)

**Models:** `gemini-3.1-flash-image`, `gemini-3.1-flash-lite-image`, `gemini-3-pro-image`
(current, as of 2026-09-18); `gemini-2.5-flash-image` (legacy, deprecated/shutting down
Oct 2, 2026).

### 1. Cost at ~8-16 images/month
No free tier for image generation on any current model
([ai.google.dev/gemini-api/docs/pricing](https://ai.google.dev/gemini-api/docs/pricing)).
Paid pricing is token-based output pricing that resolves to a per-image cost:
- `gemini-3.1-flash-image`: ~$0.067 per 1K-resolution image (output $60/1M tokens)
- `gemini-3.1-flash-lite-image`: ~$0.0336 per 1K-resolution image (output $30/1M tokens)
- `gemini-2.5-flash-image` (legacy, being retired): $0.039/image

At 8-16 images/month with `gemini-3.1-flash-image`: **~$0.54-$1.07/month**. With the Lite
variant: **~$0.27-$0.54/month**. Batch API gives a further 50% discount if the pipeline can
tolerate async batch submission. Free-tier request quotas exist for the *API generally*
(e.g. RPD limits), but Google's own docs list "Free Tier: Not available" specifically for
the image-output pricing tier of the 3.1 model family
([ai.google.dev/gemini-api/docs/pricing](https://ai.google.dev/gemini-api/docs/pricing));
exact free RPD/IPM quotas for image models should be re-verified at
[ai.google.dev/gemini-api/docs/rate-limits](https://ai.google.dev/gemini-api/docs/rate-limits)
since Google reduced free-tier quotas in December 2025 and quotas are cited as changing
often (secondary evidence, not in the official rate-limits page's static text).

### 2. Headless HTTP API accessibility
Plain REST API, called with an API key in the `x-goog-api-key` header against the
`/v1beta` (interactions/generateContent) endpoint. No desktop app or OAuth consent screen
is required for this API-key auth path — fully scriptable from a headless/cloud session
([ai.google.dev/gemini-api/docs/image-generation](https://ai.google.dev/gemini-api/docs/image-generation)).
(OAuth is mentioned only as an alternative for GCP/Vertex AI-style enterprise auth, not a
requirement.)

### 3. Output quality for diagrams vs illustration
Google's own docs explicitly claim strength here: the models are described as "Capable of
generating legible, stylized text for infographics, menus, diagrams, and marketing assets,"
with worked examples including scientific infographics, weather charts, and annotated
anatomical sketches
([ai.google.dev/gemini-api/docs/image-generation](https://ai.google.dev/gemini-api/docs/image-generation)).
This is a first-party (primary-source) claim, not secondary evidence, and is the strongest
official text-in-diagram claim found among the candidates researched. Real-world
architecture-diagram precision (exact box/arrow topology matching a spec) is not
separately benchmarked in the docs and should be spot-checked before committing.

### 4. Licensing for public blog use
Google does not claim ownership of generated output: "Google won't claim ownership over
that content... Google may generate the same or similar content for others."  Users must
comply with law regarding attribution "when required by law," implying no blanket
attribution requirement for typical blog use. Paid-tier usage is not used to train Google's
models and has stricter data retention than the free/unpaid tier, which is used for product
improvement and human review — a reason to run this on the *paid* tier rather than free,
independent of quota
([Gemini API Additional Terms of Service](https://ai.google.dev/gemini-api/terms)).

---

## Candidate 2: Stability AI Platform API (Stable Image Ultra / Core / SD3.5)

**Note on sourcing:** `platform.stability.ai/pricing` is a JavaScript-rendered SPA that
could not be fetched as static text by the research tooling used here; the figures below
come from Stability's own **API price-update announcement page**
([stability.ai/api-pricing-update-25](https://stability.ai/api-pricing-update-25)), which
links to the pricing page as the source of truth, cross-checked against multiple
independent secondary sources reporting the same numbers. Treat the exact current
per-credit costs as needing a manual re-check against the live pricing page before
committing, since Stability is reported (secondary evidence) to have changed per-image
credit costs at least once in 2026.

### 1. Cost at ~8-16 images/month
Credit system: 1 credit = $0.01. New accounts reportedly get 25 free credits (one-time,
not recurring — this covers roughly one month at low volume and then runs out; treat as
secondary evidence pending direct confirmation on the live pricing page). Reported
per-image costs: Stable Image Ultra ~8 credits ($0.08/image), Stable Image Core ~3 credits
($0.03/image), SD 3.5 Large ~6.5 credits/image. At 8-16 images/month using Core: **~$0.24-
$0.48/month**; using Ultra: **~$0.64-$1.28/month**. No paid subscription is required at
this volume — pay-as-you-go credits work, but there is no indefinite free tier once the
one-time signup credits are exhausted.
([stability.ai/api-pricing-update-25](https://stability.ai/api-pricing-update-25), [platform.stability.ai/pricing](https://platform.stability.ai/pricing))

### 2. Headless HTTP API accessibility
Plain REST API, authenticated via a static API key (Bearer token) — no desktop app or
OAuth consent flow required. Confirmed via Stability's own developer platform structure
(API key generation in account dashboard); fully usable from a headless/cloud session.

### 3. Output quality for diagrams vs illustration
Stability's docs (as surfaced) emphasize general image quality/photorealism and style
control for Ultra/Core/SD3.5, but no official claim of strong in-image text/label
rendering was found in the material retrieved. Stable Diffusion-family models are widely
known (secondary evidence — community/firsthand reports, not Stability's own docs) to
struggle with rendering precise, legible text compared to Gemini's or GPT-Image's newer
generations. This makes Stability a weaker default for labeled technical diagrams and a
reasonable option for general header art.

### 4. Licensing for public blog use
Stability's platform pricing/announcement pages did not surface explicit output-ownership
language in this research pass; Stability's general Terms of Service and Acceptable Use
Policy (linked from platform.stability.ai) should be checked directly before production
use — this axis could not be fully verified from a primary source in this pass and should
be treated as **open/unverified**.

---

## Candidate 3: OpenAI `gpt-image-1` family (via OpenAI API)

**Models seen in current pricing:** `gpt-image-1`, `gpt-image-1-mini`, `gpt-image-1.5`,
`gpt-image-2`, plus newer `gpt-image-2.5-*` variants.

### 1. Cost at ~8-16 images/month
Token-based pricing (per 1M tokens): `gpt-image-1` — text input $5, image input $10,
output $40; `gpt-image-1-mini` — text input $2, image input $2.50, output $8; `gpt-image-2`
— text input $5, image input $8, output $30
([developers.openai.com/api/docs/pricing](https://developers.openai.com/api/docs/pricing),
redirected from `platform.openai.com/docs/pricing`). OpenAI's docs note per-image cost
depends on resolution/quality and point to a calculator in the image-generation guide
rather than a flat per-image number; a single 1024x1024 "medium quality" `gpt-image-1`
image is commonly cited at roughly $0.04-$0.07 (this specific figure is secondary —
derived/estimated, not quoted verbatim on the fetched pricing page). At 8-16 images/month
this is roughly **$0.30-$1.10/month** for `gpt-image-1`, cheaper with `gpt-image-1-mini`.
**No free tier or trial credits** are listed on the current pricing page.

### 2. Headless HTTP API accessibility
Plain REST API (`/v1/images/generations`), authenticated with a static API key in the
`Authorization: Bearer` header. No desktop app or OAuth consent flow required — fully
usable from a headless/cloud session.

### 3. Output quality for diagrams vs illustration
OpenAI's own release notes for `gpt-image-1.5` (secondary/reported, not directly quoted
from an official model card in this pass) describe materially improved text rendering
("denser, smaller, more accurate characters") relative to `gpt-image-1`, implying the
original `gpt-image-1` had known weaknesses here. OpenAI's developer community has
extensive, repeated firsthand reports of spelling errors and inconsistent text rendering
in `gpt-image-1` output, and of quality/text differences between the ChatGPT UI image
generator and the API model of the same name (secondary evidence — community forum
reports, not primary docs, since no official "known limitations" section covering text
rendering was found for these models). Net: better than classic Stable Diffusion, likely
comparable to or slightly behind Gemini's explicit diagram/infographic claim, with real
variance reported release-to-release.

### 4. Licensing for public blog use
Per OpenAI's Terms of Use (surfaced via search snippet, direct fetch blocked by a 403 on
`openai.com/policies/row-terms-of-use/` and `service-terms/` in this research pass —
**should be re-verified directly**): "As between you and OpenAI, you own the Output, and
OpenAI assigns to you all its right, title, and interest in and to Output," supporting
commercial blog use including future ad-supported use. Usage policies restrict using image
capabilities to reproduce a real person's likeness without consent, which is relevant if
illustrations ever depict real people. Because direct fetch of the terms pages failed
(403), this axis is based on a search-engine snippet of the official page rather than a
directly retrieved primary document — flagged as **needs direct re-verification** at
[openai.com/policies/row-terms-of-use](https://openai.com/policies/row-terms-of-use/) and
[openai.com/policies/usage-policies](https://openai.com/policies/usage-policies/).

---

## Candidate 4: Black Forest Labs FLUX API (bfl.ai)

**Models:** FLUX.2 [klein] 4B/9B, FLUX.2 [pro], FLUX.2 [max], FLUX.2 [flex], FLUX1.1 [pro],
FLUX1.1 [pro] Ultra, FLUX.1 Kontext [pro]/[max]. FLUX.2 [dev] is local-weights only (no
hosted API).

### 1. Cost at ~8-16 images/month
Per-image, pay-as-you-go, no subscription required:
FLUX.2 [klein] 4B from $0.014/image, [klein] 9B from $0.015/image, [pro] from $0.03/image,
[max] from $0.07/image
([docs.bfl.ml/quick_start/pricing](https://docs.bfl.ml/quick_start/pricing), also mirrored
at [bfl.ai/pricing](https://bfl.ai/pricing)). At 8-16 images/month with FLUX.2 [klein]:
**~$0.11-$0.24/month** — the cheapest of all candidates researched. No free tier was found
in the official pricing docs.

### 2. Headless HTTP API accessibility
Plain REST API, authenticated with a static API key — no desktop app or OAuth flow
required. Fully usable from a headless/cloud session.

### 3. Output quality for diagrams vs illustration
No official BFL documentation surfaced in this research pass specifically addressing
text/label rendering quality or limitations (this axis is **unverified from primary
sources** for FLUX — official model cards should be checked directly at
[bfl.ai](https://bfl.ai) before relying on FLUX for label-heavy diagrams). Flux models are
generally reported (secondary evidence) as strong for photorealistic and stylistic
illustration but, like most diffusion-based (non-autoregressive-text) image models,
historically weaker than Gemini's newer multimodal-generation approach at precise
in-image text. Best treated as a general-illustration/header-art option pending
verification for diagrams.

### 4. Licensing for public blog use
Not verified in this pass — BFL's terms of service/licensing page was not directly
retrieved. Should be checked at BFL's official docs/ToS before production commercial use.
**Open/unverified.**

---

## Comparison Table

| Candidate | Free tier @ 8-16 img/mo | Est. cost/mo (paid) | Auth model | Headless-compatible | Official text/label claim | Commercial use / licensing |
|---|---|---|---|---|---|---|
| Gemini 3.1 Flash Image ("Nano Banana 2") | None | ~$0.27-$1.07 | API key (`x-goog-api-key`) | Yes | Yes — docs explicitly claim legible text for "infographics, menus, diagrams" | Output not claimed by Google; attribution only "when required by law"; paid tier not used for training |
| Stability AI (Stable Image Core/Ultra) | 25 one-time signup credits, then none | ~$0.24-$1.28 | API key (Bearer) | Yes | Not found in official docs; SD-family generally weaker at text (secondary evidence) | Unverified — check ToS directly |
| OpenAI gpt-image-1 / -1.5 / -2 | None | ~$0.30-$1.10 (gpt-image-1); less for mini | API key (Bearer) | Yes | No official "known limitations" doc found; extensive community reports of text-rendering inconsistency (secondary) | User owns Output per ToS (search snippet; re-verify directly); likeness restrictions apply |
| FLUX.2 [klein] (Black Forest Labs) | None | ~$0.11-$0.24 (cheapest) | API key | Yes | Unverified — no official statement found | Unverified — check ToS directly |

---

## Recommendation

Use **Gemini 3.1 Flash Image via the Gemini API** as the primary model for both diagram
and header-image generation: it is the only candidate with an explicit, primary-source
claim of strong legible text rendering for diagrams/infographics, it's a plain API-key
REST call suitable for a fully headless automation pipeline, its cost at 2-4 images/week is
under $1.10/month even without a free tier, and Google's paid-tier terms avoid training on
your prompts/outputs. If cost needs to go lower or Gemini's diagram fidelity disappoints in
practice, fall back to **FLUX.2 [klein]** for general illustration/header art (cheapest
per-image option, also a plain API-key REST service) — but verify its text-rendering
capability and ToS/licensing directly before relying on it for labeled diagrams, since
those two axes were not confirmed from BFL's official documentation in this research pass.
Before going to production, two things flagged above as unverified should be directly
re-checked: (1) OpenAI's and BFL's terms-of-service pages (both returned HTTP errors during
this research and were sourced from search snippets instead of direct fetches), and (2)
Stability AI's live `platform.stability.ai/pricing` page (JS-rendered SPA that couldn't be
fetched as static content — figures here came from Stability's own price-update
announcement page and cross-checked secondary sources).
