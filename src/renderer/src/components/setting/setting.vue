<template>
  <div class="card setting">
    <el-dialog v-model="editTarget" class="target-selector" :show-close="false" :lock-scroll="true"
               title="选择每日的目标时间">
      <div class="dialog-body">
        <div v-for="option in targetOptions" class="option" @click="data.target = option.value"
             :class="{selected: option.value === data.target}">
          {{ option.text }}
        </div>
      </div>
    </el-dialog>
    <el-dialog v-model="editAlarmMusic" class="music-selector" :show-close="false" :lock-scroll="true"
               title="提醒音乐设置">
      <div class="dialog-body">
        <div class="item">
          <div id="open-alarm">
            <div>提醒音乐</div>
            <el-switch v-model="data.alarm.open"></el-switch>
          </div>
        </div>
        <div class="item">
          <div id="choose-alarm-type">
            <div :class="{'music-type-selected': selectType === 'working'}"
                 @click="selectType = 'working'">番茄结束声音
            </div>
            <div :class="{'music-type-selected': selectType === 'break'}"
                 @click="selectType = 'break'">休息结束声音
            </div>
          </div>
          <div class="music-item" v-for="item in musicList"
               :class="{selected: data.alarm.music[selectType] === item.name}">
            <div class="music-option">
              <div @click="data.alarm.music[selectType] = item.name" class="text">{{ item.text }}</div>
              <div class="play" @click="playMusic(item.value)">
                <el-icon :size="30">
                  <CaretRight/>
                </el-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <div class="header">
      <el-icon style="line-height: 100px;">
        <Setting/>
      </el-icon>
      <span>设置</span></div>
    <div class="setting-list">
      <div class="setting-group">
        <div class="group-header">专注设置</div>
        <div class="group-body">
          <div class="item">
            <setting-item>
              <template #icon>
                <el-icon :size="30">
                  <Coffee/>
                </el-icon>
              </template>
              <template #title>休息时间</template>
              <template #explain>在番茄时间结束后自动开启休息时间</template>
              <template #control>
                <el-switch size="large" v-model="data.rest"></el-switch>
              </template>
            </setting-item>
          </div>
          <div class="item" @click="editTarget=true">
            <setting-item>
              <template #icon>
                <el-icon :size="30">
                  <Flag/>
                </el-icon>
              </template>
              <template #title>
                每日目标
              </template>
              <template #explain>
                设置每日目标完成时间
              </template>
              <template #control>
                <el-icon :size="30" @click="editTarget=true">
                  <EditPen/>
                </el-icon>
              </template>
            </setting-item>
          </div>
        </div>
      </div>
      <div class="setting-group">
        <div class="group-header">常规设置</div>
        <div class="group-body">
          <div class="item">
            <setting-item>
              <template #icon>
                <el-icon :size="30">
                  <AlarmClock/>
                </el-icon>
              </template>
              <template #title>提醒音乐</template>
              <template #explain>番茄时间或休息时间结束后的音乐</template>
              <template #control>
                <el-icon :size="30" @click="editAlarmMusic=true">
                  <EditPen/>
                </el-icon>
              </template>
            </setting-item>
          </div>
          <div class="item">
            <setting-item>
              <template #icon>
                <el-icon :size="30">
                  <User/>
                </el-icon>
              </template>
              <template #title>关于trudbot</template>
              <template #control>
                <el-icon :size="30" @click="drawer=true">
                  <View/>
                </el-icon>
              </template>
            </setting-item>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-drawer v-model="drawer" :with-header="false" size="50%" class="trudbot-profile">
    <div class="trudbot">
      <div class="avatar">
        <el-avatar :src="avatar" :size="130"></el-avatar>
      </div>
      <div class="name-box"><p class="name">@trudbot</p></div>
      <div class="links-box">
        <a class="link" v-for="link in links" :href="link.link" target="_blank">
          <div class="text">{{link.name}}</div>
        </a>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import {AlarmClock, Back, CaretRight, Coffee, EditPen, Flag, Setting, User, View} from "@element-plus/icons-vue";
import {ref} from "vue";
import musicList from "../../utils/musicList";
import avatar from "./../../assets/img/avatar.jpg"
import {useUserData} from "../../stores/userData";
import {storeToRefs} from "pinia";
const store = useUserData();
const {data} = storeToRefs(store);
const drawer = ref(false);
const editTarget = ref(false);
const targetOptions = [
  {text: '30 分钟', value: 30},
  {text: '1 小时', value: '60'},
  {text: '1 小时, 30 分钟', value: 90},
  {text: '2 小时', value: 120},
  {text: '2 小时, 30 分钟', value: 150},
  {text: '3 小时', value: 180},
  {text: '4 小时', value: 240},
  {text: '5 小时', value: 300},
  {text: '6 小时', value: 360}
]

const editAlarmMusic = ref(false);
const selectType = ref("working");

function playMusic(music) {
  new Audio(music).play();
}

const links = [
  {name: "博客", link: "https://trudbot.cn/"},
  {name: "知乎", link: "https://www.zhihu.com/people/qu-ge-sha-ming-hao-ni-30"},
  {name: "github", link: "https://github.com/trudbot"}
]

</script>

<style scoped lang="scss">


.dialog-body {

  .option {
    padding-left: 20px;
    text-align: start;
    height: 50px;
    font-size: 25px;
    line-height: 50px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;

    &:hover {
      background: #dddddd;
      border-left: #1a6ba8 3px solid;
    }
  }

  .item {
    background: #f9f9f9;
    border: solid 1px #f3f3f3;
    margin-top: 10px;
    -moz-border-radius: 8px;

    #open-alarm {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;

      font-size: 16px;
    }

    #choose-alarm-type {
      height: 60px;
      font-size: 20px;
      display: flex;
      text-align: center;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;

      div {
        height: 100%;
        flex: 1;
        line-height: 40px;
      }
    }

    .music-option {
      padding-left: 20px;
      height: 50px;
      font-size: 25px;
      line-height: 50px;
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      &:hover {
        background: #dddddd;
        border-left: #1a6ba8 3px solid;
      }

      .text {
        width: 80%;
        text-align: start;
      }

      .play {
        width: 20%;

        &:hover {
          background: #cccccc;
        }
      }
    }
  }
}


.setting-list {
  margin-top: 10px;

  .setting-group {
    padding: 10px;

    .group-header {
      text-align: start;
      font-size: 20px;
      font-weight: bold;
    }

    .group-body {
      padding-top: 10px;

      .item {
        margin-top: 5px;

        &:first-child {
          margin-top: 0;
        }
      }
    }
  }
}

.selected {
  background: #e1e1e1;
}

.music-type-selected {
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.trudbot {
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;

  .avatar {
    display: flex;
    align-items: end;
    justify-content: center;
    height: 30%;
  }

  .name-box {
    text-align: center;
    margin-top: 20px;
    .name {
      margin: 0;
      color: rgb(0, 0, 0);
      font-weight: 700;
      font-size: 40px;
      line-height: 1.5;
      text-overflow: ellipsis;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  .links-box {
    margin-top: 30px;

    .link {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: auto;
      padding: 16px 20px;
      border: solid 2px #f2f2f2;
      margin: 10px 5px;
      border-radius: 10px;
      transition: 250ms;

      &:hover {
        margin: 10px 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .text {
        font-size: 20px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      }
    }
  }
}
</style>
