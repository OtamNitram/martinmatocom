# Designer notes from the canvas

Translated from the Spanish notes on the canvas "Martín Mato · Web (consolidado)", Nov 2026.

## One design for the whole site

- The same header on every page: logo, Blog, About, Contact, Subscribe, a light/dark button, and a menu on phones.
- The same dark ending: the newsletter on Blog, Post and Contact; on About, the contact form. Below it, the same footer (Blog, About, Contact, RSS).
- Type and spacing come from the design system (Figma). Each section leaves 48px above and 48px below (24 on phones), so there are always 96px between two sections.

## Light and dark across the site

- It always starts light. The moon or sun button in the header, on any page, switches to dark, and the choice is kept while navigating and on the next visit.
- Dark colours from the design system: background `#121b27`, surfaces `#212d38`, borders `#364552`, teal buttons `#3d9c9a` with dark text.

## Post: what stayed from each experiment

- Reading: a 680px column, 20px on desktop and 18px on phones, 1.6 line height.
- Chapters: numbered headings, a collapsible table of contents at the top, a link to each section and "Back to contents".
- Sharing: a single Share button that opens the phone's share menu (no quote sharing).
- Tracker: a floating bar with the current chapter and the % read; tapping it goes to the contents. On phones it hides while scrolling down to read and comes back when scrolling up a little.
- Closing: write to me privately, LinkedIn, or send it to someone.

## Post: it is always clear that I wrote it (Mariana's idea)

- At the top: a photo with "Written by Martín Mato", the role and a link to About.
- While reading: the tracker carries the photo and "Martín · 03 / 06".
- At the end, before the question: "Thanks for reading. I'm Martín." with the photo and one line of bio (taken from About).
- "Write to Martín" carries the photo: it feels like writing to a person, not to a form.

## Post: LinkedIn before and after sharing

- Before: the "Talk on LinkedIn" card goes to the profile.
- After: "Join the conversation", highlighted, goes to the LinkedIn post where the story was shared.
- In Astro this is a post field (`linkedinUrl`) that, when present, shows the second version.

## Library: where each book leads

- On the home, 4 fixed books, no slider: Multipliers, Coaching: el arte de soplar brasas, The Thin Book of Trust and Storyworthy. Below them, "See all 22 books →".
- Clicking a book on the home goes to the Library page, to that book's row. It does not go straight to Amazon, so a first-time visitor does not leave on the first click.
- On the Library page: the 22 books in 4 groups (Leading teams, Conversations, AI & product, Habits & life). Each has a line of mine about what happened to me with it (not what it teaches), and a link to the Kindle edition on Amazon, in a new tab.
- Only the Amazon link, no affiliate links.
