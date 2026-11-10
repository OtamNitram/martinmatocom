# TagFilter

Row of topic chips above the blog list, always starting with "All", with the number of posts on the right and a divider underneath.

**Use** once, between the page intro and the first PostCard. Use the four site topics in this order: "Personal", "Leading Teams", "Mentoring", "AI in Teams". Add a new topic only when several posts need it.

**Consumer provides** `tags`, the selected `value` (default "All"), `onChange`, and `count` for the current selection. When a topic has no posts, show a sentence in `body` instead of the list ("Nothing here yet on this topic. Try All.") rather than an empty page.

The selected chip uses the Chip's selected state (teal-500 ring and check), never a dark fill, so it cannot be mistaken for a button.
