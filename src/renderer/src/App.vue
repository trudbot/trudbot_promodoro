<template>
  <div class="common-layout" >
    <el-container >
      <el-main class="main">
        <tomato-card :rest="data.rest" :alarm="data.alarm" @newRecord="handelNewRecord"></tomato-card>
        <progress-card :today="userData.today[0]" :target="data.target"></progress-card>
        <data-pane></data-pane>
        <setting></setting>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import TomatoCard from "./components/tomato-card/tomato-card.vue";
import ProgressCard from "./components/progress-card/progress-card.vue";
import {useUserData} from "./stores/userData";
import Setting from "./components/setting/setting.vue";
import {storeToRefs} from "pinia";

const userData = useUserData();
const {data} = storeToRefs(userData);
function handelNewRecord(record) {
  userData.setNewRecord(record);
}

window.api.saveData(async () => {
  await userData.save();
  window.api.quit();
});

</script>

<style scoped lang="scss">

.main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}

</style>

