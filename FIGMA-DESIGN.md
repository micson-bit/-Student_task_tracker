# Studyflow — UI/UX design handoff

This design handoff describes the implemented Studyflow interface for recreating in Figma. A Figma connection is not available in the current environment, so no Figma document was created.

## Visual direction

Create a calm, polished study planner that makes a student's next action easy to spot. Use a warm near-white canvas, crisp white surfaces, dark ink text, and lavender as the primary action color. Keep generous spacing, restrained borders, small rounded corners, and subtle shadows. Avoid dense dashboards and distracting decoration.

## Desktop frame — 1440 × 1000

- Background: `#F6F7FB`.
- Fixed left sidebar: 252 px wide, white, with a fine `#EDEC F2` divider.
- Main workspace: 62 px horizontal inset; content capped at 1116 px.
- Top navigation: 67 px high; breadcrumb on the left and date pill on the right.
- Welcome panel: 185 px high, 17 px radius, soft white-to-lavender gradient. Left aligned eyebrow, heading, and supporting text; simple book-and-pencil illustration on the right.
- Progress cards: three columns, 13 px gaps, 111 px high. Show total tasks, completed tasks, and completion percentage with a thin progress bar.
- Task section: eyebrow and title/count at top, full-width input with a purple action button, then task rows or the empty state.
- Sidebar order: Studyflow wordmark; Workspace label; My tasks and Overview navigation; encouragement card anchored near bottom; compact student profile.

## Components and states

- **Primary button:** purple `#7464E8`, white semibold label, 8 px radius; darken on hover.
- **Task input:** white, 48 px high, subtle border; lavender focus ring; helpful inline validation for a blank title.
- **Task row:** white, 57 px minimum height, 11 px radius; checkbox, title and added date, task-status chip, accessible remove button.
- **Completed task:** lavender checked checkbox, muted struck-through title, neutral status chip.
- **Empty list:** centered sparkle tile, “A fresh start.” heading, and friendly instruction in a dashed-border panel.
- **Responsive layout:** below 900 px, narrow the sidebar and stack the progress card; below 620 px, turn the sidebar into a compact top bar and let the welcome illustration recede.

## Design tokens

| Token | Value |
|---|---|
| Canvas | `#F6F7FB` |
| Surface | `#FFFFFF` |
| Primary | `#7464E8` |
| Primary tint | `#F2F0FF` |
| Text | `#27263A` |
| Secondary text | `#88899C` |
| Border | `#ECECF3` |
| Success | `#53A875` |
| Radius — controls | 8–11 px |
| Radius — cards | 14–17 px |
| Type | Plus Jakarta Sans for headings; DM Sans for UI/body |

## Figma setup

Create a 1440 × 1000 desktop frame and a 390 × 844 mobile frame. Build sidebar, stat card, task row, button, and input as reusable components. Use variants for task unchecked/complete and list populated/empty. Keep the palette and spacing values above as local variables/styles. The live prototype can link the My tasks item to the task list and demonstrate add, complete, delete, empty, and completed-list-clearing states.
