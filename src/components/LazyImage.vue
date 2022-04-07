<template>
<div class="lazy-demo">
  <lazy-img :src="imgSrc" width="500" />
</div>
</template>

<script>
export default {
  name: 'LazyImage',
  setup() {
  },
  data() {
    return {
      imgSrc: require('@/assets/lu.png')
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
