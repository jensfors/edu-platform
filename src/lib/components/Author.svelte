<script lang="ts">
  import type { User } from '@prisma/client'

  export let author: User
</script>

{#if author}
  <div class="flex">
    <div class="h-7 w-7">
      <img
        class="h-full w-auto mask mask-squircle -ml-1"
        src={author.avatarURL}
        alt={`Profile picture for the author: ${author.firstName} ${author.lastName}`}
      />
    </div>
    <!-- TODO: Goto an author page to see courses and personas made by the author-->
    <a href="/"><i>{`${author.firstName} ${author.lastName}`}</i></a>
  </div>
{/if}
