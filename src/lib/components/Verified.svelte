<script lang="ts">
  import { Roles } from '$lib/utils/stringTypes'
  export let role: Roles

  function getTitle() {
    switch (role) {
      case Roles.Creator:
        return `This user is a Content Creator`
      case Roles.Admin:
        return `This user is an Administrator`
      default:
        return `This user is verified`
    }
  }
  function getBgColor() {
    switch (role) {
      case Roles.Creator:
        return 'bg-info'
      case Roles.Admin:
        return 'bg-purple-400'
      default:
        return 'bg-primary'
    }
  }
</script>

{#if role === Roles.Creator || role === Roles.Admin}
  <span
    class="{getBgColor()} text-gray-800 text-sm font-semibold inline-flex items-center p-1.5 rounded-full"
    title={getTitle()}
  >
    <svg
      class="w-3.5 h-3.5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        fill-rule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clip-rule="evenodd"
      /></svg
    >
  </span>
{/if}
