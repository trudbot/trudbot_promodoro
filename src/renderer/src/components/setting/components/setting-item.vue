<template>
  <div class="setting-item">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <div class="content">
      <div class="title"><slot name="title"></slot></div>
      <div class="explain"><slot name="explain"></slot></div>
    </div>
    <div class="control">
      <slot name="control"></slot>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
.setting-item {
  display: flex;
  height: 60px;
  border: 1px solid #eaeaea;
  border-radius: 10px;

  &:hover {
    background: #fafafa;
  }

  .icon {
    width: 10%;
    margin-left: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    width: 60%;

    .title {
      text-align: start;
      margin: 8px;
      font-size: 20px;
      font-weight: bold;
    }

    .explain {
      font-size: 12px;
      color: #7a7979;
      text-align: start;
      margin-left: 8px;
    }
  }

  .control {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: #f3f3f3;
    }
  }
}
</style>