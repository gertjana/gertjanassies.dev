import {beforeEach, describe, expect, it} from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Post  from '$src/components/Post.svelte';

import type { PostMetaData } from '$src/lib/types';

describe("A post should", () => {
  const postMetaData: PostMetaData = {
    slug: "slug",
    title: "title",
    summary: "summary",
    date: "2021-01-01",
    author: "author",
    tags: "foo, bar",
    category: "category",
    image: "/images/placeholder.png",
    published: true
  }


  it('render correctly', () => {
    render(Post, { props: { metadata: postMetaData  } });

    expect(screen.findByText(`/blog/${postMetaData.slug}`)).toBeDefined;
    expect(screen.getByText(postMetaData.title)).toBeDefined;
    expect(screen.getByText(postMetaData.summary)).toBeDefined;
    expect(screen.findByText(postMetaData.date)).toBeDefined;
    expect(screen.findByText(postMetaData.author)).toBeDefined;
    expect(screen.getByText(postMetaData.category)).toBeDefined;
    postMetaData.tags.split(",").forEach(tag => {
      expect(screen.getByText(tag.trim())).toBeDefined;
    });
    expect(screen.findAllByRole("img")).toBeTruthy();
    expect(screen.findByText(postMetaData.image)).toBeDefined;
  })

  it ('render correctly with some tags', () => {
    let { container } = render(Post, { props: { metadata: {...postMetaData, tags: "foo, bar, baz"}  } });
    expect(container.querySelectorAll(".tag")).toHaveLength(4); // 3 tags + 1 category      

    let tags = container.querySelectorAll(".tag a");
    expect(tags[0].innerHTML).toStrictEqual("foo");
    expect(tags[1].innerHTML).toStrictEqual("bar");
    expect(tags[2].innerHTML).toStrictEqual("baz");
    expect(tags[3].innerHTML).toStrictEqual("category");
  })
})