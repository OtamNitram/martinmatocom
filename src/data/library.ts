/** The books on the Library page (design-system/pages/library.dc.html). Covers live in public/books/<id>.jpg. */

export const bookGroups = ["Leading teams", "Conversations", "AI & product", "Habits & life"] as const;
export type BookGroup = (typeof bookGroups)[number];

export interface Book {
  /** Also the cover file name and the #book-<id> anchor on /library. */
  id: string;
  title: string;
  author: string;
  group: BookGroup;
  /** Kindle search on Amazon for now; swap for the exact edition when it is chosen. No affiliate links. */
  amazonUrl: string;
  /** One line of mine about what happened to me with the book (not what it teaches). Optional for now. */
  note?: string;
  /** One of the four books shown on the home. */
  featured?: boolean;
}

function kindle(query: string) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(query).replace(/%20/g, "+")}&i=digital-text`;
}

export const books: Book[] = [
  { id: "extreme-ownership", title: "Extreme Ownership", author: "Jocko Willink & Leif Babin", group: "Leading teams", amazonUrl: kindle("Extreme Ownership Jocko Willink") },
  { id: "leaders-eat-last", title: "Leaders Eat Last", author: "Simon Sinek", group: "Leading teams", amazonUrl: kindle("Leaders Eat Last Simon Sinek") },
  { id: "radical-candor", title: "Radical Candor", author: "Kim Scott", group: "Leading teams", amazonUrl: kindle("Radical Candor Kim Scott") },
  { id: "multipliers", title: "Multipliers", author: "Liz Wiseman", group: "Leading teams", amazonUrl: kindle("Multipliers Liz Wiseman"), featured: true },
  { id: "the-coaching-habit", title: "The Coaching Habit", author: "Michael Bungay Stanier", group: "Leading teams", amazonUrl: kindle("The Coaching Habit Michael Bungay Stanier") },
  { id: "coaching-el-arte-de-soplar-brasas", title: "Coaching: el arte de soplar brasas", author: "Leonardo Wolk", group: "Leading teams", amazonUrl: kindle("Coaching: el arte de soplar brasas Leonardo Wolk"), featured: true },
  { id: "the-thin-book-of-trust", title: "The Thin Book of Trust", author: "Charles Feltman", group: "Leading teams", amazonUrl: kindle("The Thin Book of Trust Charles Feltman"), featured: true },
  { id: "corporate-rebels", title: "Corporate Rebels", author: "Joost Minnaar & Pim de Morree", group: "Leading teams", amazonUrl: kindle("Corporate Rebels Joost Minnaar") },
  { id: "the-culture-map", title: "The Culture Map", author: "Erin Meyer", group: "Leading teams", amazonUrl: kindle("The Culture Map Erin Meyer") },
  { id: "conversaciones-cruciales", title: "Conversaciones cruciales", author: "Patterson, Grenny, McMillan & Switzler", group: "Conversations", amazonUrl: kindle("Conversaciones cruciales Patterson") },
  { id: "storyworthy", title: "Storyworthy", author: "Matthew Dicks", group: "Conversations", amazonUrl: kindle("Storyworthy Matthew Dicks"), featured: true },
  { id: "never-split-the-difference", title: "Never Split the Difference", author: "Chris Voss", group: "Conversations", amazonUrl: kindle("Never Split the Difference Chris Voss") },
  { id: "ontologia-del-lenguaje", title: "Ontología del lenguaje", author: "Rafael Echeverría", group: "Conversations", amazonUrl: kindle("Ontología del lenguaje Rafael Echeverría") },
  { id: "como-ganar-amigos", title: "Cómo ganar amigos e influir sobre las personas", author: "Dale Carnegie", group: "Conversations", amazonUrl: kindle("Cómo ganar amigos e influir sobre las personas Dale Carnegie") },
  { id: "generative-ai-in-a-nutshell", title: "Generative AI in a Nutshell", author: "Henrik Kniberg", group: "AI & product", amazonUrl: kindle("Generative AI in a Nutshell Henrik Kniberg") },
  { id: "the-ai-product-playbook", title: "The AI Product Playbook", author: "Marily Nika", group: "AI & product", amazonUrl: kindle("The AI Product Playbook Marily Nika") },
  { id: "continuous-discovery-habits", title: "Continuous Discovery Habits", author: "Teresa Torres", group: "AI & product", amazonUrl: kindle("Continuous Discovery Habits Teresa Torres") },
  { id: "the-mom-test", title: "The Mom Test", author: "Rob Fitzpatrick", group: "AI & product", amazonUrl: kindle("The Mom Test Rob Fitzpatrick") },
  { id: "the-lean-startup", title: "The Lean Startup", author: "Eric Ries", group: "AI & product", amazonUrl: kindle("The Lean Startup Eric Ries") },
  { id: "the-bullet-journal-method", title: "The Bullet Journal Method", author: "Ryder Carroll", group: "Habits & life", amazonUrl: kindle("The Bullet Journal Method Ryder Carroll") },
  { id: "habitos-atomicos", title: "Hábitos atómicos", author: "James Clear", group: "Habits & life", amazonUrl: kindle("Hábitos atómicos James Clear") },
  { id: "the-obstacle-is-the-way", title: "The Obstacle Is the Way", author: "Ryan Holiday", group: "Habits & life", amazonUrl: kindle("The Obstacle Is the Way Ryan Holiday") },
];

/** The four on the home, in the canvas order. */
export const featuredBooks = ["multipliers", "coaching-el-arte-de-soplar-brasas", "the-thin-book-of-trust", "storyworthy"]
  .map((id) => books.find((book) => book.id === id))
  .filter((book): book is Book => Boolean(book));

export function coverOf(book: Book) {
  return `/books/${book.id}.jpg`;
}
