import { error } from '@sveltejs/kit';
import fs from 'fs';
import { compile } from 'mdsvex'

/** @type {import('./$types').PageServerLoad} */
export function load({ params }) {
    let slug = params.slug;
    // TODO handle not found
    let content = fs.readFileSync(`${process.cwd()}/blogs/${params.slug}.md`, 'utf-8')   
    // compile(content).then(compiled => { console.log(compiled?.data?.fm) });
    return { 
        content: compile(content),
    };    
}