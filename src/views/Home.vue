<template>
<h1>
{{msg}}
</h1>
<LazyImage />
</template>

<script>
import { onMounted, getCurrentInstance } from 'vue'
import LazyImage from '@/components/LazyImage'

export default {
  name: 'Home',
  components: {
    LazyImage
  },
  data() {
    return {
      msg: this.$globalProperty
    }
  },
  setup() {
    consola.info('setup->', getCurrentInstance().appContext.config.globalProperties.$globalProperty)
    onMounted(() => {
      consola.info('onMounted->', getCurrentInstance().appContext.config.globalProperties.$globalProperty)
    })
  },
  created() {
    consola.success('created->', this.$globalProperty)
  }
}
</script>

<style lang="less" scoped>
  h1{
    background-color: @bgColor;
  }
</style>
