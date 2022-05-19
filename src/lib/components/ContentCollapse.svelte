<script lang="ts">
  import { goto } from '$app/navigation'
  import { authUser } from '$lib/stores'
  import { getCourseIcon, getPrinciples } from '$lib/utils/courseIcon'
  import { Roles } from '$lib/utils/stringTypes'
  import type { User } from '@prisma/client'

  export let user: User
  export let type: string
  const courseType = 'Courses'
  const personaType = 'Personas'
</script>

{#if user.role === Roles.Creator || user.role === Roles.Admin}
  <div class="pb-6">
    <div
      tabindex="0"
      class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
    >
      <!-- Header -->
      <input type="checkbox" checked={true} />
      <div class="flex collapse-title bg-primary p-2 pl-4">
        <h1 class="flex items-center text-2xl font-medium pl-3">
          {type}
        </h1>
      </div>
      <!-- Course Content -->
      {#if type === courseType}
        <div class="collapse-content">
          <div class="flex justify-center items-center">
            <div class="flex flex-wrap p-4 pb-0">
              {#each user.courses as course}
                <!-- Only if its your own profile can you see non-public courses -->
                {#if course.course.public || $authUser?.id === user.id}
                  <!-- Course Card -->
                  <div class="p-4">
                    <div
                      class="card w-96 bg-base-100 shadow-xl h-full max-w-[185px] max-h-[450px]"
                      on:click={() => goto(`/course/${course.course.id}`)}
                      style="cursor: pointer"
                    >
                      <!-- Course icon-->
                      <figure class="px-3 pt-4">
                        <div class="flex h-28 w-28">
                          <img
                            class="rounded-2xl"
                            src={getCourseIcon(getPrinciples(course.course))}
                            alt={`The course: ${course.course.title}`}
                          />
                        </div>
                      </figure>
                      <!-- Card body includes course title and private badge -->
                      <div class="card-body items-center text-center p-2 pb-4">
                        <h2 class="card-title text-base">
                          {course.course.title}
                        </h2>
                        <!-- Badge to show if a course is set to private -->
                        {#if !course.course.public}
                          <span title="This is an official persona" class="badge badge-error"
                            >PRIVATE</span
                          >
                        {/if}
                      </div>
                    </div>
                  </div>
                {/if}
              {/each}
            </div>
          </div>
        </div>
      {/if}

      <!-- Persona Content -->
      {#if type === personaType}
        <div class="collapse-content">
          <div class="flex justify-center items-center">
            <div class="flex flex-wrap p-4 pb-0">
              {#each user.personas as persona}
                <!-- Only if its your own profile can you see non-public courses -->
                {#if !persona.private || $authUser?.id === user.id}
                  <div class="items-center p-2">
                    <!-- Goto persona page -->
                    <div
                      class="card h-full max-h-[450px] w-96 max-w-[160px] items-center bg-base-100 shadow-xl"
                      on:click={() => goto(`/persona/${persona.id}`)}
                      style="cursor: pointer"
                    >
                      <!-- Persona avatar -->
                      <figure class="px-3 pt-4">
                        <div class="flex h-28 w-28 justify-center">
                          <img
                            class="rounded-2xl"
                            src={persona.avatarUrl}
                            alt={'Avatar of ' + persona.name}
                          />
                        </div>
                      </figure>
                      <!-- Card body with name and badges -->
                      <div class="card-body items-center p-2 pb-4 text-center">
                        <h2 class="card-title text-base">
                          {persona.name}
                        </h2>
                        <!-- Badge to show if the persona is set to private -->
                        {#if persona.private}
                          <span title="This is an official persona" class="badge badge-error"
                            >PRIVATE</span
                          >
                        {/if}
                        <!-- Badge to indicate the persona is official -->
                        {#if persona.official}
                          <span title="This is an official persona" class="badge badge-info"
                            >OFFICIAL</span
                          >
                        {/if}
                      </div>
                    </div>
                  </div>
                {/if}
              {/each}
            </div>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}
