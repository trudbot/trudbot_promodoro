<template>
  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
  >
    <span>{{ playerText }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="Pause">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
  <div class="tomato-card card">
    <div class="header">
      <el-icon>
        <Timer/>
      </el-icon>
      <span>{{ title }}</span></div>
    <div v-if="state === 'ready'">
      <div class="NumberSelector">
        <input-number v-model:num="num" :min="25" :max="120" suffix="分钟" :step="5"></input-number>
      </div>
      <div class="tip" v-if="num < 25">你将没有休息时间.</div>
      <div class="tip" v-else>你将有{{ breakTime}}分钟的休息时间</div>
      <div class="controlArea">
        <el-button class="button" @click="readyToWorking">
          <div>启动新一轮番茄时间</div>
        </el-button>
      </div>
    </div>
    <div v-else-if="state === 'working'" class="working">
      <count-down-timer :time="num" @over="workingToBreak" :end-button="true"></count-down-timer>
    </div>
    <div v-else-if="state === 'rest'" class="rest">
      <count-down-timer :time="Math.floor(num / 5)" @over="restToReady(false)" :end-button="false"></count-down-timer>
      <div class="controlArea">
        <el-button class="button" @click="restToReady(true)">
          <div>提前结束休息</div>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputNumber from "./components/inputNumber.vue";
import {ref} from "vue";
import {Timer} from "@element-plus/icons-vue";
import musicList from './../../utils/musicList'

const props = defineProps(['rest', 'alarm']);
const emit = defineEmits(['newRecord']);
//计时器的默认分钟数
const num = ref(25);
const title = ref('准备专注');
const state = ref('ready');

const dialogVisible = ref(false);
const playerText = ref('');
//Pause闭包函数， 用于暂停音乐
let Pause;

function play(music, text) {
  playerText.value = text;
  dialogVisible.value = true;
  const player = new Audio(musicList[music].value);
  player.play();
  const intervalId = setInterval(() => {player.play()}, 6000);
  Pause = () => {
    dialogVisible.value = false;
    clearInterval(intervalId);
    player.pause();
  }
}

//连续番茄个数
let count = 0;
const breakTime = ref(5);
function readyToWorking() {
  if (new Date().getHours() >= 22) {
    ElMessage({message: "太晚了， 快去休息吧!", type: "warning", title: "注意"});
  } else {
    state.value = 'working';
    title.value = '专注时段';
  }
}

function workingToBreak(record, active) {
  //开启音乐提醒且非主动结束番茄时
  if (props.alarm.open && !active) {
    play(props.alarm.music.working, "此轮番茄时间已结束!");
  }
  //实践番茄时间
  const time = Math.floor((record.end.getTime() - record.start.getTime()) / 60000);

  if (time <= 20) {
    //小于20分钟时无效
    ElMessage({message: "专注时间小于20分钟， 本次无效!", title: "注意", type: "warning"});
  } else {
    //保存记录
    emit('newRecord', [time, record.start.toLocaleTimeString(), record.end.toLocaleTimeString()]);
  }
  if (time < 25) {
    //小于25分钟时无休息时间
    ElMessage({message: "专注时间小于25分钟， 本次无休息时间", title: "注意", type: "warning"});
    backReady();
  } else {
    count ++;
    if (props.rest) {
      state.value = 'rest';
      title.value = '休息时段';
    }
  }
}

function backReady() {
  if (count !== 0 && count % 3 === 0) {
    breakTime.value = 20;
  } else {
    breakTime.value = 5;
  }
  state.value = 'ready';
  title.value = '准备专注';
}

function restToReady(active) {
  if (props.alarm.open && !active) {
    play(props.alarm.music.break, "休息时间已结束!");
  }
  backReady();
}

</script>

<style scoped lang="scss">
.tomato-card {

  .NumberSelector {
    display: flex;
    justify-content: center;
    margin: 20px;
  }

  .tip {
    color: gray;
  }

  .controlArea {
    margin-top: 40px;
  }

  .working {
    padding: 20px;
  }

  .button {
    background-color: #1a6ba8;
    height: 40px;
    border-radius: 10px;
    padding: 10px;
    border: white 3px solid;
    color: white;
    font-size: 20px;

    &:hover {
      border: #cb8258 3px solid;
    }
  }
}
</style>
