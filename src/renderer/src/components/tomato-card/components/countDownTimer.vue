<template>
  <div class="progress">
    <el-progress type="circle" :percentage="percentage" :width="240" :stroke-width="20" :color="colors">
      <template #default>
        <span class="percentage-value percentage timer">{{ sm }}:{{ ss }}</span>
      </template>
    </el-progress>
  </div>
  <el-button type="danger" style="margin-top: 20px" v-if="endButton" @click="over(true)">
    提前结束
  </el-button>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'

const props = defineProps(['time', 'endButton']);
const emit = defineEmits(['over']);
const m = ref(0);
const s = ref(0);
const count = ref(0);
const data = {
  start: null,
  end: null
}

function over(active) {
  data.end = new Date();
  emit('over', data, active);
}

onMounted(() => {
  m.value = props.time;
  data.start = new Date();
  const intervalId = setInterval(() => {
    count.value ++;
    if (s.value === 0) {
      if (m.value === 0) {
        over(false);
        clearInterval(intervalId);
        return;
      }
      s.value = 59;
      m.value --;
    } else {
      s.value --;
    }
  }, 1000);
});

const sm = computed(() => {
  let res = m.value.toString();
  if (res.length === 1) res = '0' + res;
  return res;
});
const ss = computed(() => {
  let res = s.value.toString();
  if (res.length === 1) res = '0' + res;
  return res;
});
const percentage = computed(() => {
  return Math.floor(count.value / (props.time * 60) * 100);
});

const colors = [
  {color: '#f56c6c', percentage: 20},
  {color: '#d37d6f', percentage: 30},
  {color: '#eabc99', percentage: 50},
  {color: '#31a3ff', percentage: 70},
  {color: '#5cb87a', percentage: 100},
]

</script>

<style scoped lang="scss">
.timer {
  font-size: 50px;
  font-weight: bold;
  margin: 10px;
}

.progress {
  margin-top: 30px;

}
</style>
