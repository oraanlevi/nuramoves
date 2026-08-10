# BrandNu.Body — Website

A six-page editorial website for BrandNu.Body, founded by Nura Muhammad. Built as plain HTML/CSS/JS — no build step, no framework, no dependencies. Open it in VS Code and it just works.

## Folder structure

```
BrandNu.Body/
├── index.html          Home
├── about.html           About Nura
├── coaching.html        Coaching
├── results.html         Results
├── partnerships.html    Partnerships
├── apply.html            Apply
├── css/
│   └── styles.css        Design system + all page styles
├── js/
│   └── main.js            Nav, scroll reveals, FAQ accordion, form
└── assets/
    └── images/             Drop real photography here once shot
```

## Opening it in VS Code

1. Unzip the folder and open it in VS Code (`File → Open Folder`).
2. Install the **Live Server** extension (by Ritwick Dey) if you don't have it.
3. Right-click `index.html` → **Open with Live Server**. The site will open in your browser and reload automatically as you edit.

You can also just double-click `index.html` to open it directly in a browser — everything will render, though Live Server is recommended for active editing.

## What's real vs. placeholder right now

This build is fully designed and structured, and most of the brand voice copy is final. A few categories of content are intentionally marked as placeholders because they require real facts only you and Nura have:

- **Photography** — every image is currently a flat solid "frame" with a caption describing the intended shot (e.g. *"Nura mid-stride — to be shot, B&W"*). This is the most important placeholder category on the site: the entire layout is built to be led by full-bleed, high-contrast black-and-white movement photography — tight crops, partial figures, motion captured mid-action, no posed studio shots. Search the codebase for `.frame` and `frame__label` to find every spot. Once you have real photography, replace each `.frame` div's background with an `<img>` tag pointing to a file in `assets/images/` — most frames are sized to fill their container (`object-fit: cover` on the `<img>` will keep crops tight).
- **Nura's biography** — in `about.html`, look for text wrapped in `[brackets]`. These need her real career background, the specific turning point with movement, certifications, and a personal detail.
- **Client stories** — in `results.html` and the homepage testimonial section, quotes use placeholder initials (e.g. "K.W., Healthcare Executive"). Replace with real client stories once you have permission to use them.
- **Coaching logistics** — in `coaching.html`, the FAQ and "week in practice" section need real specifics on format, frequency, and commitment length.
- **Partnerships logos** — in `partnerships.html`, the "Past Collaborations" row is a placeholder grid for real brand logos once available.

Search the project for the string `[Placeholder` or `[placeholder` to find every remaining spot quickly (Cmd/Ctrl+Shift+F in VS Code).

## Connecting the Apply form

The form in `apply.html` is fully styled and functional on the front end (it shows a confirmation message on submit), but it is **not connected to anything yet** — submissions currently go nowhere. Before launch, wire it up one of these ways:

- **Form backend service** (fastest): a service like Formspree, Basin, or Getform lets you point the form's action at their endpoint and receive submissions by email with no custom backend.
- **Your own endpoint**: replace the `preventDefault` logic in `js/main.js` with a `fetch()` call to your own API route, CRM, or email service.
- **No-code automation**: tools like Zapier or Make can watch a Google Sheet or webhook and route new applications into your CRM or inbox automatically.

## Design system notes

- **Colors, type, and spacing** are all defined as CSS variables at the top of `css/styles.css` — changing the palette or fonts site-wide means editing them in one place.
- **Direction**: high-end athletic editorial — designed around black-and-white movement photography rather than around a color palette. Closer to a Nike Women or On Running campaign / fashion magazine spread than to a wellness retreat. Strict monochrome: black and white only, no accent color anywhere. Contrast and inversion (black-on-white / white-on-black) carry all the visual hierarchy that color used to.
- **Fonts**: Archivo Black (huge, condensed campaign headlines), Archivo (body/UI), Bodoni Moda italic (used sparingly — one or two editorial pull-quote moments only, not throughout), and Space Mono (campaign-tag labels styled like photo credits / contact-sheet annotations) — all loaded from Google Fonts via `<link>` tags in each page's `<head>`.
- **Image placeholders**: every `.frame` div is a flat solid block (light grey, mid grey, or near-black via `.frame--mid` / `.frame--dark` / `.frame--black`) with a thin border and a mono caption label — no gradients, no decoration. They're sized and cropped exactly where a real full-bleed black-and-white photo should go; drop an `<img>` into any `.frame` div to replace it.
- **Motion mark**: the abstract white line-streaks in the homepage hero (`.motion-mark` SVG) are original line art standing in for real movement photography — not a literal figure, since depicting Nura's likeness isn't something to fabricate. Swap this out entirely once real hero photography is in place.
- All interactive behavior (mobile nav, scroll reveals, the FAQ accordion, and the Apply form's confirmation state) lives in `js/main.js`.

## Suggested next steps

1. Fill in the bracketed placeholder copy with real facts about Nura, her certifications, and her story.
2. Schedule the brand photography shoot — the imagery direction is in the original blueprint (editorial, candid-not-posed, no stock photography, no gym clichés).
3. Collect 4–6 real client testimonials/case studies for the Results page.
4. Connect the Apply form to a real backend or form service.
5. Buy/point the domain, and deploy (this site is plain static files — it will work on Netlify, Vercel, GitHub Pages, or any standard web host with zero configuration).
