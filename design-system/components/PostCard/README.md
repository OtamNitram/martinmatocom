# PostCard

One post in the blog list: tag chip with date and read time, the title, one catch phrase that invites the reader in, and a Read More button.

**Use** stacked in the 800px column, separated by a 1px `surfaces-divider` rule. Set `featured` on the newest post at the top of the list only: its title grows to `h1`. Set `nested` when the list sits under a section title (`h2`, e.g. "Latest stories"): titles become `h3`, 24 serif SemiBold.

**The catch phrase.** If the post has a highlight, that sentence is the catch phrase and it is not repeated anywhere else in the card. If the post has no highlight, use its first paragraph as written. Either way it is set as normal body text (no mint bar, no italics, no larger size), clamped to three lines, so it reads as the start of the post.

**Consumer provides** `title`, `href`, `tags` (one), `date` ("Sept 9, 2026"), `readTime` ("6 min read"), `highlight` and/or `excerpt` (the first paragraph), optional `byline`, `nested` and `cta` (default "Read More").
