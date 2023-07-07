    import { parse } from 'path';

    type GlobEntry = {
        metadata: MetaData;
        default: unknown;
    };

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

    // Get all posts and add metadata
    export const posts: MetaData[] = Object.entries(
        import.meta.glob<GlobEntry>('/content/*.md', { eager: true }))
            .map(([filepath, globEntry]) => {
                return {
                ...globEntry.metadata,
                slug: parse(filepath).name,
                };
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) satisfies MetaData[];
