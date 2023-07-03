    import { parse } from 'path';

    type GlobEntry = {
        metadata: Post;
        default: unknown;
    };

    export interface Post {
        title: string;
        summary: string;
        date: string;
        author: string;
        tags: string;
        category: string;
        image: string;
    }

    // Get all posts and add metadata
    const posts = Object.entries(
        import.meta.glob<GlobEntry>('/src/lib/posts/**/*.md', { eager: true }))
            .map(([filepath, globEntry]) => {
                return {
                ...globEntry.metadata,
                slug: parse(filepath).name,
                };
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    export { posts };