<script lang="ts">
  import type { User } from '@prisma/client'

  export let authors: User[]
</script>

{#if authors.length > 0}
  {#each authors as author}
    <div class="flex p-1">
      <div class="h-7 w-7">
        <img
          class="h-full w-auto mask mask-squircle -ml-1"
          src={author.avatarURL}
          alt={`Profile picture for the author: ${author.firstName} ${author.lastName}`}
        />
      </div>
      <!-- TODO: Goto an author page to see courses and personas made by the author-->
      <a href="/dummy-profile-page"><i>{`${author.firstName} ${author.lastName}`}</i></a>
    </div>
  {/each}
{/if}
