<template>
<div class="lazy-demo">
  <lazy-img :src="imgSrc" width="500" />
</div>
</template>

<script>
import lu from '@/assets/lu.png'

export default {
  name: 'LazyImage',
  setup() {
  },
  data() {
    return {
      imgSrc: lu
    }
  }
}
</script>

<style lang="scss" scoped>
.lazy-demo{
  lazy-img{
    margin: 0 0 0 0;
  }
}
</style>
