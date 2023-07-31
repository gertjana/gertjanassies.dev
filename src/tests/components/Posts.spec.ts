import {describe, expect, it} from 'vitest';
import { render, screen, cleanup } from '@testing-library/svelte';
import Posts from '$src/components/Posts.svelte';
import paginate from '$src/components/Posts.svelte';

import type { PostMetaData } from '$src/lib/types';

describe("A post should", () => {
  const postsMetaData: PostMetaData[] = [{
    slug: "slug",
    title: "title",
    summary: "summary",
    date: "2021-01-01",
    author: "author",
    tags: "foo, bar",
    category: "category",
    image: "/images/placeholder.png",
    published: true
  }, {
    slug: "slug2",
    title: "title2",
    summary: "summary2",
    date: "2021-01-02",
    author: "author2",
    tags: "foo2, bar2",
    category: "category2",
    image: "/images/placeholder2.png",
    published: true
  }]

  const postsMetaDataUnpublished: PostMetaData[] = postsMetaData.map(post => { return {...post, published: false} });

  it('render correctly', async () => {
    let {container} = render(Posts, { props: { posts: postsMetaData, tag: "all", category: "", size: 2, showPagination: false  } });

    expect(container.querySelectorAll("article article")).toHaveLength(2);
    expect(screen.getByText(postsMetaData[0].title).innerHTML).toStrictEqual("title");
    expect(screen.getByText(postsMetaData[1].title).innerHTML).toStrictEqual("title2");
  })

  it('render correctly with pagination', async () => {
    let {container} = render(Posts, { props: { posts: postsMetaData, tag: "all", category: "", size: 1, showPagination: true  } });

    expect(container.querySelectorAll(".pagination")).toHaveLength(2);
    expect(container.querySelectorAll("article article")).toHaveLength(1);
    expect(screen.getByText(postsMetaData[0].title).innerHTML).toStrictEqual("title");
    expect(screen.queryByText(postsMetaData[1].title)).toBeNull();
  })

  it('does not render unplublished posts', async () => { 
    let {container} = render(Posts, { props: { posts: postsMetaDataUnpublished, tag: "all", category: "", size: 2, showPagination: false  } });

    expect(container.querySelectorAll("article article")).toHaveLength(0);      
  })


  it('render correctly with tag filter', async () => {
    let { container } = render(Posts, { props: { posts: postsMetaData, tag: "foo", category: "", size: 2, showPagination: false  } });

    expect(container.querySelectorAll("article article")).toHaveLength(1);
    expect(screen.getByText(postsMetaData[0].title).innerHTML).toStrictEqual("title");

    cleanup();

    container = render(Posts, { props: { posts: postsMetaData, tag: "bar2", category: "", size: 2, showPagination: false  } }).container;
    expect(container.querySelectorAll("article article")).toHaveLength(1);
    expect(screen.getByText(postsMetaData[1].title).innerHTML).toStrictEqual("title2");
  })

  it('render correctly with category filter', async () => {
    let { container } = render(Posts, { props: { posts: postsMetaData, tag: "all", category: "category2", size: 2, showPagination: false  } });

    expect(container.querySelectorAll("article article")).toHaveLength(1);
    expect(screen.getByText(postsMetaData[1].title).innerHTML).toStrictEqual("title2");
  })

  it("paginate correctly", async () => {
    const posts = new Posts({ target: document.body, props: { posts: postsMetaData, tag: "all", category: "", size: 1, showPagination: true  } });
    
    const paginated = posts.paginate(postsMetaData, 1, 1);

    expect(paginated).toHaveLength(1);
  })
})

