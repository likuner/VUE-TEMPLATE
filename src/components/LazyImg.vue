<template>
  <div class="lazy-img">
    <img :src="require('@/assets/images/lu.png')" />
  </div>
</template>

<script>
import '@likun./lazy-img'

export default {
  name: 'LazyImg',
  setup() {
  },
}
</script>

<style lang="scss" scoped>
  .lazy-img{
    img{
      width: 300px;
      height: 200px;
    }
  }
</style>
