<script lang="ts">
  import { authUser } from '$lib/stores'

  import { formatDate } from '$lib/utils/stringFormating'
  import type { User } from '@prisma/client'

  export let users: User[]
</script>

<div class="flex justify-center p-5">
  <h1>Leaderboard</h1>
</div>

<div class="overflow-x-auto w-full">
  <table class="table table-zebra w-full text-center">
    <!-- head -->
    <thead>
      <tr>
        <th class="bg-primary">Level</th>
        <th class="bg-primary">Name</th>
        <th class="bg-primary">Total XP</th>
        <th class="bg-primary">WCAG Master</th>
        <th class="bg-primary">Exercises solved</th>
        <th class="bg-primary">Posts read</th>
        <th class="bg-primary" />
      </tr>
    </thead>
    <tbody>
      {#each users as user}
        <tr class={user.id === $authUser.id ? 'bg-success' : 'odd:bg-gray-100'}>
          <td>
            <div class="avatar">
              <div class="mask mask-squircle w-12 h-12">
                <img src="" alt={user.level} />
              </div>
            </div>
          </td>
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="mask mask-squircle w-12 h-12">
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
              <div class="mask mask-squircle w-12 h-12">
                <img src="" alt={user.wcagMasterLevel} />
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
          <!-- View profile Column TODO: Make go to profile page -->
          <td>
            <a
              class="btn btn-ghost btn-sm"
              role="button"
              sveltekit:reload
              href={`/profile/${user.id}`}>Profile</a
            >
          </td>
        </tr>
      {/each}
    </tbody>
    <!-- foot -->
    <tfoot>
      <tr>
        <th class="bg-primary">Level</th>
        <th class="bg-primary">Name</th>
        <th class="bg-primary">Total XP</th>
        <th class="bg-primary">WCAG Master</th>
        <th class="bg-primary">Exercises solved</th>
        <th class="bg-primary">Posts read</th>
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
