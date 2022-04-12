<template>
  <q-menu :offset="[-10, 30]"
    transition-show="flip-right"
    transition-hide="flip-left"
  >
    <q-card>
      <q-tabs
        v-model="tab"
        class="bg-teal text-yellow shadow-2"
      >
        <q-tab name="stickers" icon="gif_box" />
        <q-tab name="emoji" icon="emoji_emotions" />
      </q-tabs>
      <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="stickers">
            <Stickers @stickerClickHandle="stickerClickHandle"/>
          </q-tab-panel>

          <q-tab-panel name="emoji">
            <VuemojiPicker :pickerStyle="emojiStyle" @emojiClick="handleEmojiClick"/>
          </q-tab-panel>

        </q-tab-panels>
    </q-card>
  </q-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Stickers from './StikersComponent.vue'
import { VuemojiPicker, EmojiClickEventDetail, VuemojiPickerStyle } from 'vuemoji-picker'

interface StikersData{
  emojiStyle: VuemojiPickerStyle,
  tab: any
}

export default defineComponent({
    data:(): StikersData => ({
        emojiStyle: {
          background: 'var(--stickers-box-bg)',
          borderColor: 'var(--stickers-box-bg)',
          inputFontColor: 'var(--text-color)'
        },
        tab: 'stickers'
    }),
    methods:{
        stickerClickHandle(mess : string){
            this.$emit('onSelectSticker', mess)
        },
        handleEmojiClick(emoji: EmojiClickEventDetail){
            this.$emit('selectEmoji', emoji.unicode)
        }
    },
 components:{
     Stickers,
     VuemojiPicker,
 }
})
</script>


<style scoped>
.window{
    position: absolute;
    top: -480px;
    left: 20px;
    width: 370px;
    /* height: 350px; */
    z-index: 666;
    background: var(--stickers-box-bg);
    padding: 10px;
    border-radius: 10px;
}
.window::before{
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 12px solid var(--stickers-box-bg);
    bottom: -12px;
    left: 78px;
    z-index: 1;
}
.content{
    height: 400px;
    overflow-y: auto;
}

.scroll{
  overflow: hidden;
}

</style>