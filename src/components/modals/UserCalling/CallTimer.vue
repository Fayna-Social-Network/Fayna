<template>
  <div>
    <p>{{secondsInMinutes(time)}}</p>
  </div>
</template>

<script lang="ts">
import moment from "moment";
import { defineComponent } from 'vue'

interface ICallTimerData {
  time: number
  timer: NodeJS.Timeout | null
}

export default defineComponent({
  name: "stopwatch",
  props: {
    running: {
      type: Boolean,
      default: false
    },
    resetWhenStart: {
      type: Boolean,
      default: false
    },
    restWhenStop: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    running: function(newVal, oldVal) {
      if (newVal) this.startT();
      else this.stopT();
    }
  },
  mounted() {
    if (this.running) this.startT();
  },
  data: (): ICallTimerData => ({
    time: 0,
    timer: null
  }),
  methods: {
    stopT: function() {
      clearInterval(this.timer!);
      if (this.restWhenStop) this.resetT();
    },
    startT: function() {
      if (this.resetWhenStart) this.resetT();
      this.timer = setInterval(() => {
        this.time++;
      }, 1000);
    },
    resetT: function() {
      this.time = 0;
    }
  },
  computed:{
    secondsInMinutes(){
      return seconds => moment("2015-01-01")
        .startOf("day")
        .seconds(seconds)
        .format("HH:mm:ss")
    }
  },
});
</script>

<style scoped>
p {
  font-weight: bold;
  font-size: 16px;
}
</style>