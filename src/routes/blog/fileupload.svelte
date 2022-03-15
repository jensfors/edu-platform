<script>
  let postVar
  let fileVar

  function submitForm() {
    event.preventDefault()

    const dataArray = new FormData()
    dataArray.append('superHeroName', postVar)
    dataArray.append('uploadFile', fileVar)

    fetch('/api/posts', {
      method: 'POST',
      // headers: [['Content-Type', 'multipart/form-data']],
      headers: [['Content-Type', 'text/*']],
      body: dataArray,
    })
      .then((response) => {
        console.log('Upload Successfully')
        // Successfully uploaded
      })
      .catch((error) => {
        console.log('Yikes an fucking error occured')
        // Upload failed
      })
  }
</script>

<div>
  <form on:submit={submitForm}>
    <input type="text" bind:value={postVar} placeholder={'Superhero Name'} />
    <br />
    <input type="file" bind:files={fileVar} />
    <br />
    <input type="submit" />
  </form>
</div>
