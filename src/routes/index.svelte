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

<!-- Blog posts -->
<div class="flex gap-20 pb-20">
  <div class="card lg:card-side flex-wrap bg-white shadow-xl max-w-[792px]">
    <div class="flex w-full bg-primary">
      <h1 class="text-2xl px-8 py-4 text-white">
        <a sveltekit:prefetch href={`/posts`}>
          <!-- TODO: Make page-->
          Blog Posts
        </a>
      </h1>
    </div>
    <div class="flex py-6 px-8 gap-8">
      {#each blogPosts as blogPost}
        <div
          class="card w-50 bg-base-100 shadow-xl w-1/3"
          on:click={() => goto(`/blogs/${blogPost.id}`)}
          style="cursor: pointer"
        >
          <div class="card-body justify-between p-6">
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
  <div class="flex flex-col gap-20">
    <!-- Persona card -->
    <div
      class="card lg:card-side flex-wrap bg-base-100 shadow-xl max-w-[792px] w-full justify-center"
    >
      <div class="flex w-full bg-primary">
        <h1 class="text-2xl pl-8 py-4 text-white">
          <a sveltekit:prefetch href={`/personas`}>
            <!-- TODO: Make page-->
            Personas
          </a>
        </h1>
      </div>
      <div class="flex flex-wrap p-4">
        {#each personas as persona}
          <div class="p-2 items-center">
            <div
              class="card w-96 bg-base-100 shadow-xl h-full max-w-[160px] max-h-[450px] items-center"
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
              <div class="card-body items-center text-center p-2 pb-4">
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
      class="card lg:card-side flex-wrap bg-base-100 shadow-xl max-w-[792px] w-full justify-center"
    >
      <div class="flex w-full bg-primary">
        <h1 class="text-2xl pl-8 py-4 text-white">
          <a sveltekit:prefetch href={`/courses`}>
            <!-- TODO: Make page-->
            Courses
          </a>
        </h1>
      </div>
      <div class="flex flex-wrap p-4">
        {#each courses as course}
          <div class="p-2 items-center">
            <div
              class="card w-96 bg-base-100 shadow-xl h-full max-w-[160px] max-h-[450px] items-center"
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
              <div class="card-body items-center text-center p-2 pb-4">
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
        <h1 class="text-2xl pl-8 py-4 text-white">Profile</h1>
      </div>
      <figure class="px-8 pt-8">
        <img
          src={$authUser.avatarURL ? $authUser.avatarURL : '/static/defaults/DefaultProfile.png'}
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
