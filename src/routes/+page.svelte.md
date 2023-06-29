<script>
  import Posts from '$src/components/Posts.svelte';
</script>

# Home page

This is my personal space where I talk about technology, coding, the maker space and anything else that interests me

## Featured blogs

<Posts tag="featured" size=3 />

## todo

* ~~render markdown~~
* ~~slug based routes for blogs~~
* ~~bug: syntax highligting~~
* ~~metadata (frontmatter) at top of markdown files~~
* ~~List of blogs~~
* ~~sort blog list on date desc~~
* ~~divide into Make and Code~~ ~~list for tags~~
* ~~support categories~~
* ~~Pinned blogs on homepage~~
* dark/light theme


```elixir
defmodule Fib do 
  def fib(0) do 0 end
  def fib(1) do 1 end
  def fib(n) do fib(n-1) + fib(n-2) end
end

IO.puts Fib.fib(10)
```

<style lang="scss">
  h2 {
    border-bottom: 1px solid var(--accent);
    margin-bottom: 10em;
  }
</style>