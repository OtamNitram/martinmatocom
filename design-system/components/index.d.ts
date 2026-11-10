import type { ReactNode, ReactElement, MouseEventHandler } from "react";

export type IconName = "share" | "quote" | "back" | "group" | "psychology" | "coach" | "external-link" | "menu";

/** One of the eight glyphs from the file's Icon set; inherits currentColor. */
export interface IconProps { name: IconName; size?: number; label?: string; className?: string; }
/** The M + script m mark. */
export interface LogoProps { height?: number; label?: string; className?: string; }
/** Square action button. */
export interface ButtonProps {
  variant?: "primary" | "secondary";
  /** true = share icon; or any IconName. */
  icon?: boolean | IconName;
  disabled?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler;
  children: ReactNode;
  className?: string;
}
/** Underlined text link used in nav and footer. */
export interface LinkProps { href?: string; external?: boolean; visited?: boolean; current?: boolean; icon?: boolean | IconName; children: ReactNode; className?: string; }
/** Topic tag. */
export interface ChipProps { children: ReactNode; /** Turns the chip into a toggle button (aria-pressed). */ selected?: boolean; onClick?: MouseEventHandler; className?: string; }
/** Approach / pillar card with a mint icon tile. */
export interface CardProps { icon?: IconName; title: ReactNode; children: ReactNode; className?: string; }
/** Editorial pull quote: a short highlight-rule above one sentence set in pull-quote (32 Medium Italic). */
export interface HighlightProps { children: ReactNode; className?: string; }
/** Post teaser card. */
export interface NextReadProps { title: ReactNode; tag?: ReactNode; date?: ReactNode; href?: string; state?: "default" | "hover" | "active"; className?: string; }
/** One post in the blog list: tags, date and read time, title, a catch phrase (the post's highlight, else its first paragraph) and Read More. */
export interface PostCardProps { title: ReactNode; href?: string; tags?: ReactNode[]; date?: string; readTime?: string; /** The post's first paragraph; shown only when there is no highlight. */ excerpt?: ReactNode; byline?: ReactNode; /** The post's highlight; when present it replaces the excerpt as the catch phrase, set as normal body text. */ highlight?: ReactNode; cta?: ReactNode; featured?: boolean; /** The list sits under a section title (h2): render the title as h3 (24 serif SemiBold). */ nested?: boolean; className?: string; }
/** Topic filter row above the blog list, with an "All" chip and a post count. */
export interface TagFilterProps { tags: string[]; value?: string; onChange?: (tag: string) => void; count?: number; label?: string; className?: string; }
/** The long-form post page: meta line, h1 title, body in body-long at measure-reading, optional closing block. */
export interface ArticleProps { title: ReactNode; tags?: ReactNode[]; date?: string; readTime?: string; byline?: ReactNode; /** Paragraphs (<p>), <h2>s and Highlights, in reading order. */ children: ReactNode; /** Usually a <ClosingPrompt>. */ closing?: ReactNode; className?: string; }
/** The question that ends a post, with a single way to answer it. */
export interface ClosingPromptProps { question: ReactNode; children?: ReactNode; href?: string; cta?: ReactNode; icon?: boolean | IconName; /** false hides it; default "Thanks for reading." */ signoff?: ReactNode | false; className?: string; }
export interface NavLink { label: ReactNode; href: string; current?: boolean; external?: boolean; }
/** Site header bar. */
export interface HeaderProps { device?: "desktop" | "mobile"; name?: ReactNode; homeHref?: string; /** Default Blog, About, Contact. */ links?: NavLink[]; /** Primary button after the links; default Subscribe; false hides it. */ cta?: { label: ReactNode; href: string } | false; onMenu?: MouseEventHandler; className?: string; }
/** Site footer band. */
export interface FooterProps { device?: "desktop" | "mobile"; copyright?: ReactNode; links?: NavLink[]; className?: string; }

/** Labelled form field: S is one line, L is a multi-line textarea. */
export interface InputProps { label: ReactNode; size?: "s" | "l"; id?: string; name?: string; type?: string; placeholder?: string; value?: string; defaultValue?: string; onChange?: (e: any) => void; required?: boolean; disabled?: boolean; autoComplete?: string; rows?: number; className?: string; }

export declare function Icon(props: IconProps): ReactElement | null;
export declare function Logo(props: LogoProps): ReactElement;
export declare function Button(props: ButtonProps): ReactElement;
export declare function Link(props: LinkProps): ReactElement;
export declare function Chip(props: ChipProps): ReactElement;
export declare function Card(props: CardProps): ReactElement;
export declare function Highlight(props: HighlightProps): ReactElement;
export declare function NextRead(props: NextReadProps): ReactElement;
export declare function PostCard(props: PostCardProps): ReactElement;
export declare function TagFilter(props: TagFilterProps): ReactElement;
export declare function Article(props: ArticleProps): ReactElement;
export declare function ClosingPrompt(props: ClosingPromptProps): ReactElement;
export declare function Header(props: HeaderProps): ReactElement;
export declare function Footer(props: FooterProps): ReactElement;
export declare function Input(props: InputProps): ReactElement;
