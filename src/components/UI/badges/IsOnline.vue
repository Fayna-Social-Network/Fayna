<template>
  <div class="isonline"></div>
</template>

<style scoped lang="scss">
.isonline{
  position: absolute;
  width: 15px;
  height: 15px;
  top: -3px;
  left: -3px;
  border-radius: 100%;
  background: $positive;
  box-shadow: 0 0 0 0 $positive;
  animation: pl1 1s infinite;
}

@keyframes pl1 {
    100% {box-shadow: 0 0 0 10px #0000}
}
</style>