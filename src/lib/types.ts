/** Post metadata, consist of all the data in the frontmatter plus the slug of the post */
export type MetaData = {
  title: string;
  summary: string;
  date: string;
  author: string;
  tags: string;
  category: string;
  image: string;
  slug: string;
  published: boolean;
}
  
/** Type to describe Page stats  */
export type PageStat = {
  slug: string;
  views: number;
  readingTime: number;
}

/** type to describe a loaded markdown file with frontmatter metadata */
export type GlobEntry = {
  metadata: MetaData;
  default: unknown;
}
  