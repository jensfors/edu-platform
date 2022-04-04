<script lang="ts">
  import type { Course, Persona, WCAGPrinciple } from '@prisma/client'

  export let course: Course
  export let principles: WCAGPrinciple[]
  export let personas: Persona[]
</script>

<div class="flex gap-20 pb-20">
  <h1>{course.title}</h1>
</div>
