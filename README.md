# Malpi International College — Website

A static, multi-page website for **Malpi International College (MIC)**, Basundhara, Kathmandu.
Built as a design and content reference to be **rebuilt in Elementor on WordPress**.

Content was extracted from the live site at <https://mic.edu.np/> and from the client content
document `MIC WEBSITE CONTENT.docx` (found in the parent folder).

---

## 1. Getting started

No build step. Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8123
```

Then visit <http://localhost:8123>.

---

## 2. File structure

```
Website/
├── index.html              Home
├── about.html              About MIC — summary, key facts, vision, mission, values, affiliation, partners
├── programs.html           Programme hub with a side-by-side comparison table
├── bba.html                BBA — full curriculum, concentrations, careers, FAQ
├── bba-finance.html        BBA (Finance)
├── bcsit.html              BCSIT
├── mba.html                MBA
├── admissions.html         Requirements, 6-step process, documents, scholarships, enquiry form
├── faculty.html            Our Team: Chairman's and Principal's messages, board, management
├── professional-contributors.html  19 industry contributors with photos
├── synergy-council.html    The four Malpi Synergy Councils and their members
├── partnership.html        Corporate partners grouped by sector
├── research.html           Research Management Cell and research in each programme
├── malpi-advantage.html    The six Malpi Advantage pillars, 8 Centres, scholarships
├── student-life.html       Life at Malpi — highlights, student videos, 20-image gallery
├── contact.html            Contact details, form, Google Map embed
├── privacy.html            Privacy Policy + Terms of Use (DRAFT, see §9)
├── 404.html                Not-found page (noindex, excluded from the sitemap)
├── robots.txt              Crawl rules, incl. explicit AI crawler permissions
├── sitemap.xml             All 17 indexable pages with lastmod and priority
├── llms.txt                Plain-text site summary for AI answer engines
│
├── css/style.css           Single stylesheet, sectioned and commented
├── js/main.js              Vanilla JS — nav, validation, video facades
│
└── assets/img/
    ├── brand/              logo.png, logo-white.png, mark.png, logo.svg, favicons
    ├── programs/           4 programme card images
    ├── hero/               home page hero photo, plus 4 alternates at full resolution
    ├── team/               9 board + management portraits
    ├── contributors/       19 professional contributor portraits
    ├── centres/            8 official Centre of Excellence logos (from 2x2 center.pdf)
    ├── partners/           28 corporate partner logos (PNG, transparent)
    ├── feature/            12 named section images
    ├── gallery/            41 college photographs
    └── video/              2 YouTube poster frames (served locally)
```

---

## 3. Brand colours

Taken directly from the official logo artwork (`MIC Logo.svg`), not invented.

| Token | Hex | Use |
|---|---|---|
| `--mic-green` | `#01663E` | Primary brand green — links, green buttons, eyebrows |
| `--mic-green-dark` | `#013D26` | Hero, page banners, table headers, headings |
| `--mic-green-darker` | `#012418` | Footer, utility bar, stat strip |
| `--mic-green-light` | `#E6F0EB` | Pale wash for alternating sections and pills |
| `--mic-gold` | `#FCB615` | Accent — CTA buttons, stat numbers, rules, accordion icons |
| `--mic-gold-dark` | `#E0A00C` | Gold hover |
| `--mic-gold-soft` | `#FFF6E0` | Callout panels |
| `--ink` | `#1A1A1A` | Body text |
| `--ink-soft` | `#4A4A4A` | Secondary text |
| `--ink-muted` | `#6B6B6B` | Hints and captions |

**Gold always carries dark text, never white.** White on `#FCB615` fails contrast; `#1A1A1A` on gold
scores 9.81:1.

Every colour pair used in the design was checked against WCAG: **all 22 combinations pass AA at the
stricter 4.5:1 body-text threshold.**

---

## 4. Typography

| Role | Font | Why |
|---|---|---|
| Headings, buttons, nav, numbers | **Jost** (400/500/600/700) | Jost is a Futura revival, and the MIC logo wordmark is set in Futura BT. Headings therefore share the logo's geometry, so the header lockup reads as one designed system rather than a logo dropped onto an unrelated typeface. It carries authority at large sizes without feeling stuffy. |
| Body copy, forms, tables | **Inter** (400/500/600/700) | Purpose-built for screens: tall x-height, open apertures and unambiguous figures, so 14–16px paragraphs and dense curriculum tables stay legible. Pairs with Jost by contrast of purpose — geometric display against neutral text. |

Loaded from Google Fonts in one request with `display=swap`, preceded by `preconnect` to
`fonts.googleapis.com` and `fonts.gstatic.com`. Both have full fallback stacks.

Base body size is **16px** and never smaller; headings use `clamp()` to scale fluidly.

---

## 5. Built for Elementor

**No CSS Grid anywhere.** Layout is flexbox only, so every section maps onto an Elementor Flex
Container.

| This code | Elementor equivalent |
|---|---|
| `.row` / `.col-half`, `.col-third`, `.col-two-thirds`, `.col-quarter` | Flex Container with sized child containers |
| `.icon-box` | Icon Box widget |
| `.card` / `.program-card` | Image Box widget, or a container with Image + Heading + Text + Button |
| `.accordion` (native `<details>`) | Accordion / Toggle widget |
| `.accordion--courses` | Toggle widget — matches the course-structure toggles on the live site |
| `.council`, `.partner-cat` | Flex container + Heading + Icon + Table/Gallery |
| `.callout` | Flex container with a green background, gold left border, Heading + Text |
| `.centre-logo` | Image widget inside a white, rounded container |
| `.social-links` / `--on-dark` | Social Icons widget (light and dark grounds) |
| `.callout--fill` | Container set to stretch (equal-height callouts) |
| `.callout--center` | Adds vertical centring, for a callout beside a tall image |
| `.promo-card` | Icon Box, or Icon + Heading + Text in a linked container |
| `.carousel` | Loop Carousel widget, with Infinite Loop enabled |
| `.media-frame--wide` | Image widget with a 4:3 crop and object-fit cover |
| Even card heights | Container "Equal Height" setting (drop the JS equaliser) |
| `.stat-strip` | Flex container of Counter widgets |
| `.partner-grid`, `.gallery` | Image Gallery / Basic Gallery widget |
| `.video-card` | Video widget with **Lazy Load** enabled |
| `.table-wrap > .table` | HTML widget, or a table plugin |
| `.btn`, `.btn--primary`, `.btn--green`, `.btn--outline` | Button widget with matching Global styles |
| Header / footer blocks | Header and Footer template parts |

Columns subtract from a `--row-gap` variable, so changing a row's gap never breaks its widths.

**Recommended Elementor setup**

1. Put the colour table in §3 into **Site Settings → Global Colors**.
2. Put Jost and Inter into **Site Settings → Global Fonts**.
3. Set container width `1200px` and default gap `32px`.
4. Build Header and Footer as template parts first — they are identical on all 13 pages.
5. Rebuild the four programme pages from one template; they share an identical structure.

---

## 6. House style

Four conventions apply across every page:

- **No em dashes.** All 126 em dashes in the original draft were rewritten by hand into colons,
  commas, parentheses or full stops, in body copy, headings, eyebrow labels, table captions, alt
  text, meta descriptions and HTML comments alike. En dashes are kept only in numeric ranges
  (`50%–100%`, `6–8 weeks`), which are not em dashes.
- **Callouts are green, not gold.** The `.callout` panel is a deep-green aside with a gold left rule
  and a gold heading, deliberately inverted from the page around it so it reads as the college
  speaking directly. Buttons inside a callout are forced gold, since a green button on green would
  disappear. All six colour pairs in the callout pass WCAG AA (lowest is 6.98:1).
- **The CTA band is gold, not green.** Every other full-width band on the site is green, so a green
  call to action sank into the page. The `.cta-band` is now a gold field with a 6px deep-green top
  rule, a deep-green heading, a solid deep-green primary button and an ink outline secondary. All
  five colour pairs pass AA (lowest 6.65:1).
- **No salary figures.** Career-outcome tables show job role and sector only, matching what
  mic.edu.np actually publishes. See §9.

- **No dash before eyebrow labels.** Section eyebrows ("WHO WE ARE", "SCHOLARSHIPS") are plain
  uppercase text. The gold rule that used to precede them has been removed.
- **Even card heights.** Cards in a row are levelled to the tallest, at every screen width.

The eight **Centre of Excellence logos** are the college's official marks, extracted from
`NEW DESIGN/Center Print/2x2 center.pdf` and cropped to the mark only (the wordmark is dropped,
because the centre name is already the card heading). They are transparent PNGs presented on a white
rounded tile so the full-colour marks stay legible on both light and dark sections.

---

### Home page hero

The hero is a **full-bleed college photograph under a two-stop green wash**, with the four headline
statistics sitting on the image rather than in a separate strip below it.

The wash is deliberately uneven: heavy on the left (95% down to 88%) so the headline always clears
contrast, lighter on the right (62%) so the photograph still reads, plus a bottom-up gradient so the
statistics stay legible over a busy image. Measured contrast on the copy is 16.58:1, and 9.35:1 on
the gold statistics.

To swap the photograph, replace the `src` on `.hero__bg img` in `index.html`. Four alternates are
already in `assets/img/hero/` at full resolution: `graduation.jpg`, `library.jpg`, `students.jpg`
and `computer-lab.jpg`. Pick something wide with space on the left, since that is where the copy
sits. The gallery copies elsewhere in `assets/img/` are compressed to 800px for thumbnails and will
look soft at hero scale, so use the `hero/` versions.

Elementor: one Container with a background image and background overlay, an inner container for the
copy, and the statistics as four Counter widgets in a flex row.

---

### Type scale

The heading scale was reduced by roughly 25-30% from the first draft. Body copy stays at 16px, which
is the accessibility floor and should not be reduced further.

| Role | Mobile | Desktop |
|---|---|---|
| Hero title | 31px | 48px |
| Page H1 | 28px | 40px |
| Section H2 | 23px | 30px |
| Card H3 | 19px | 23px |
| Lead paragraph | 17px | 18px |
| Body | 16px | 16px |

### Scholarship carousel

The home page scholarships are an **endless card carousel**: icon, title, description. No image and
no "Find out more" row; the whole card is the link.

The section sits on the mint tint (`section--mint`), the same ground the admissions page uses for
scholarships. White cards on white looked like one flat panel rather than separate cards, so the
tint plus a resting shadow is what makes each card read as its own object.

The base is a native scroller. `overflow-x: auto` with `scroll-snap-type` handles swiping, snapping
and keyboard scrolling with no script at all, and `scroll-padding-inline` matches the track padding
so a snapped card lines up with the container instead of resting one gutter along.

**Endless looping** is added on top. On load, JavaScript clones the whole set once before and once
after the real cards and starts the scroll in the middle. When the visitor drifts into a copy, the
scroll position shifts back by exactly one set width; that lands on identical content, so the jump
is invisible and the carousel never runs out in either direction. Neither arrow ever disables.

Two details worth keeping if this is rebuilt by hand:

- Arrows step to an **absolute** target, not `scrollBy`. With `scrollBy`, clicking again
  mid-animation adds to wherever the scroll happens to be at that instant, so quick clicks advance
  less than a full card each.
- Re-centring happens only once scrolling has **settled**, never mid-animation, or the jump fights
  the transition.

Clones are `aria-hidden` with `tabindex="-1"` on their links, so screen readers and the tab order
only ever meet the five real cards.

Cards visible: 1.3 on mobile, 2.9 on tablet, 3.8 on desktop, always with the next card peeking so it
is obvious there is more to scroll. Each card deep-links to its own anchor on
`malpi-advantage.html` (`#soaltee-academic-excellence` and so on) rather than five links to the same
place.

The admissions and Malpi Advantage pages keep the plain icon-box list, since those are the
destinations where the full criteria should all be visible at once. Say the word if you want the
carousel there too.

Elementor: rebuild with the Loop Carousel widget.

---

### Even card heights, in detail

Flexbox equalises cards *within* a flex line but not *between* wrapped lines, so a 3 + 3 grid ended
up with two different row heights. Four things fix it:

1. **Line reserves** (`min-height` on card headings and descriptions) get cards close on their own.
2. **`.row--even`** stops a wrapped remainder (5 cards as 3 + 2, or 19 as 4 + 4 + 4 + 4 + 3) from
   stretching to fill its line, which previously made those cards wider and their square photos taller.
3. **Two cards across on tablet** (768-1023px) instead of three. Three was cramped, and the narrow
   column made headings wrap unpredictably. A quantity query keeps rows of exactly three at
   three-across so no card is orphaned.
4. **A small equaliser in `main.js`** levels every card in a row to the tallest, re-running on
   resize, on image load and once web fonts have swapped in.

Only step 4 uses JavaScript, and it is progressive enhancement: with JavaScript off, steps 1-3 still
apply and the layout is correct, just not pixel-level even. **In the WordPress build, drop the
equaliser and use Elementor's own Equal Height setting on the container instead.**

---

## 7. Accessibility

Verified, not assumed:

- **Contrast** — all 22 colour pairs pass WCAG AA at 4.5:1 (see §3).
- **Headings** — exactly one `<h1>` per page, no skipped levels. Checked across all 13 pages.
- **Images** — every `<img>` has an `alt`; gallery alt text describes the actual photograph.
  Decorative images use `alt=""` with `aria-hidden`.
- **Keyboard** — visible gold focus ring everywhere; focus is never removed. The mobile drawer moves
  focus to its close button on open, traps Tab inside, closes on `Escape` and returns focus to the
  toggle.
- **Touch targets** — minimum 48px on buttons and nav links, 44px on small variants.
- **Forms** — every field has a visible `<label>`; errors appear next to the field they belong to,
  set `aria-invalid`, and focus moves to the first invalid field.
- **Motion** — `prefers-reduced-motion: reduce` disables transitions and transforms.
- **Landmarks** — skip link, `<header>`, `<nav aria-label>`, `<main id="main">`, `<footer>`.
- **Tables** — `<caption>` and `<th scope>` on every table; wide tables scroll inside their own box
  so the page never scrolls sideways.

---

## 8. Search and AI visibility (SEO / GEO / AEO / LLMO)

### What is in place

**Technical SEO**

- Unique `<title>` on every page, all within 60 characters
- Unique meta description on every page, all between 110 and 165 characters
- Correct canonicals; the home page canonicalises to the root, not to `/index.html`
- `robots.txt` with a sitemap reference
- `sitemap.xml` listing all 17 indexable pages with `lastmod`, `changefreq` and `priority`
- A `404.html` that is `noindex` and deliberately excluded from the sitemap
- One `<h1>` per page, no skipped heading levels, every image has alt text
- Open Graph and Twitter cards with image dimensions, alt text and `og:locale`

**Structured data.** Every page carries a single `@graph` tying together `WebSite`,
`CollegeOrUniversity` + `EducationalOrganization`, the `WebPage` itself and a `BreadcrumbList` built
from the same data as the visible breadcrumb, so the two can never drift apart. On top of that:

| Page | Additional schema |
|---|---|
| Four programme pages | `EducationalOccupationalProgram`, `FAQPage` |
| Home, Admissions | `FAQPage` |
| Programmes | `CollectionPage` + `ItemList` of the four degrees |
| Our Team | `AboutPage` + nine `Person` nodes |
| Professional Contributors | `CollectionPage` + `ItemList` of 19 `Person` nodes |
| Contact | `ContactPage` |

**AEO (answer engines).** 43 question-and-answer pairs across six pages, marked up as `FAQPage` and
written as direct answers rather than teasers, which is what gets lifted into featured snippets and
voice results. Curriculum, comparison and career data sit in real `<table>` markup with `<caption>`
and `<th scope>`, so it can be parsed rather than guessed at.

**GEO / LLMO (generative and AI answer engines).**

- `llms.txt` at the site root: a plain-text, high-fact-density summary of the college, every
  programme with its structure and credits, admission requirements and contact details. This is the
  emerging convention for giving language models a clean source instead of making them scrape.
- `robots.txt` explicitly names and **allows** 16 AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot,
  PerplexityBot, Google-Extended, Applebot-Extended, meta-externalagent and others). Being quotable
  is the goal here, so this is opt-in by design. Delete a block to opt one out.
- Name, address, phone and email are identical on 17 of 17 pages, which is what lets an engine
  resolve the college as one confident entity.
- `llms.txt` closes with a short "notes for answer engines" section stating plainly that placement
  support is not a job guarantee and that no salary figures are published, so a model summarising the
  site is less likely to overstate either.

### What still limits ranking, and why

These are not code problems and I have not papered over them.

1. **No blog or news.** This is the single biggest gap. Your own content document specified three
   posts targeting high-volume, low-competition queries: *BCSIT vs BCA Nepal*, *BCSIT salary Nepal*
   and a *BBA in Nepal* guide. Those are the terms prospective students actually search, and the
   site currently has nothing to rank for them. Programme pages alone will not win those queries.
2. **Six thin pages.** Word counts: Contact 252, Life at Malpi 305, Professional Contributors 324,
   Partnership 325, Research 357, Programmes 433. Thin pages rank poorly and get skipped by AI
   summarisers. They need real content, not padding.
3. **Fees are not published.** "BBA fees in Nepal" and similar are high-intent queries the site
   cannot answer at all.
4. **No reviews or written testimonials**, so no `Review` or `AggregateRating` schema. Star ratings
   are a strong rich-result and AI-citation signal, and video testimonials cannot supply them.
5. **Off-site signals are untouched by any of this**: backlinks, a claimed and populated Google
   Business Profile, and consistent citations in Nepali education directories. For a local
   institution the Business Profile usually matters more than anything on the page.
6. **Verification and measurement** still need doing on the live domain: Google Search Console, Bing
   Webmaster Tools and GA4. Submit `sitemap.xml` in Search Console once the site is live.

### On the WordPress rebuild

`robots.txt` and `sitemap.xml` will be regenerated by whichever SEO plugin you use (Yoast or Rank
Math), so treat the ones here as the specification rather than files to copy across. The plugin will
also emit its own `@graph`; configure it as an *Educational Organization* with the same name,
address, phone and social profiles used here, and do not run it alongside a second schema plugin or
you will publish the entity twice. `llms.txt` has no plugin equivalent, so upload it by hand.

---

## 9. Performance & SEO

- **No frameworks.** One 52KB stylesheet, one 12KB script. No jQuery, no icon fonts — icons are
  inline SVG.
- **Images optimised**: every image is sized for how it is actually displayed — gallery thumbnails
  at 800px, section images at 1100px, partner logos at 300px — then converted to JPEG (PNG kept only
  where transparency is needed) and recompressed. Heaviest page is `student-life.html` at ~3.1MB
  across 20 lazy-loaded gallery images; every other page is under 1.6MB. Every below-the-fold image
  uses `loading="lazy"`; the hero uses `fetchpriority="high"`.
- **Width and height on every image** so nothing shifts as the page loads (protects CLS).
- **Videos are click-to-load facades.** No YouTube iframe or third-party script loads until the
  visitor presses play, and playback uses `youtube-nocookie.com`.
- **SEO**: unique `<title>` and meta description per page, canonical URLs, Open Graph and Twitter
  card tags, and JSON-LD structured data —
  `CollegeOrUniversity` (home, contact), `EducationalOccupationalProgram` (all four programme pages),
  and `FAQPage` on every page carrying an accordion.

---

## 10. Things you need to decide or supply

These are flagged in the code so they are easy to find.

1. **Office hours** — `contact.html` carries a placeholder marked with the `needs-replacement` class
   (it renders with a dashed gold outline) and an HTML comment. The current mic.edu.np site does not
   publish office hours. **Confirm the real hours and remove the marker before launch.**
2. **Privacy Policy and Terms** — `privacy.html` is a reasonable working draft with a visible notice
   at the top. It has not been legally reviewed and does not describe MIC's actual internal data
   handling. Have it reviewed, then delete the notice block.
3. **Forms do not send.** Both forms validate on the client and show a success state only. Replace
   with Elementor Forms or WPForms and point them at the admissions inbox. Each form carries a
   `.form-note` developer note — delete it once the form is wired up.
4. **"100% placement support", not "guarantee".** The content document says *guarantee*; the live
   site says *support* / *assistanship*. This build uses **placement support** throughout, because
   guaranteeing employment is a claim that is difficult to defend. `privacy.html` also carries a
   clause explaining what the phrase means. Change it only with that risk in mind.
5. **Salary figures have been removed.** The programme pages previously carried NPR salary ranges
   taken from your content document. Those figures appear nowhere on mic.edu.np, and publishing
   unverifiable pay data is a claim that is hard to defend, so the career-outcome tables now show job
   role and sector only, exactly as the live BBA and BCSIT pages do. The Terms clause was rewritten
   to match. If you want salary bands back, supply a source you are happy to stand behind.
6. **No teaching-faculty directory exists.** The live site has a `malpi-faculty-members/` page, but it
   is empty apart from its title, so there was nothing to bring across. `faculty.html` covers the
   Chairman's and Principal's messages, the board and the management team. Send photos, names, titles
   and qualifications if you want a full teaching-faculty listing.
7. **American spelling inside the two messages.** The Chairman's and Principal's messages are
   reproduced verbatim from mic.edu.np, because they are signed statements. That means they contain
   *rigor*, *programs*, *Recognizing*, *honored* and *Center for Career Guidance and Placement*, while
   the rest of the site uses British spelling (*programmes*, *Centre*). Tell me if you would rather
   they were anglicised to match, and I will change them.
8. **Testimonials are the two YouTube videos** already on your site. There is no written testimonial
   anywhere on mic.edu.np. Real written quotes would strengthen the home page considerably.
9. **Fees are not published** anywhere on the current site, so the admissions page directs visitors to
   phone instead. Supply the fee structure if you want it on the page.
9. **BBA (Finance) credit total** — see §9. The live page publishes no total and its tables sum to
   121. Please confirm the official figure.
11. **Still not built:** Events, News, Blog and "Malpi-ites Making Waves". These are WordPress
   category archives (dynamic post listings) rather than static pages, so they are best rebuilt as
   WP archives. Ask if you want listing-page shells for the Elementor build.
12. **"WV" partner logo.** The live homepage lists this partner as *World Vision Nepal*, but the
   image file itself (`wv.png`) is the **Volkswagen** logo, and the partnership page files it under
   *Automobiles*. This build labels it Volkswagen so the alt text matches the image. Please confirm
   which partner is intended — and if both are partners, send the missing logo.

---

## 11. Course structure fidelity

The four programme pages reproduce the live site's course structure exactly, including the
**"Beyond Course Content / Experiential Learning Programme / Skills & Development"** table that sits
beside every semester — content that only exists on the programme pages and is one of the clearest
demonstrations of the Malpi Advantage.

The tables were **machine-extracted from the live HTML**, not retyped, so course codes, titles and
credit values match the source exactly. The section is presented as an accordion using the live
site's own toggle titles (`First Semester` … `Eighth Semester`, `Concentration and Electives Course`;
for the MBA, `Foundation and Analytical Courses` … `Electives Courses (4 Credits)`).

Credit totals were then re-summed from the rendered tables and reconcile against the published
figures:

| Programme | Sum of semester totals | Published figure |
|---|---|---|
| BBA | 120 | 120 ✅ |
| BCSIT | 127 | 127 ✅ |
| MBA | 60 | 60 ✅ |
| BBA (Finance) | 121 | not published |

**Note on BBA (Finance):** the live page does not state a total credit figure anywhere, and its
Eighth Semester table has no TOTAL row. Summing the published semester tables gives 121 credit
hours. Rather than invent a number, the page now states the structure (8 semesters, 5 courses per
semester, minimum 48 contact hours per course) without a headline credit total. **Please confirm the
official total and whether the Eighth Semester table is missing a TOTAL row.**

---

## 12. Content sources

| Page | Source |
|---|---|
| Home | mic.edu.np homepage + content doc §1 |
| About | mic.edu.np/about/ + content doc §2 |
| BBA | mic.edu.np/bba-programme/ + content doc §4 |
| BBA (Finance) | mic.edu.np/bba-finance-programme/ |
| BCSIT | mic.edu.np/bcsit-programme/ + content doc §3 |
| MBA | mic.edu.np/mba-programme/ + content doc §6 |
| Malpi Advantage | mic.edu.np/malpi-advantage/ |
| Our Team, incl. both messages | mic.edu.np/our-team/ |
| Professional Contributors | mic.edu.np/professional-contributors-at-malpi/ |
| Malpi Synergy Council | mic.edu.np/malpi-synergy-council/ |
| Partnership & Collaboration | mic.edu.np/partnership-collaboration/ |
| Research | mic.edu.np/research/ |
| Centre logos | NEW DESIGN/Center Print/2x2 center.pdf (supplied by the client) |
| Life at Malpi | mic.edu.np/life-at-malpi/ (gallery) |
| Contact | mic.edu.np/contact/ |

All photographs, partner logos and team portraits are the college's own, downloaded from mic.edu.np.
No stock or placeholder imagery is used anywhere on the site.

---

## 13. Contact details used

- **Address:** Narayan Gopal Chowk, Basundhara, Chakrapath, Kathmandu 44600, Nepal
- **Phone:** 01-4372986 (`tel:+97714372986`)
- **Email:** info@mic.edu.np
- **Facebook:** facebook.com/MalpiCollege
- **Instagram:** instagram.com/malpiintlcollege
- **YouTube:** youtube.com/channel/UCGu7y8FbMKJU3IFXvTGjwTw
- **LinkedIn:** linkedin.com/company/malpi-international-college

If any of these change, they appear in the header utility bar, the footer, the contact page and the
JSON-LD blocks on `index.html` and `contact.html`.

---

## 14. Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari) plus iOS and Android. Uses `clamp()`,
`aspect-ratio`, CSS custom properties and `:focus-visible` — all broadly supported. No polyfills.
