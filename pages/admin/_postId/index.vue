<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'
import axios from 'axios'

export default {
  layout: 'admin',
  components: {
    AdminPostForm
  },
  asyncData(context) {
    const url = `https://nuxt-udemy-be152-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${context.params.postId}.json`
    return axios.get(url)
    .then(res => {
      return {
        loadedPost: res.data
      }
    })
    .catch(e => context.error())
  },
  methods: {
    onSubmitted(editedPost) {
      const url = `https://nuxt-udemy-be152-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${this.$route.params.postId}.json`
      axios.put(url, editedPost)
        .then(res => {
          this.$router.push('/admin')
        })
        .catch(e => {console.log(e)})
    }
  },
  
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
