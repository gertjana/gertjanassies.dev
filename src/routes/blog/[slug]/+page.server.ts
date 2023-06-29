import { error } from '@sveltejs/kit';
import fs from 'fs';
import { compile } from 'mdsvex'

/** @type {import('./$types').PageServerLoad} */
export function load({ params }) {
    let slug = params.slug;
    // TODO handle not found
    try {
        let content = fs.readFileSync(`${process.cwd()}/blogs/${params.slug}.md`, 'utf-8')   
        return { 
            content: compile(content),
        };    
    }
    catch (e) {
        throw error(404, { message: `Not found`});
    }
}