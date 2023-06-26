<template>
  <div class="data-pane card">
    <div class="header"><el-icon><Histogram /></el-icon><span>数据统计</span></div>
    <div class="main">
      <el-select v-model="days">
        <el-option label="过去7天" value='7'></el-option>
        <el-option label="过去一个月" value='31'></el-option>
      </el-select>
      <div class="graph" ref="chartContainer"></div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import getPastDate from "../../utils/getPastDate.js";
import {useLineChart, updateValues} from "../../utils/lineChart.js";
import {Histogram} from "@element-plus/icons-vue";
import {useUserData} from "../../stores/userData";
import {storeToRefs} from "pinia";
const userdata = useUserData();
const {lastMonth} = storeToRefs(userdata);
const chartContainer = ref(null);

const days = ref('7');

onMounted(() => {
  const {graph} = useLineChart(chartContainer.value, "日期", "时长");
  watch([days, lastMonth], () => {
    let day = parseInt(days.value);
    let interval = (() => {
      if (day === 7) return 1;
      if (day === 31) return 5;
      return 30;
    })();
    const show = lastMonth.value.slice(lastMonth.value.length - day, lastMonth.value.length);
    // console.log('lastMonth:', lastMonth.value);
    // console.log('show: ', show);
    updateValues(graph, getPastDate(show.length), show, interval);
  });
})

</script>

<style scoped lang="scss">
.data-pane {
  .main {
    height: 300px;
    margin-top: 20px;

    .graph {
      height: 100%;
    }
  }
}
</style>
