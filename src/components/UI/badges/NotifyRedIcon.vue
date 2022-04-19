<template>
  <div class="notify-icon"></div>
</template>

<style scoped lang="scss">
.notify-icon {
  position: absolute;
  top: 23px;
  left: 30px;
  width:10px;
  height:10px;
  border-radius: 50%;
  background: red;
  box-shadow: 0 0 0 0 $negative;
  animation:pl2 1.5s infinite linear;

}
.notify-icon:before,
.notify-icon:after {
  content:"";
  position: absolute;
  inset:0;
  border-radius: inherit;
  // box-shadow: 0 0 0 0 rgb(141, 2, 2);
  animation: inherit;
  animation-delay: -0.5s;
}
.notify-icon:after {
  animation-delay: -1s;
}
@keyframes pl2 {
    100% {box-shadow: 0 0 0 10px #0000}
}
</style>