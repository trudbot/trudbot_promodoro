<template>
  <div class="progress-card card">
    <div class="header">
      <el-icon><Star /></el-icon><span>每日进度</span>
    </div>
    <div class="progress">
      <el-progress type="circle" :percentage="percentage" :width="240" :stroke-width="20" :color="colors">
        <template #default>
          <span class="percentage-header percentage">每日目标</span>
          <span class="percentage-value percentage">{{target}}</span>
          <span class="percentage-rooter percentage">分钟</span>
        </template>
      </el-progress>
    </div>
    <div class="today-progress">
      今日已完成: {{today}}分钟
    </div>
  </div>
</template>

<script setup>

import {computed} from "vue";
import {Star} from "@element-plus/icons-vue";

const props = defineProps({
  today: {
    default: 0,
    type: Number,
    required: true
  },
  target: {
    default: 180,
    type: Number
  }
});

const percentage = computed(() => {
  return Math.min(Math.floor(props.today / props.target * 100), 100);
});

const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#d37d6f', percentage: 30 },
  { color: '#eabc99', percentage: 50 },
  { color: '#31a3ff', percentage: 70 },
  { color: '#5cb87a', percentage: 100 },
]

</script>

<style scoped lang="scss">

.progress-card {

  .progress {
    margin-top: 30px;

    .percentage {
      display: block;
      margin: 5px;
    }

    .percentage-header {
      font-size: 20px;
    }

    .percentage-rooter {
      font-size: 20px;
    }

    .percentage-value {
      font-size: 50px;
      font-weight: bold;
      margin: 10px;
    }
  }

  .today-progress {
    margin-top: 30px;
    font-size: 20px;
  }

}

</style>