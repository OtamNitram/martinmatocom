# ClosingPrompt

The block that ends every post: one open question in the `h3` style (Source Serif 4, 24px SemiBold, roman; 20px on mobile), an optional line of invitation in `body-long`, a single primary Button to answer it, and a quiet sign-off in `caption`.

**Type, Nov 2026.** The question used to be 24px Medium Italic. Once the Highlight became a 32px Medium Italic pull quote, the italic question read as a smaller copy of it. The page now keeps italic for the one lifted sentence (Highlight) and sets the question roman and heavier, so each has its own voice.

**Use** once, at the very end of an Article, after a `surfaces-divider` rule. Ask a real question the reader could answer from their own life ("So, what was the armor you had to take off?"), not a rhetorical one.

**Consumer provides** `question`, optional invitation text as `children`, `href` (the LinkedIn profile or message link), `cta` (default "Send me a message"; plain, without naming LinkedIn, Nov 2026) and `signoff` (default "Thanks for reading."; `false` hides it).

Intentional addition, not in the Figma file. Keep it the only call to action inside the Article. After the Article, the post page's newsletter band is the page-level invitation (README, Article pattern); nothing else goes between them.
