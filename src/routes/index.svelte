<script context="module">
  import { authUser } from '$lib/stores'
  import { get } from 'svelte/store'
  import '../app.css'

  export const load = async ({ fetch }) => {
    let userId = get(authUser) ? get(authUser).id : null
    const response = await fetch(`/api/home/${userId}`, {
      method: 'GET',
    })
    let data = await response.json()
    const userXP = data.userXP
    const courses = data.courses
    const coursePrinciples = data.coursePrinciples
    const solvedExercises = data.solvedExercises
    const readBlogPosts = data.readBlogPosts
    const personas = data.personas
    const blogPosts = data.blogPosts
    const criteria = data.criteria

    return {
      props: {
        userXP,
        courses,
        coursePrinciples,
        solvedExercises,
        readBlogPosts,
        personas,
        blogPosts,
        criteria,
      },
    }
  }
</script>

<script lang="ts">
  import { goto } from '$app/navigation'
  import { getPrincipleMasterLevel, getWCAGMasterLevel } from '$lib/utils/awards'
  import { getCourseIcon } from '$lib/utils/courseIcon'
  import { getPrincipleMasterIcon, getWCAGMasterIcon } from '$lib/utils/levelIcon'
  import { createAuthorsString, formatDate } from '$lib/utils/stringFormating'
  import { Principle, type XP } from '$lib/utils/stringTypes'
  import type { Course, Persona, Post, WCAGCriteria, WCAGPrinciple } from '@prisma/client'

  export let userXP: XP
  export let courses: Course[]
  export let coursePrinciples: { id: string; principles: WCAGPrinciple[] }[]
  export let solvedExercises: number
  export let readBlogPosts: number
  export let personas: Persona[]
  export let blogPosts: Post[]
  export let criteria: WCAGCriteria[]

  let awards: { name: string; img: string; level: number }[] = setAwards()
  // TODO: Delete if new GET works fine
  /*
  if ($authUser) {
    $page.url.searchParams.set('userId', get(authUser).id)
    goto(`?${$page.url.searchParams.toString()}`)
  }
*/
  function getPostAuthor(post: Post): string {
    try {
      // @ts-ignore
      if (post.authors) {
        // @ts-ignore
        return createAuthorsString(post.authors)
      }
      return 'No authors'
    } catch (e) {
      console.log(e)
    }
  }

  function setAwards(): { name: string; img: string; level: number }[] {
    let awards: { name: string; img: string; level: number }[] = []
    // Gets the WCAG Master Level Award
    let wcagMasterLevel: number = getWCAGMasterLevel(criteria)
    awards.push({
      name: 'WCAG Master',
      img: getWCAGMasterIcon(wcagMasterLevel),
      level: wcagMasterLevel,
    })
    // Gets the award for each WCAG Principle
    for (let principle in Principle) {
      if (isNaN(Number(principle))) {
        let level: number = getPrincipleMasterLevel(criteria, Principle[principle])
        awards.push({
          name: principle + ' Master',
          img: getPrincipleMasterIcon(level, Principle[principle]),
          level,
        })
      }
    }
    return awards
  }
</script>

<h1 class="px-8 py-4 text-center text-3xl">Welcome to the course platform</h1>
<h2 class="pb-12 text-center text-2xl">Where you can learn everything about accessibility</h2>

<div class="flex gap-20">
  <div class="flex w-full max-w-[792px] flex-col gap-20">
    <!-- Blog posts -->
    <div class="flex w-full max-w-[792px] gap-20">
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
    <div class="card w-96 h-full bg-base-100 shadow-xl">
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
      <div class="card-body items-center text-center pt-4">
        <h2 class="card-title pb-2">{$authUser.firstName + ' ' + $authUser.lastName}</h2>
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
          {#each awards as award}
            <div class="flex h-14 w-14">
              <img
                class="h-full w-full"
                src={award.img}
                alt={award.name + ' Level ' + award.level}
                title={award.name + ' Level ' + award.level}
              />
            </div>
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
