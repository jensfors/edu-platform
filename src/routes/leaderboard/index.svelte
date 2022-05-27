<script lang="ts">
  import { authUser } from '$lib/stores'
  import { getLevelIcon, getWCAGMasterIcon } from '$lib/utils/levelIcon'

  import { formatDate } from '$lib/utils/stringFormating'
  import type { User } from '@prisma/client'

  export let users: User[]
  const column0: string = 'Rank'
  const column1: string = 'Level'
  const column2: string = 'Name'
  const column3: string = 'Total XP'
  const column4: string = 'WCAG Master'
  const column5: string = 'Exercises solved'
  const column6: string = 'Posts read'
</script>

<div class="flex justify-center p-5">
  <h1 class="text-3xl">Leaderboard</h1>
</div>

<div class="w-full overflow-x-auto">
  <table class="table-zebra table w-full text-center">
    <!-- head -->
    <thead>
      <tr>
        <th class="bg-primary">{column0}</th>
        <th class="bg-primary">{column1}</th>
        <th class="bg-primary">{column2}</th>
        <th class="bg-primary">{column3}</th>
        <th class="bg-primary">{column4}</th>
        <th class="bg-primary">{column5}</th>
        <th class="bg-primary">{column6}</th>
        <th class="bg-primary" />
      </tr>
    </thead>
    <tbody>
      {#each users as user, index}
        <tr class={user.id === $authUser.id ? 'bg-neutral-content' : 'odd:bg-gray-100'}>
          <!--Rank Column -->
          <td>
            {index + 1}
          </td>
          <!-- Level Column -->
          <td>
            <div class="avatar">
              <div class="mask mask-squircle h-12 w-12">
                <img
                  src={getLevelIcon(user.level)}
                  alt={'Level ' + user.level}
                  title={'Level ' + user.level}
                />
              </div>
            </div>
          </td>
          <!--Name Column -->
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                  <img
                    src={user.avatarURL}
                    alt="Profile avatar for {user.firstName} {user.lastName}"
                  />
                </div>
              </div>
              <div>
                <div class="font-bold">{user.firstName} {user.lastName}</div>
                <div class="text-sm opacity-50">
                  Created at {formatDate(user.createdAt.toString())}
                </div>
              </div>
            </div>
          </td>
          <!--XP Column -->
          <td>
            {user.totalxp ? user.totalxp : 0}
          </td>
          <!-- WCAG Master Level Column -->
          <td>
            <div class="avatar">
              <div class="mask mask-squircle h-12 w-12">
                <img
                  src={getWCAGMasterIcon(user.wcagMasterLevel)}
                  alt={'WCAG Master Level ' + user.wcagMasterLevel}
                  title={'WCAG Master Level ' + user.wcagMasterLevel}
                />
              </div>
            </div>
          </td>
          <!-- Solved Exercises Column -->
          <td>
            <div class="justify-center">
              {user.solvedExercises}
            </div>
          </td>
          <!-- Read Blog Posts Column -->
          <td>{user.readBlogPosts}</td>
          <!-- View profile Column -->
          <td>
            <a
              class="btn btn-ghost btn-sm"
              role="button"
              sveltekit:prefetch
              href={`/profile/${user.id}`}>View Profile</a
            >
          </td>
        </tr>
      {/each}
    </tbody>
    <!-- foot -->
    <tfoot>
      <tr>
        <th class="bg-primary">{column0}</th>
        <th class="bg-primary">{column1}</th>
        <th class="bg-primary">{column2}</th>
        <th class="bg-primary">{column3}</th>
        <th class="bg-primary">{column4}</th>
        <th class="bg-primary">{column5}</th>
        <th class="bg-primary">{column6}</th>
        <th class="bg-primary" />
      </tr>
    </tfoot>
  </table>
</div>

<style>
  td {
    background-color: rgba(0, 0, 0, 0);
  }
</style>
