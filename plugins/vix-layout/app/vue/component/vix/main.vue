<template>
  <div class="application">
    <VixHeader :rate="headerRate"></VixHeader>
    <VixBody></VixBody>
    <VixFooter></VixFooter>
  </div>
</template>
<script>
  export default {
    name: "VixMain",
    props: {
      headerRate: {
        type: Number,
        default: 2
      }
    },
  }
</script>
<style lang="less" scoped>
.application{
  height: 100%;
  overflow: hidden;
  font-size:12px;
}
</style>