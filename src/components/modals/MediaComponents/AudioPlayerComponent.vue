<template>
    <audio ref="audioPlayer" :src="path"
    @timeupdate="onPlaying"
    ></audio>
    <div class="player">
        <div class="controls">
            <div class="play">
                <span v-if="!playing" @click="play" class="material-icons-outlined">play_arrow</span>
                <span v-else @click="pause" class="material-icons-outlined">pause</span>
            </div>  
            <div class="seek">
                <input type="range"
                min="0"
                max="100"
                step="1"
                v-model="seekValue"
                @change="onSeek"                
                >
            </div>         
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: ['path'],
    data: () =>({
        seekValue: 0,
        currentTime: 0,
        playing: false  
    }),
    methods:{
        play() {
            this.$refs.audioPlayer.play();
            this.playing = true
        },
        pause() {
            this.$refs.audioPlayer.pause();
            this.playing = false
        },
        stop() {
            const { audioPlayer }  = this.$refs;
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
        },
        setSpeed(speed) {
            this.$refs.audioPlayer.playbackRate = speed;
        },
        onPlaying() {
            const { audioPlayer } = this.$refs;
            if (!audioPlayer) {
                return;
            }
            if(audioPlayer.currentTime == audioPlayer.duration){
                this.playing = false
            }
            this.currentTime = audioPlayer.currentTime;
            this.seekValue = (audioPlayer.currentTime / audioPlayer.duration) * 100;
         },
         onSeek() {
            const { audioPlayer } = this.$refs;
            const seekto = audioPlayer.duration * (this.seekValue / 100);
            audioPlayer.currentTime = seekto;
         },
    },


})
</script>

<style scoped>
.controls{
    display: flex;
    justify-content: center;
    
}
.player{
    padding: 20px;
}

.play{
    padding-right: 10px;
    transition: all 0.3s ease;
}

.play:hover{
    transform: scale(1.1);
}


input[type="range"] { 
    margin: auto;
    -webkit-appearance: none;
    position: relative;
    overflow: hidden;
    height: 10px;
    width: 200px;
    cursor: pointer;
    border-radius: 0; /* iOS */
}

::-webkit-slider-runnable-track {
    background: #ddd;
}

/*
 * 1. Set to 0 width and remove border for a slider without a thumb
 */
::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px; /* 1 */
    height: 40px;
    background: #fff;
    box-shadow: -100vw 0 0 100vw dodgerblue;
    border: 2px solid #999; /* 1 */
}

::-moz-range-track {
    height: 40px;
    background: #ddd;
}

::-moz-range-thumb {
    background: #fff;
    height: 40px;
    width: 20px;
    border: 3px solid #999;
    border-radius: 0 !important;
    box-shadow: -100vw 0 0 100vw dodgerblue;
    box-sizing: border-box;
}

::-ms-fill-lower { 
    background: dodgerblue;
}

::-ms-thumb { 
    background: #fff;
    border: 2px solid #999;
    height: 40px;
    width: 20px;
    box-sizing: border-box;
}

::-ms-ticks-after { 
    display: none; 
}

::-ms-ticks-before { 
    display: none; 
}

::-ms-track { 
    background: #ddd;
    color: transparent;
    height: 40px;
    border: none;
}

::-ms-tooltip { 
    display: none;
}

</style>