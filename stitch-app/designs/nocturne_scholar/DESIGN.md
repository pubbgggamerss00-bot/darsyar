---
name: Nocturne Scholar
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#d3c5ac'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#9c8f79'
  outline-variant: '#4f4633'
  surface-tint: '#f9bd22'
  primary: '#ffe1a7'
  on-primary: '#402d00'
  primary-container: '#fbbf24'
  on-primary-container: '#6c4f00'
  inverse-primary: '#795900'
  secondary: '#bdc2ff'
  on-secondary: '#131e8c'
  secondary-container: '#2f3aa3'
  on-secondary-container: '#a8afff'
  tertiary: '#c8e9ff'
  on-tertiary: '#00354a'
  tertiary-container: '#82d2ff'
  on-tertiary-container: '#005a7b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdf9f'
  primary-fixed-dim: '#f9bd22'
  on-primary-fixed: '#261a00'
  on-primary-fixed-variant: '#5c4300'
  secondary-fixed: '#e0e0ff'
  secondary-fixed-dim: '#bdc2ff'
  on-secondary-fixed: '#000767'
  on-secondary-fixed-variant: '#2f3aa3'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  headline-xl:
    fontFamily: Vollkorn
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-xl-mobile:
    fontFamily: Vollkorn
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Vollkorn
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Vollkorn
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 34px
  headline-md:
    fontFamily: Vollkorn
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 32px
  title-lg:
    fontFamily: Noto Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 30px
  title-md:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 28px
  title-sm:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
  body-sm:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Noto Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system is engineered for middle school students engaged in deep, prolonged nighttime textbook study and interactive learning. The design narrative balances calm focus with approachable cognitive encouragement. Middle schoolers experience fatigue and visual restlessness during late-evening homework; this system removes high-glare friction, eliminates blue-light spike points, and transforms the screen into a soft, illuminated slate manuscript.

The aesthetic fuses **Modern Minimalist Surface Architecture** with **Tactile Educational Editorialism**. It eschews stark OLED pitch blacks in favor of deeply saturated midnight charcoal and abyssal navy tones, creating a low-irradiance ambient reading chamber. Mathematical formulas, grammatical callouts, and key definitions emerge via warm candle-like amber and golden hues, simulating physical highlighter pens over dark paper. Interactive widgets, diagrams, and navigational affordances hum with soft indigo and cyan bioluminescence, ensuring clear touch targets without interrupting focus. Visual rhythm respects Right-to-Left (RTL) reading flows natively, with bidirectional harmony for mathematical formulae and dual-script glossaries.

## Colors

The palette is tuned specifically for low-lux scotopic and mesopic viewing conditions. Pure white (#ffffff) and pure black (#000000) are forbidden to eliminate photopic glare and halation artifacts around text glyphs.

- **Background & Canvas:**
  - Base Scrim / App Backdrop: `#0f172a` (Slate 900)
  - Surface Level 1 (Textbook page / Card baseline): `#1e293b` (Slate 800)
  - Surface Level 2 (Elevated callout / Modal / Drawer): `#334155` (Slate 700)
  - Surface Level 3 (Active control / Interactive tray): `#475569` (Slate 600)

- **Text & Typography Tiers:**
  - Primary Body & Headlines: `#f8fafc` (Slate 50, softened off-white, 88% perceived luminance)
  - Secondary / Supporting Context: `#94a3b8` (Slate 400)
  - Tertiary / Footnotes & Captioning: `#64748b` (Slate 500)

- **Semantic & Highlighting Accents:**
  - **Amber / Gold Core (`#fbbf24`, `#f59e0b`):** Reserved strictly for focal concepts, key formulas, theorem blocks, vocabulary tags, and bookmarking. Emits zero harsh blue radiation, keeping circadian rhythms steady.
  - **Soft Indigo (`#818cf8`):** Applied to secondary interactive markers, practice quiz progress ribbons, and structural tab indicators.
  - **Muted Cyan (`#38bdf8`):** Direct interactive affordances, links, active scrubber heads, audio pronunciation buttons, and verified feedback states.
  - **Success / Feedback:** Soft Mint Sage (`#34d399`), Error/Caution: Muted Coral (`#f87171`).

## Typography

The typographic hierarchy is calibrated to handle complex editorial educational content with robust support for Right-to-Left (RTL) scripts, specifically Persian (Farsi), alongside Latin script formulas and numerals.

- **Type Roles & Pairings:**
  - **Editorial Display & Chapter Openers:** `Vollkorn` provides a warm, literary, bookish gravitas for unit titles, module covers, and chapter openings in Latin view, paired harmoniously with a Naskh-grounded system for Persian headlines.
  - **Body Text & Formulaic Explanations:** `Noto Sans` serves as the primary reading workhorse. With universal character support, optical balance in RTL Nastaliq/Naskh baselines, and tall x-height, it prevents visual crowding at small mobile scales.
  - **Line Height & Rhythm:** Line heights for RTL body copy are enlarged to `1.75x–2.0x` font size (e.g., 16px body on 28px/32px line-height) to gracefully accommodate Persian diacritics (Erab/Tashkeel) without line collision.
  - **Formulaic & Numeric Embeddings:** Mathematical symbols and Western numerals embedded in Persian paragraphs default to Left-to-Right directional isolation (`dir="ltr"`) using clean semi-bold weights to avoid baseline drift.

## Layout & Spacing

Reading comprehension demands strict control over line length (optimal measure: 45–65 characters per line). The layout strategy employs a **Fluid-Constrained Column System**:

- **Grid Architecture:**
  - **Mobile (<640px):** Single-column content stream. Margin: `1rem` (16px), Component Gap: `space-md` (16px). Cards span the full view width minus margins.
  - **Tablet (640px–1024px):** 6-column fluid grid. Margin: `1.5rem` (24px), Gutter: `1rem` (16px). Main study text occupies 4 columns; interactive glossary or practice questions occupy 2 columns.
  - **Desktop / Large Tablet Landscape (>1024px):** Max container width capped at `72rem` (1152px) centered. Margin: `2.5rem` (40px), Gutter: `1.5rem` (24px). Text measure remains clamped to `42rem` (672px) for reading ergonomics.

- **RTL Layout Flow:**
  - Spatial insets, padding, and directional cues invert automatically. Reading progression flows right-to-left; interactive dismissals swipe left-to-right.
  - Formula boxes and diagrams maintain intrinsic coordinate orientations with right-aligned contextual annotations.

## Elevation & Depth

This system avoids bright dropped shadows, which break dark-mode continuity and cause eye strain. Instead, depth is articulated through **Tonal Layering** combined with **Phosphor-Tinted Ambient Outlines**:

- **Level 0 (Backdrop Canvas):** Surface color `#0f172a`. Recessed, non-interactive.
- **Level 1 (Card & Content Blocks):** Surface `#1e293b` with a crisp, low-contrast `1px` inner or outer border of `rgba(148, 163, 184, 0.12)`. No drop shadow.
- **Level 2 (Interactive Floating Controls & Modals):** Surface `#334155`. Soft ambient shadow: `0 8px 24px -4px rgba(0, 0, 0, 0.45)`, accompanied by a subtle highlight rim on the top/start edge `rgba(255, 255, 255, 0.08)`.
- **Level 3 (Spotlight & Formula Callouts):** Surface `#1e293b` with a saturated warm amber border `1px solid rgba(251, 191, 36, 0.4)` and an amber ambient glow: `0 0 20px -2px rgba(251, 191, 36, 0.12)`.

## Shapes

The interface embraces a **Balanced Rounded** (`roundedness: 2`) shape taxonomy, delivering safety, tactile friendliness, and structural discipline suitable for young adolescent students:

- Default controls, text inputs, buttons, and formula cards utilize `0.5rem` (8px) radius.
- Larger pedagogical containers, interactive modal sheets, and exercise modules use `rounded-lg` (`1rem` / 16px).
- Highlight chips, glossary tag markers, audio player toggles, and step pills apply continuous rounded pill forms (`rounded-full`) to differentiate metadata from structural reading blocks.

## Components

### Buttons & Interactive Triggers
- **Primary Action (e.g., "Submit Answer", "Next Concept"):** Background `#fbbf24`, text `#0f172a` (dark charcoal for instant legibility), font weight 600, height 48px (optimal touch target). Active state shifts to `#f59e0b`.
- **Secondary Action (e.g., "Hint", "Listen Audio"):** Transparent background with `#334155` border, text `#818cf8`. Active state gains surface fill `rgba(129, 140, 248, 0.12)`.
- **Interactive Exercise Steppers:** Compact 40px icon buttons, circular, using `#1e293b` surface with cyan `#38bdf8` icons.

### Text Highlight Chips & Glossary Tags
- Pill-shaped (`rounded-full`), padding `0.25rem 0.75rem`.
- **Vocabulary Chip:** Surface `rgba(251, 191, 36, 0.12)`, text `#fbbf24`, border `1px solid rgba(251, 191, 36, 0.25)`.
- **Interactive Exploration Chip:** Surface `rgba(56, 189, 248, 0.12)`, text `#38bdf8`, border `1px solid rgba(56, 189, 248, 0.25)`.

### Lesson Cards & Formula Boxes
- **Standard Reading Container:** Surface `#1e293b`, radius `1rem`, padding `1.25rem`. Border `1px solid rgba(148, 163, 184, 0.12)`.
- **Key Formula Callout:** Surface `#1e293b`, radius `0.75rem`, padding `1rem 1.25rem`. Right-side border (for RTL) has a `4px` solid `#fbbf24` highlight band. Content uses gentle amber wash background (`rgba(251, 191, 36, 0.05)`).

### Input Fields & Multiple-Choice Options
- **Inputs:** Dark field `#0f172a`, border `1.5px solid #334155`, text `#f8fafc`, placeholder `#64748b`. Focus state illuminates border to `#38bdf8` with a 2px outer cyan glow (`rgba(56, 189, 248, 0.2)`).
- **Multiple-Choice Option Cards:** Large tap target (minimum height 52px). Unselected: `#1e293b` background with `#94a3b8` text. Selected: `#1e293b` background with `#818cf8` border and light indigo tint fill (`rgba(129, 140, 248, 0.1)`).

### Checkboxes & Radio Buttons
- Custom 22px elements with `rounded-md` (checkbox) or `rounded-full` (radio).
- Border `2px solid #475569`. When checked, filled with `#38bdf8` or `#fbbf24` with dark `#0f172a` checkmarks for immediate verification.

### Reading Progress Ribbon & Night Scrubber
- Persistent top-edge or bottom-edge bar: background `#1e293b`, 4px track height.
- Progress fill: smooth gradient from `#818cf8` to `#38bdf8`. Current section markers glow via `#fbbf24` pips.