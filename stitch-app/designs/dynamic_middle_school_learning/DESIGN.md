---
name: Dynamic Middle School Learning
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#00687a'
  on-secondary: '#ffffff'
  secondary-container: '#57dffe'
  on-secondary-container: '#006172'
  tertiary: '#684000'
  on-tertiary: '#ffffff'
  tertiary-container: '#885500'
  on-tertiary-container: '#ffd4a4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Vazirmatn
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 52px
  display-mobile:
    fontFamily: Vazirmatn
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 40px
  headline-lg:
    fontFamily: Vazirmatn
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 42px
  headline-lg-mobile:
    fontFamily: Vazirmatn
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Vazirmatn
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Vazirmatn
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Vazirmatn
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Vazirmatn
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Vazirmatn
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Vazirmatn
    fontSize: 15px
    fontWeight: '700'
    lineHeight: 24px
  label-md:
    fontFamily: Vazirmatn
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Vazirmatn
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.25rem
  margin: 1rem
  margin-tablet: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

The design system is crafted specifically for Iranian middle school students (Grades 7–9, ages 12–15). It bridges academic rigor with the vibrant, dopamine-rich world of interactive gaming and social platforms. The emotional atmosphere is encouraging, optimistic, and low-stress, counteracting exam anxiety with visual warmth, immediate positive feedback, and playful clarity.

The visual style is **Playful Modern Tactile**: a blend of smooth squircle forms, saturated accents, light-filled card surfaces, and subtle interactive elevations. It avoids childish illustrations suitable for elementary learners while intentionally steering clear of dry, bureaucratic adult ed-tech conventions. 

Visual characteristics include:
- Native Persian RTL (Right-to-Left) spatial layouts where energy flows naturally from right to left.
- Soft, organic depth created by tinted ambient glows and dimensional pill buttons.
- Gamified micro-motivational structures: high-chroma progress meters, milestone chips, and celebratory state surfaces.
- Micro-interactions characterized by springy, responsive physics (e.g., slight squash-and-stretch or tactile scale downs on touch).

## Colors

The palette balances energetic focus with joyful motivation. The dynamic indigo primary anchors the experience in authoritative yet youthful clarity, while secondary and tertiary tones drive the gamified reward loop.

- **Primary (`#4F46E5` - Electric Indigo)**: Anchors core actions, navigation bars, key interactive buttons, and primary topic headers.
- **Secondary (`#06B6D4` - Vivid Cyan)**: Communicates speed, quest progress, active states, interactive tools, and quiz prompts.
- **Tertiary (`#F59E0B` - Solar Amber)**: Sparks joy; reserved for XP counters, streak badges, level stars, and prompt highlights.
- **Success (`#10B981` - Bright Emerald)**: Signals correct answers, mastered topics, completed units, and celebratory states.
- **Canvas & Surface System**:
  - `bg-canvas`: `#F8FAFC` (Cool Crisp Alabaster) - clean and glare-free.
  - `bg-surface`: `#FFFFFF` - pure white card surfaces creating floating layers.
  - `bg-surface-tinted`: `#EEF2FF` - soft indigo-tinted surface for active or selected cards.
  - `text-primary`: `#0F172A` (Deep Slate) - crisp legibility for Persian glyphs.
  - `text-secondary`: `#475569` - secondary metadata, question prompts, and captions.
  - `text-tertiary`: `#94A3B8` - placeholders and deactivated status counters.
  - `border-subtle`: `#E2E8F0` - crisp structural separation when placed over off-white backdrops.

## Typography

Typography relies on **Vazirmatn**, an open-source Persian typeface engineered for screen legibility, balanced horizontal rhythm, and native Persian numerical shapes (`0123456789` -> `۰۱۲۳۴۵۶۷۸۹`).

Rules for Persian typography in this system:
- **Line Heights**: Set at approximately 150–170% to accommodate Persian ascenders and descenders (such as *Re*, *Zhe*, *Noon*, and vowel diacritics / *aerab*), preventing clipping in headings and quiz questions.
- **Weights**: Heavily leverage SemiBold (`600`), Bold (`700`), and ExtraBold (`800`) across interface elements to maintain strong contrast and readability under outdoor or low-budget mobile screen conditions.
- **Numerals**: Force Persian numeral glyph variants (`font-feature-settings: "ss01"`) throughout all display counters, timers, question indices, and grade progress meters.
- **Direction**: Strict RTL throughout text containers, with directional icon mirroring (e.g., forward arrows pointing left `←`, back arrows pointing right `→`).

## Layout & Spacing

The layout is built around a mobile-first, vertical touch flow. The interface conforms to a 4-column layout on mobile devices (`<600px`), shifting to an 8-column layout on tablets (`600px–1024px`) with safe outer margins.

- **RTL Geometry**: Main actions and thumb zones originate on the right side of the screen. Primary visual cues (subject icons, step status markers) anchor right, while completion badges and disclosure chevrons sit left.
- **Target Sizes**: Touch targets never drop below `48px × 48px` to support quick tapping and thumbs in motion.
- **Spacing Rhythm**: Governed by an 8-point system. Component paddings predominantly use `space-md` (16px) and `space-lg` (24px) to provide ample room around Persian text blocks, avoiding visual clutter.

## Elevation & Depth

Visual hierarchy leverages **Ambient Tinted Depth** combined with layered flat planes rather than harsh dark drop shadows. Depth serves to guide focus toward the next actionable educational step.

- **Level 0 (Flat)**: Background canvas (`#F8FAFC`).
- **Level 1 (Card Rest)**: Pure white `#FFFFFF` cards with a soft dual shadow: `0 2px 4px rgba(15, 23, 42, 0.03), 0 8px 16px rgba(79, 70, 229, 0.04)`.
- **Level 2 (Interactive Floating / Active Module)**: `0 8px 24px rgba(79, 70, 229, 0.12)`, accented with a 1.5px subtle border tint (`#EEF2FF`).
- **Level 3 (Modals, Bottom Sheets, Floating Quests)**: `0 16px 36px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(6, 182, 212, 0.08)`.
- **Gamified Tactile Press**: Key buttons utilize a physical 3D lip using a solid lower border (`box-shadow: 0 4px 0 #3730A3` for the indigo primary) which compresses to `0 0 0` on active press, offering immediate tactile feedback.

## Shapes

The shape system is friendly, soft, and modern, utilizing squircle-approximated radii to produce an approachable, inviting environment:

- **Standard Buttons & Inputs**: `rounded-2xl` (16px / `1rem`), providing a tactile, bouncy appearance.
- **Subject & Lesson Cards**: `rounded-3xl` (24px / `1.5rem`), softening modular content blocks and flashcards.
- **Pill Badges & Counters**: Pill-shaped (`9999px`) for XP indicators, streaks, and grade filters.
- **Containers & Sheets**: `rounded-t-3xl` for draggable bottom modal sheets and lesson summary overlays.

## Components

### Buttons
- **Primary Action (Tactile Pill)**: Solid `#4F46E5` background, white bold Vazirmatn text, height `52px`, `rounded-2xl`. Features a 3D bottom bevel (`border-b-4 border-indigo-800`). On `:active`, the element translates `2px` downwards with the bottom border flattened to `2px`.
- **Secondary Quest Button**: `#06B6D4` background with deep teal bottom edge (`#0891B2`), white text. Used for "Start Quiz" and "Watch Lesson".
- **Tertiary / Ghost Button**: Translucent background (`#EEF2FF`), primary-colored text (`#4F46E5`), zero border, used for skipping questions or secondary dismiss actions.

### Cards
- **Curriculum Subject Card**: `#FFFFFF` background, `rounded-3xl`, padded with `1.5rem`. Features an energetic corner accent gradient (e.g., Violet to Cyan), a large Persian subject label (e.g., «ریاضی نهم» / 9th Grade Math), an embedded visual progress bar, and a Persian status badge aligned to the top-left.
- **Gamified Quiz Card**: Squircle white surface with a subtle 2px border in `#F1F5F9`. Multiple-choice options inside the card highlight with `#EEF2FF` border and `#4F46E5` text on select, morphing into solid `#10B981` with white text on correct validation.

### Chips & Badges
- **Streak & XP Counter**: Pill-shaped (`rounded-full`), padded `6px 14px`, warm solar background (`#FEF3C7`), tertiary text (`#B45309`), containing an amber flame or star glyph aligned to the right of the Persian number (e.g., «۲۵۰ امتیاز»).
- **Subject Filter Chip**: Resting in soft gray (`#F1F5F9`), transitioning to deep indigo (`#4F46E5`) with white text when activated.

### Input Fields
- **Search & Quiz Inputs**: Height `52px`, `rounded-2xl`, background `#FFFFFF`, border `2px solid #E2E8F0`. Text aligns right with trailing Persian search icons positioned on the far right. Active focus state triggers a `2px solid #4F46E5` outline with a cyan ambient ring (`0 0 0 4px rgba(6, 182, 212, 0.15)`).

### Selection Controls (Checkboxes & Radios)
- **Checkboxes**: Sized `24px × 24px`, `rounded-lg` (8px), thick 2px border in `#CBD5E1`. When selected, transitions to a solid `#4F46E5` fill with a crisp white checkmark SVG.
- **Radio Buttons**: Concentric circles with smooth scaling animation; selected state features a white inner dot inside a vibrant `#06B6D4` circle.

### Progress Meters & Gamification Trackers
- **Mastery Bar**: Track height `12px`, background `#E2E8F0`, `rounded-full`. Fill bar is an energetic dual gradient (`#4F46E5` to `#06B6D4`), animating from right to left as students complete lessons.
- **Daily Goal Ring**: Circular SVG progress ring with `#10B981` stroke and centered Persian percentage typography.