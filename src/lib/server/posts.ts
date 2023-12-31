import { parse } from 'path';
import type { PostMetaData, GlobEntry } from "$lib/types";

/** Get all metadata and add slug to it */
export const posts: PostMetaData[] = Object.entries(
  import.meta.glob<GlobEntry>('/content/*.md', { eager: true }))
    .map(([filepath, globEntry]) => {
      return {
      ...globEntry.metadata,
      slug: parse(filepath).name,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
