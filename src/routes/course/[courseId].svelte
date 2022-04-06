<script lang="ts">
  import type { Course, Persona, WCAGPrinciple, WCAGCriteria } from '@prisma/client'
  import { page } from '$app/stores'

  export let course: Course
  export let principles: WCAGPrinciple[]
  export let personas: Persona[]
</script>

<div class="flex gap-20 pb-20">
  <h1>{course.title}</h1>
  <button>
    <a href={`${$page.url.pathname}/create-exercise`}> Create exercise motherfucker </a>
  </button>
</div>
