<template>
    <div class="messenger">
        <div class="mesgcircle">
                <div class="mesgload">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "pinia";
import { useMainStore } from "stores/Main";

export default defineComponent({
    methods:{
      ...mapActions(useMainStore, ['setTyping'])
    },
    created(){
        setTimeout(() => {
        this.setTyping(null)
     }, 3000);
    }
})
</script>



<style scoped lang="scss">
.mesgcircle {
  margin: 2px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: $primary;
  float: left;
  position: relative;
}

        .mesgcircle:after {
        left: -3px;
        content: '';
        border-top: 16px solid $primary;
        border-left: 6px solid transparent;
        border-right: 10px solid transparent;
        display: block;
        width: 0px;
        height: 0;
        transform: rotate(40deg);
        position: absolute;
        top: 19px;
        border-radius: 5px;
        }

        .mesgload {

            text-align: center;

        }

        .mesgload span {
            width: 4px;
            height: 4px;
            background-color: white;
            border-radius: 50%;
            display: inline-block;
            margin: 0px 1px 0;
            animation-name: dotone;
            animation-duration: 1.8s;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
        }

        .mesgload span:nth-child(2) {
            animation-delay: .30s;
        }

        .mesgload span:nth-child(3) {
            animation-delay: .61s;
        }

        @keyframes dotone {
            25% {
                transform: translateY(-3px)
            }

            65% {
                transform: translateY(1px)
            }

            80% {
                transform: translateY(0px)
            }
        }


</style>