<script>
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
</script>

<h1 class="text-2xl">This is our front page homie dog</h1>
<div class="flex gap-20">
  <!-- Persona and Course card -->
  <div class="flex flex-col gap-20">
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
    <div class="card lg:card-side flex-wrap bg-base-100 shadow-xl max-w-[792px]">
      <div class="flex w-full bg-primary">
        <h1 class="text-2xl pl-8 py-4 text-white">Courses</h1>
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
  </div>
  <!-- Profile card  -->
  <div class="card w-96 bg-base-100 shadow-xl">
    <div class="flex w-full bg-primary">
      <h1 class="text-2xl pl-8 py-4 text-white">Profile</h1>
    </div>
    <figure class="px-8 pt-8">
      <img src="https://api.lorem.space/image/face?w=400&h=225" alt="profile" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
      <div class="w-full relative">
        <progress class="progress progress-primary w-full h-10" value="70" max="100" />
        <p class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl">
          Level {23}
        </p>
      </div>
      <div class="flex w-full justify-evenly">
        {#each badges as badge}
          <img class="rounded-xl h-10 w-10" src={badge.url} alt="WCAG badges" />
        {/each}
      </div>
      <h2 class="card-title">Solved exercises</h2>
      <p>{528}</p>
    </div>
  </div>
</div>

<style>
  /* your styles go here */
</style>
