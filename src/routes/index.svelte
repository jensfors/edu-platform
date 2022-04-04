<script lang="ts">
  import { getCourseIcon } from '$lib/utils/courseIcon'
  import type { XP } from '$lib/utils/stringTypes'
  import type { Course, Persona, Post, User, WCAGPrinciple } from '@prisma/client'
  import { get } from 'svelte/store'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import { authUser } from '../lib/stores'
  import { createAuthorsString, formatDate } from '$lib/utils/stringFormating'

  export let userXP: XP
  export let courses: Course[]
  export let coursePrinciples: { id: string; principles: WCAGPrinciple[] }[]
  export let solvedExercises: number
  export let readBlogPosts: number
  export let personas: Persona[]
  export let blogPosts: Post[]

  if ($authUser) {
    $page.url.searchParams.set('userId', get(authUser).id)
    goto(`?${$page.url.searchParams.toString()}`)
  }

  function getPostAuthor(post: Post): string {
    try {
      if (post.authors) {
        return createAuthorsString(post.authors)
      }
      return 'No authors'
    } catch (e) {
      console.log(e)
    }
  }

  const badges = [
    {
      url: 'https://picsum.photos/120/120?random=111',
    },
    {
      url: 'https://picsum.photos/120/120?random=222',
    },
    {
      url: 'https://picsum.photos/120/120?random=333',
    },
    {
      url: 'https://picsum.photos/120/120?random=444',
    },
    {
      url: 'https://picsum.photos/120/120?random=555',
    },
  ]
</script>

<!-- Blog posts -->
<div class="flex gap-20 pb-20">
  <div class="card lg:card-side flex-wrap bg-white shadow-xl max-w-[792px]">
    <div class="flex w-full bg-primary">
      <h1 class="text-2xl px-8 py-4 text-white">Blog Posts</h1>
    </div>
    <div class="flex py-8 px-8 gap-8">
      {#each blogPosts as blogPost}
        <div class="card w-50 bg-base-100 shadow-xl w-1/3">
          <div class="card-body justify-between">
            <h2 class="card-title w-2/3">
              {blogPost.title}
            </h2>
            <div class="h-1/3">
              <p class="font-semibold">{getPostAuthor(blogPost)}</p>
              <p class="text-gray-500">{formatDate(blogPost.createdAt)}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- Personas, courses, profile card -->
<div class="flex gap-20">
  <div class="flex flex-col gap-20">
    <!-- Persona card -->
    <div class="card lg:card-side flex-wrap bg-base-100 shadow-xl max-w-[792px]">
      <div class="flex w-full bg-primary">
        <h1 class="text-2xl pl-8 py-4 text-white">Personas</h1>
      </div>
      <div class="flex py-8 pr-8">
        {#each personas as persona}
          <figure class="img flex flex-col pl-8">
            <img
              class="rounded-2xl"
              src={persona.avatarUrl}
              alt={persona.name}
              on:click={() => goto(`/persona/${persona.id}`)}
            />
            <p class="absolute top-3/4 text-white text-xl font-bold">{persona.name}</p>
          </figure>
        {/each}
      </div>
    </div>

    <!-- Courses Card -->
    <div class="card lg:card-side flex-wrap bg-base-100 shadow-xl max-w-[792px]">
      <div class="flex w-full bg-primary">
        <h1 class="text-2xl pl-8 py-4 text-white">Courses</h1>
      </div>
      <div class="flex py-8 pr-8">
        {#each courses as course}
          <div>
            <figure class="flex flex-col pl-8">
              <!-- Finds the correct course image -->
              <img
                class="rounded-2xl"
                src={getCourseIcon(
                  coursePrinciples.find(function (o) {
                    return o.id === course.id
                  }).principles
                )}
                on:click={() => goto(`/course/${course.id}`)}
                alt={`The course: ${course.title}`}
              />
              <!-- <p class="absolute top-3/4 text-white text-xl font-bold">{course.title}</p> -->
            </figure>
            <a sveltekit:prefetch href={`/course/${course.id}`}>{course.title}</a>
            <!-- <h2 class="text-1xl pl-8 py-4 text-black">{course.title}</h2> -->
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Profile card  -->
  {#if $authUser}
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="flex w-full bg-primary">
        <h1 class="text-2xl pl-8 py-4 text-white">Profile</h1>
      </div>
      <figure class="px-8 pt-8">
        <!-- TODO: Add default profile picture -->
        <img
          src={$authUser.avatarURL
            ? $authUser.avatarURL
            : 'https://api.lorem.space/image/face?hash=33791'}
          alt="profile"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <div class="w-full relative">
          <progress
            class="progress progress-primary w-full h-10"
            value={userXP.progressXP}
            max={userXP.nextLevelXP}
          />
          <p class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl">
            Level {userXP.level}
          </p>
        </div>
        <div class="flex w-full justify-evenly">
          {#each badges as badge}
            <img class="rounded-xl h-10 w-10" src={badge.url} alt="WCAG badges" />
          {/each}
        </div>
        <h2 class="card-title">Solved exercises</h2>
        <p>{solvedExercises}</p>
        <h2 class="card-title">Blog posts read</h2>
        <p>{readBlogPosts}</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .img {
    float: left;
    width: 100%;
    height: 100%;
    background-size: cover;
  }
</style>
