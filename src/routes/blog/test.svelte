<script context="module">
  export const load = async ({ fetch }) => {
    const posts = await fetch('/api/posts.json')
    const allPosts = await posts.json()

    return {
      props: {
        posts: allPosts,
        all: posts,
      },
    }
  }
</script>

<script lang="ts">
  export let posts
  import SvelteMarkdown from 'svelte-markdown'
  const source = posts.markdown
</script>

<article class="prose prose-pre:text-white">
  <SvelteMarkdown {source} />
</article>

<!-- ****** This is an example of how to style markdown locally instead of globally  ******** -->
<!-- https://discord.com/channels/457912077277855764/457912077277855766/894820513069805578 -->
<!-- <article class="markdown-content">
  <slot />
</article>

<style>
  .markdown-content :global(h1) {
    font-size: 44px;
    color: blue;
  }
..
</style> -->
