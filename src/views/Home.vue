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
    console.log('setup->', getCurrentInstance().appContext.config.globalProperties.$globalProperty)
    onMounted(() => {
      console.log('onMounted->', getCurrentInstance().appContext.config.globalProperties.$globalProperty)
    })
  },
  created() {
    console.log('created->', this.$globalProperty)
  }
}
</script>

<style lang="less" scoped>

</style>
