<script context="module">
  const searchUrl = '/'

  /*
  export async function load({ url, params, fetch }) {
    const id = userMatti.id
    const searchResult = await (await fetch(`${searchUrl}?q=${id}`)).json()

    return {
      status: 200,
      props: {
        searchResult: searchResult,
      },
    }
  } */
</script>

<script lang="ts">
  import { getCourseIcon } from '$lib/utils/courseIcon'
  import type { XP } from '$lib/utils/stringTypes'
  import type { Course, WCAGPrinciple } from '@prisma/client'
  import { get } from 'svelte/store'

  import { authUser } from '../lib/stores'

  export let userXP: XP
  export let courses: Course[]
  export let coursePrinciples: { id: string; principles: WCAGPrinciple[] }[]
  export let solvedExercises: number
  export let readBlogPosts: number

  import { page } from '$app/stores'
  import { supabase } from '$lib/db/supabaseClient'
  import { userMatti } from '$lib/db/dummy/data'
  /*
  $page.url.searchParams.append('userid', $authUser.id)
  const isBeta = $page.url.searchParams.has('userid')

  $page.url.searchParams.forEach((param) => console.log(param))
  console.log('Beta', isBeta)
*/
  // your script goes here
  const avatars = [
    {
      name: 'avatar1',
      url: 'https://picsum.photos/120/120?random=1',
    },
    {
      name: 'avatar2',
      url: 'https://picsum.photos/120/120?random=2',
    },
    {
      name: 'avatar3',
      url: 'https://picsum.photos/120/120?random=3',
    },
    {
      name: 'avatar4',
      url: 'https://picsum.photos/120/120?random=4',
    },
    {
      name: 'avatar5',
      url: 'https://picsum.photos/120/120?random=5',
    },
  ]

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

  const blogPosts = [
    {
      tite: 'Deadline for accessibility on governments websites',
      author: 'Mathias Rasmussen',
      date: '23-05-1997',
      profileImg: 'https://picsum.photos/40/40?random=123',
    },
    {
      tite: 'Deadline for accessibility for private websites',
      author: 'Mathias Rasmussen',
      date: '01-12-1985',
      profileImg: 'https://picsum.photos/40/40?random=234',
    },
    {
      tite: 'Deadline for accessibility for private websites',
      author: 'Mathias Rasmussen',
      date: '17-12-1969',
      profileImg: 'https://picsum.photos/40/40?random=345',
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
              {blogPost.tite}
            </h2>
            <div class="h-1/3">
              <figure>
                <img src={blogPost.profileImg} alt="Author profile" class="rounded-3xl" />
              </figure>
              <p class="font-semibold">{blogPost.author}</p>
              <p class="text-gray-500">{blogPost.date}</p>
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
        {#each avatars as avatar}
          <figure class="flex flex-col pl-8">
            <img class="rounded-2xl" src={avatar.url} alt={avatar.name} />
            <p class="absolute top-3/4 text-white text-xl font-bold">{avatar.name}</p>
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
          <figure class="flex flex-col pl-8">
            <!-- Finds the correct course image -->
            <img
              class="rounded-2xl"
              src={getCourseIcon(
                coursePrinciples.find(function (o) {
                  return o.id === course.id
                }).principles
              )}
              alt={`The course: ${course.title}`}
            />
            <p class="absolute top-3/4 text-white text-xl font-bold">{course.title}</p>
          </figure>
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
          src="https://api.lorem.space/image/face?w=400&h=225"
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
