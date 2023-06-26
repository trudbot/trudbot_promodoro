<template>
  <div class="heatmap-container">
    <div v-for="item in data" class="item"></div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";

const data = ref([]);
onMounted(() => {
  for (let i = 0; i < 365; i ++) {
    data.value.push(0);
  }
})
</script>

<style scoped lang="scss">
.heatmap-container {
  background: #ffffff;
  height: 120px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  .item {
    height: 11px;
    width: 11px;
    background: #ebedf0;
    margin: 3px;
  }
}
</style>