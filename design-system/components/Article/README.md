# Article

The long-form post page: topic Chip with date and read time, the title in `h1`, the body in `body-long` inside the `measure-reading` column (680px), and a closing block.

**Use** for every post page. Pass the body as a flat list of `<p>` paragraphs, occasional `<h2>` section titles and at most one `Highlight`, placed right after the paragraph it comes from. Paragraphs get `space-l` between them; the Highlight gets `space-xl` around it.

**Consumer provides** `title`, `tags` (one topic), `date`, `readTime`, the body as `children`, and `closing` (normally a `ClosingPrompt`). Optional `byline`.

**Author block (Nov 2026).** The first child of the body is a `<figure class="author">` with the book-jacket portrait, Martín's name and one line about him. From 600px up it floats right of the first paragraph (photo 200x250, square corners, 32px gap to the text, 16px below; name in Instrument Sans 14 SemiBold, line in caption italic `text-secondary`). Below 600px it stops floating and becomes a byline row above the text: a 56px round photo with the name and line beside it. The README's Article pattern has the full rule and why.

**Links in the body** take `button-dark` (hover `button-mid`), but only plain text links: Buttons are excluded, so a `ClosingPrompt` placed as the last child of the body (where `closing` can't be passed, as on a Design canvas) keeps its primary button with a light label. Fixed Nov 2026: before, the link colour painted the button's label the same colour as its fill.

Intentional addition: the Figma file has a post frame but no article component; this one follows its type and colour and adds the longer line height a 900-word essay needs. No cover image.
