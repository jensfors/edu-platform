<script lang="ts">
  import type { Course, Persona } from '@prisma/client'
  import Author from '$lib/components/Author.svelte'
  import ContentCard from '$lib/components/ContentCard.svelte'

  export let persona: Persona
  export let courses: Course[]
</script>

<div class="flex">
  <div class="flex flex-col">
    <figure class="img">
      <img class="rounded-2xl" src={persona.avatarUrl} alt={persona.name} />
    </figure>
    <div class="flex gap-5 p-1">
      <div class="flex flex-col">
        <b>Name: </b>
        <b>Age: </b>
        {#if persona.disability}
          <b>Disability</b>
        {/if}
      </div>
      <div class="flex flex-col">
        <p>{persona.name}</p>
        <p>{persona.age}</p>
        {#if persona.disability}
          <p>{persona.disability}</p>
        {/if}
      </div>
    </div>
  </div>

  <div class="flex flex-col items-center gap-2 pl-2">
    <h1>
      {persona.name}
    </h1>
    {#if persona.official}
      <span title="This is an official persona" class="badge badge-secondary">OFFICIAL</span>
    {/if}

    <Author author={persona.author} />
    <p>
      {persona.description}
    </p>
  </div>
</div>
<div class="pt-8 flex justify-center">
  <ContentCard data={courses} />
</div>

<style>
  .img {
    float: left;
    width: 250px;
    height: 250px;
    background-size: cover;
  }
</style>
