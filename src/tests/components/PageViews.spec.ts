import {beforeEach, describe, expect, it} from 'vitest';
import { render, fireEvent, screen } from '@testing-library/svelte';
import PageViews from '$src/components/PageViews.svelte';

import type { PageStat } from '$src/lib/types';

describe("The application should", () => {
    const pageStats: PageStat[] = [
        {slug: "slug1", views: 1, reads: 1, likes: 1, time: 1}, 
        {slug: "slug2", views: 2, reads: 2, likes: 2, time: 2}
    ];
    it("render the PageViews component correctly ", async () => {
        let {container} = render(PageViews, { props: { data: pageStats } });

        //table with two rows
        expect(screen.getByRole("table")).toBeDefined;
        expect(container.querySelectorAll("table tbody tr")).toHaveLength(2);

        //sorted on page views
        expect(container.querySelector("table tbody:nth-child(2) tr:nth-child(1) td a")?.innerHTML).toStrictEqual("slug2");
        expect(container.querySelector("table tbody:nth-child(2) tr:nth-child(2) td a")?.innerHTML).toStrictEqual("slug1");
    })

    it("renders 'no pageviews yet' when there are no pageviews", async () => {
        let { container } = render(PageViews, { props: { data: [] } });

        expect(screen.getByText("No pageviews yet.")).toBeDefined;
    })
})