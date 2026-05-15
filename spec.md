# Looping AI Landing Page

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full landing page for Looping AI, a Slack-native agentic AI framework
- Hero section with headline, sub-headline, and primary CTA ("Join the Movement" / "Add to Slack")
- Value proposition section: what Looping AI is (not ChatGPT in Slack, but an opinionated agentic framework)
- "The Best Colleague You Never Had" section with feature highlights
- App scaffold/mockup images showing the product in action
- Use cases / examples section (how teams benefit)
- Security & Privacy section (safe-by-design, Slack identity, 1-month retention, least-privileged agents)
- Open Source & Community section
- Cost & Efficiency section (cost tracking, self-improving, LLM provider flexibility)
- Final CTA section ("Join the Movement")
- Simple footer with GitHub link placeholder and domain

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Rename project to "looping-ai-landing"
2. Generate 3-4 scaffold/mockup images of the Slack app UI
3. Generate Motoko backend (minimal — email waitlist capture or "join" counter)
4. Build frontend:
   - Responsive layout (mobile + desktop)
   - White background, dark grey (#1a1a1a / #2d2d2d) font
   - Cursive/serif font for headings (e.g. DM Serif Display or Playfair Display via Google Fonts)
   - Clean sans-serif for body (e.g. Inter)
   - Large whitespace, breathing layout
   - Sections: Hero, What Is It, Features, App Screenshots, Security, Open Source, CTA, Footer
   - "Add to Slack" button as primary CTA
   - Smooth scroll, subtle animations
   - All interactive elements with data-ocid markers
