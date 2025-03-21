# DISCUSSION.md

## Overview

This project was a lot of fun to work on. I structured my approach into three focused tasks, each aligned with the given objectives:

1. **Bug fixes and anti-pattern cleanup**
2. **UI/UX improvements**
3. **Performance optimization**

Each task was its own PR, branched off the previous, simulating how features might be delivered in a real sprint. I set a personal timebox of ~45 minutes per task to keep myself scoped and focused. Here's a breakdown of my approach and what I accomplished in each task.

---

## Task 1: Bug Fixes and Anti-Patterns

My focus here was to bring the codebase to a functional and stable baseline without changing much of the app's existing structure. I:

- Cleaned up ESLint configuration and addressed warnings
- Removed bad patterns like direct DOM manipulation and unnecessary console logs
- Switched to TypeScript where appropriate for better type safety
- Added defensive error handling to API routes
- Fixed schema mapping issues (e.g., `payload` → `specialties`)
- Removed unused Tailwind setup from `globals.css` since the project was already using raw CSS

This task helped set a clean and predictable foundation for the next steps.

---

## Task 2: UI/UX Improvements

In this task, I improved the overall usability and layout of the app while keeping the core functionality intact. Key changes included:

- Introduced CSS Modules for scoped and modular styling
- Refactored the advocate list to use **cards** instead of a table for better readability and mobile-friendliness
- Built a reusable and styleable `Button` component
- Improved layout and typography for headings, inputs, and spacing
- Applied a minimal theme to the page to begin establishing design consistency

This task was intentionally scoped to keep things simple and polished, but modular enough to expand upon with a design system later.

---

## Task 3: Performance Improvements

This task addressed the potential performance bottleneck of fetching large datasets:

- Implemented **pagination on scroll** (infinite scrolling) using `IntersectionObserver`
- Updated the backend API to support pagination and search queries via query params (`page`, `limit`, `searchTerm`)
- Removed the old client-side filtering in favor of server-side filtering with pagination
- Updated the count query logic to return the **filtered total**, not just the full dataset count
- Added logic to prevent duplicate fetches and ensured correct handling of edge cases (e.g., when the result count isn’t divisible by the page size)

This significantly improves scalability and helps ensure smooth performance when dealing with large data sets.

---

## What I'd Do With More Time

When I think about the question “What would you do with more time?”, I try not to treat it as an invitation to dream up big features. Instead, I view it as a way to ask: _What are the next best steps, based on the current state of the app?_ I believe it’s easy to think big, but it takes discipline to grow in methodical, well-scoped increments. With that mindset, here's what I'd prioritize:

### Frontend

- Add essential quality-of-life improvements like loading spinners and toast notifications
- Introduce a global theme configuration to unify common design tokens (colors, fonts, spacing)
- Explore introducing a design system or internal UI component library for long-term scalability

### Backend

- Normalize `specialties` into its own table to support many-to-many relationships
  - This would enable modeling features like `subSpecialties` that can relate to multiple parent specialties
- Establish testing standards by adding unit tests (especially for controllers and query logic)
- Begin thinking about modularizing API logic into reusable service layers or utility functions

Each of these steps is focused on stability, maintainability, and readiness for future features—not just flashy upgrades. They're meant to incrementally grow the app in the same thoughtful, scoped approach I took with the three tasks.

---

Thanks again for the opportunity—I had a great time working through this! Looking forward to hearing your thoughts.
