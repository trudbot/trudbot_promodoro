<template>
  <div class="container" :style="{background: hover}" @mouseenter="hover='#fafafa'" @mouseleave="hover='#fdfdfd'">
    <div class="NumberBox">
      <div class="Number" contenteditable="true" @input="handleInput">{{ num }}</div>
      <div class="suffix">{{ suffix }}</div>
    </div>
    <div class="control">
      <div class="change" @click="changeNum(1)" ref="add">+</div>
      <div class="change" @click="changeNum(-1)" ref="sub">-</div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
const add = ref(null);
const sub = ref(null);

const props = defineProps({
  num: {
    default: 25,
    type: Number
  },
  min: {
    default: 0,
    type: Number,
  },
  max: {
    default: 1000000000,
    type: Number
  },
  suffix: {
    default: '',
    type: String
  },
  step: {
    default: 1,
    type: Number
  }
});

const emit = defineEmits(['update:num'])

function changeNum(sign) {
  let t = props.num + sign * props.step;
  if (t > props.max) {
    t = props.max;
    add.value.classList.add('shake');
    setTimeout(()=>{ add.value.classList.remove('shake') }, 800)
  }
  if (t < props.min) {
    t = props.min;
    sub.value.classList.add('shake');
    setTimeout(()=>{ sub.value.classList.remove('shake') }, 800)
  }
  emit('update:num', t);
}

const hover = ref('#fdfdfd');

function handleInput(event) {
  const value = event.target.innerText;
  if (value.length === 0) {
    emit('update:num', 0);
  } else if (isNaN(parseInt(value))) {
    event.target.innerText.slice(value.length - 1, 1);
  } else {

    emit('update:num', Math.min(props.max, Math.max(props.min, parseInt(value))));
  }
}

</script>

<style scoped lang="scss">
.container {
  display: flex;
  width: 240px;
  height: 130px;
  text-align: center;
  border: 1px solid #ded6d6;
  border-bottom: 2px solid #000;
  border-radius: 15px 15px 5px 5px;

  .NumberBox {
    width: 170px;
    height: 100%;
    border-right: 1px solid #ded6d6;

    .Number {
      height: 100px;
      font-size: 50px;
      font-weight: bold;
      line-height: 110px;
    }

    .suffix {
      height: 30px;
      font-size: 15px;
      color: gray;
    }
  }

  .control {
    width: 70px;
    height: 100%;

    .change {
      height: 50%;
      line-height: 65px;
      font-size: 32px;

      &:first-child {
        border-bottom: 1px solid #ded6d6;
      }

      &:hover {
        background: #f0f0f0;
      }
    }

  }
}

.shake {
  animation: shake 800ms ease-in-out;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(+2px, 0, 0); }
  30%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(+4px, 0, 0); }
  50% { transform: translate3d(-4px, 0, 0); }
}

</style>
