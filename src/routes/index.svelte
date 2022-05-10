<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { getCourseIcon } from '$lib/utils/courseIcon'
  import { createAuthorsString, formatDate } from '$lib/utils/stringFormating'
  import type { XP } from '$lib/utils/stringTypes'
  import type { Course, Persona, Post, WCAGPrinciple } from '@prisma/client'
  import { get } from 'svelte/store'
  import { authUser } from '../lib/stores'

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

<h1 class="px-8 py-4 text-center text-3xl">Welcome to the course platform</h1>
<h2 class="pb-20 text-center text-2xl">- where you can learn everything about accisibility</h2>

<!-- Blog posts -->
<div class="flex w-full max-w-[792px] gap-20 pb-20">
  <div class="card max-w-[792px] flex-wrap bg-white shadow-xl lg:card-side">
    <div class="flex w-full bg-primary">
      <h1 class="px-8 py-4 text-2xl text-white">
        <a sveltekit:prefetch href={`/posts`}>
          <!-- TODO: Make page-->
          Blog Posts
        </a>
      </h1>
    </div>
    <div class="flex gap-4 py-4 px-6">
      {#each blogPosts as blogPost}
        <div
          class="w-50 card w-1/3 bg-base-100 shadow-xl"
          on:click={() => goto(`/blogs/${blogPost.id}`)}
          style="cursor: pointer"
        >
          <div class="card-body justify-between p-4">
            <h2 class="card-title text-lg">
              {blogPost.title}
            </h2>
            <div class="h-1/2">
              <p class="font-semibold">{getPostAuthor(blogPost)}</p>
              <p class="text-gray-500">{formatDate(blogPost.createdAt.toString())}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- Personas, courses, profile card -->
<div class="flex gap-20">
  <div class="flex w-full max-w-[792px] flex-col gap-20">
    <!-- Persona card -->
    <div
      class="card w-full max-w-[792px] flex-wrap justify-center bg-base-100 shadow-xl lg:card-side"
    >
      <div class="flex w-full bg-primary">
        <h1 class="py-4 pl-8 text-2xl text-white">
          <a sveltekit:prefetch href={`/personas`}>
            <!-- TODO: Make page-->
            Personas
          </a>
        </h1>
      </div>
      <div class="flex flex-wrap p-4">
        {#each personas as persona}
          <div class="items-center p-2">
            <div
              class="card h-full max-h-[450px] w-96 max-w-[160px] items-center bg-base-100 shadow-xl"
              on:click={() => goto(`/persona/${persona.id}`)}
              style="cursor: pointer"
            >
              <figure class="px-3 pt-4">
                <div class="flex h-28 w-28 justify-center">
                  <img
                    class="rounded-2xl"
                    src={persona.avatarUrl}
                    alt={'Avatar of ' + persona.name}
                  />
                </div>
              </figure>
              <div class="card-body items-center p-2 pb-4 text-center">
                <h2 class="card-title text-base">
                  {persona.name}
                </h2>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Courses Card -->
    <div
      class="card w-full max-w-[792px] flex-wrap justify-center bg-base-100 shadow-xl lg:card-side"
    >
      <div class="flex w-full bg-primary">
        <h1 class="py-4 pl-8 text-2xl text-white">
          <a sveltekit:prefetch href={`/courses`}>
            <!-- TODO: Make page-->
            Courses
          </a>
        </h1>
      </div>
      <div class="flex flex-wrap p-4">
        {#each courses as course}
          <div class="items-center p-2">
            <div
              class="card h-full max-h-[450px] w-96 max-w-[160px] items-center bg-base-100 shadow-xl"
              on:click={() => goto(`/course/${course.id}`)}
              style="cursor: pointer"
            >
              <figure class="px-3 pt-4">
                <div class="flex h-28 w-28">
                  <img
                    class="rounded-2xl"
                    src={getCourseIcon(
                      coursePrinciples.find(function (o) {
                        return o.id === course.id
                      }).principles
                    )}
                    alt={`The course: ${course.title}`}
                  />
                </div>
              </figure>
              <div class="card-body items-center p-2 pb-4 text-center">
                <h2 class="card-title text-base">
                  {course.title}
                </h2>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Profile card  -->
  {#if $authUser}
    <div class="card w-96 bg-base-100 shadow-xl">
      <div class="flex w-full bg-primary">
        <h1 class="py-4 pl-8 text-2xl text-white">Profile</h1>
      </div>
      <figure class="px-8 pt-8">
        <img
          src={$authUser.avatarURL ? $authUser.avatarURL : '/static/defaults/DefaultProfile.png'}
          alt="profile"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <div class="relative w-full">
          <progress
            class="progress progress-primary h-10 w-full"
            value={userXP.progressXP}
            max={userXP.nextLevelXP}
          />
          <p class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-white">
            Level {userXP.level}
          </p>
        </div>
        <div class="flex w-full justify-evenly">
          {#each badges as badge}
            <img class="h-10 w-10 rounded-xl" src={badge.url} alt="WCAG badges" />
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
