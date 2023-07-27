/** Post metadata, consist of all the data in the frontmatter plus the slug of the post */
export type PostMetaData = {
  title: string;
  summary: string;
  date: string;
  author: string;
  tags: string;
  category: string;
  image: string;
  slug: string;
  published: boolean;
  image_attribution?: string;
}
  
/** Type to describe Page stats  */
export type PageStat = {
  slug: string;
  views: number;
  time: number;
  reads: number;
  likes: number;
}

/** type to describe a loaded markdown file with frontmatter metadata */
export type GlobEntry = {
  metadata: PostMetaData;
  default: unknown;
}
  