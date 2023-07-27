import {beforeEach, describe, expect, it} from 'vitest';
import { render, fireEvent, screen, cleanup } from '@testing-library/svelte';
import CopyButton  from '$src/components/CopyButton.svelte';
import Footer from '$src/components/Footer.svelte';
import Nav from '$src/components/Nav.svelte';
import OnlinePlaces from '$src/components/OnlinePlaces.svelte';
import Social from '$src/components/Social.svelte';

describe("The application should", () => {
    beforeEach(() => {
        cleanup();
    })

    it("render the CopyButton component correctly", async () => {
        let { container } = render(CopyButton);

        expect(screen.getByRole("button")).toBeDefined;

        let button = screen.getByRole('button')
        await fireEvent.click(button)
        
    })

    it("render the Footer component correctly", async () => {
        render(Footer);

        expect(screen.findByText("© 2023 by Gertjan Assies")).toBeDefined;
    })

    it("render the Nav component correctly", async () => {
        let {container} = render(Nav);

        expect(screen.findByText("gertjanassies.dev")).toBeDefined;
        expect(container.querySelectorAll("nav a")).toHaveLength(7);
    })

    it("render the Footer component correctly ", async () => {
        render(Footer)

        expect(screen.findByText("© 2023 by Gertjan Assies")).toBeDefined;
    })

    it("render the Online Places component correctly ", async () => {
        let { container } = render(OnlinePlaces);
        expect(container.querySelectorAll("a")).toHaveLength(5);
    })

    it("render the Social component correctly ", async () => {
        let { container } = render(Social, { props: { slug: "slug", url:"/blog" } }); 

        expect(container.querySelectorAll("svg")).toHaveLength(2);
        expect(screen.getByTitle("click to like")).toBeDefined();
        expect(screen.getByTitle("click to copy this url to the clipboard")).toBeDefined();
    })
})

