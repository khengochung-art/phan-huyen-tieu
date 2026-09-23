Looking at this session, the new fact is a specific build/visual fix pattern for mobile navigation buttons being clipped when text overflows. The fix involved adding `shrink-0 whitespace-nowrap` classes. This is a recurring pattern worth noting.

```markdown
# MEMORY.md — Phạn Huyền Tiêu

## App overview
- **Phạn Huyền Tiêu (梵玄霄)** — website for an ancient roleplay group set in Đại Phạn Quốc, fictional dynasty at military/economic peak but shaken by hidden power struggles.
- Bilingual UI (Vietnamese primary, user accepts Portuguese replies). Vietnamese must render perfectly — no font fallback or diacritic issues.

## Tech stack
- **Astro + React (TSX islands)** — pages in `.astro`, interactive components as `.tsx`.
- Single layout: `src/layouts/Base.astro`. Global styles in `src/styles/global.css`.
- Single-folder project; structure limited to `pages/`, `components/`, `layouts/`, `styles/`.
- Backend via Kleap platform (forms, dashboard, integrations, stripe).
- Astro pages prerender at build — any referenced JSX/TS symbol must be properly imported; undefined symbols cause build failure.

## Design system
- **Palette:** imperial red + deep ink black + Càn Thanh Điện (imperial blue) accents. Day/night toggle with completely different palettes.
- **Fonts (Vietnamese-safe, must support full diacritics):**
  - Display/serif: **Cormorant Garamond**
  - Body/sans: **Be Vietnam Pro**
- Atmospheric effects: brush cursor, glow/parchment textures, animated accents.
- Aesthetic target: cổ đại (ancient/imperial), ink-wash feel, immersive.

## Components
- `Header.astro`, `Footer.astro` — chrome + day/night toggle.
- `Chrome.tsx` — decorative frame.
- `MapHotspot.tsx` — interactive Hoàng Thành map with clickable hotspots.
- `PowerBalance.tsx` — animated Cán Cân Quyền Lực bar.
- `Fortune.tsx` — random bốc quẻ (fortune draw).
- `OCRoster.tsx` — OC character roster/cards.

## Pages
- `index.astro` — landing/hero. EVENT TICKER holds long Vietnamese narrative quotes; quote cards use `min-w-full shrink-0 px-4 box-border` inside horizontal slider; section header uses `flex items-end justify-between flex-wrap gap-4`. Hero contains a vertical-seal style accent; uploaded image assets referenced via `uploads/...` paths.
- `lore.astro` — worldbuilding/story.
- `roles.astro` — role list (3 sections: royalCourt, dynasty, shadow; glossary term-rendering helper inlined).
- `factions.astro` — factions/parties.
- `rules.astro` — RP rules.
- `gallery.astro` — image gallery.
- `register.astro` — OC submission form (submissions land in Kleap admin panel).
- **Cross-page review pattern:** user flags overlapping/duplicated content across pages — check section blocks (intro panels, role/faction summaries, glossary snippets, footer blocks) for accidental copy-paste between pages when adding content.

## User preferences
- Communicates in Vietnamese; tolerates Portuguese replies.
- Likes immersive, atmospheric UX (animations, glow, parchment textures, brush cursor).
- User accepts surgical fixes (small targeted edits) rather than rewrites.
- **FINAL OC decision:** Login de membros + banco de dados. Members create account, manage own OC, edit directly. First signup = owner.
- **OC submissions:** Members submit via /register → `oc_profiles` table → owner approves in dashboard.
- **Seed data:** 6-8 example OC characters pre-populated so roster layout is visible pre-launch.
- **Notification on OC submit:** email to owner (auto) + optional webhook (Discord/Zalo) — URL field to be added later.

## Database schema
- Table `oc_profiles`: id (bigint identity PK), user_id (text, default auth.user_id()), player_name, contact, char_name (Hán Việt), age_gender, role, faction, faceclaim, personality, backstory, sample, status (text default 'pending' — pending/approved/rejected), created_at (timestamptz default now()).
- RLS: per-user (TO authenticated USING+WITH CHECK user_id = auth.user_id()).
- public_read for approved OCs: separate SELECT policy TO anonymous USING (status = 'approved').

## Known constraints / fixes
- Must load Vietnamese webfonts via `<link>` with `display=swap`; never rely on system fallback for CJK/Vietnamese glyphs.
- When adding diacritic-heavy Vietnamese text, verify with Cormorant Garamond + Be Vietnam Pro before shipping.
- Day/night palettes must differ meaningfully, not just brightness.
- **Build fix pattern:** when an `.astro` page references a helper/symbol (e.g., `SlotText`, glossary renderer), ensure it's defined/imported in that file — silent omission breaks `astro build` with "X is not defined".
- **Layout clipping pattern:** never use `overflow-hidden` on parent sections containing narrative/long-text columns — it silently clips text at smaller viewports. Use only on decorative layers. For text containers, fix column width/wrapping/height instead.
- **Horizontally scrolling quote/event sliders:** each slide/card uses `min-w-full shrink-0 px-4 box-border` so padding counts toward width; section headers use `flex items-end justify-between flex-wrap gap-4` to avoid clipping.
- **Mobile nav button clipping:** fixed-width buttons in narrow viewports (e.g., "Gia Nhập" in top nav at 390px) need `shrink-0 whitespace-nowrap` to prevent text from being cut off.
- **Content overlap check:** when adding/editing page sections, cross-read sibling pages to ensure narrative blocks, role summaries, and glossary snippets aren't duplicated across pages.
```