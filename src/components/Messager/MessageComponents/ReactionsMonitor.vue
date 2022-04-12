<template>
 <transition appear enter-active-class="animate__animated animate__pulse" leave-active-class="animate__animated animate__pulse" mode="out-in">

<div class="reactions" v-if="reactions.length > 0">
    <span v-for="reaction in reactions"
    :key="reaction.id"
    >{{reaction.reactionName}}</span>
</div>
</transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IReaction } from "src/types/Reaction";
import Reaction from 'src/services/messages/reactions.service'
import { mapState } from "pinia";
import { useMainStore } from "stores/Main";
import { IMessage } from "src/types/message";

export default defineComponent({
   props: {
     message:{
       required: true,
       type: Object as PropType<IMessage>
     }
   },
   data:() => ({
       reactions: Array<IReaction>()
   }),
   computed:{
     ...mapState(useMainStore, ['reaction']),

       onReaction(){
           return this.reaction
       }
   },
   watch:{
       onReaction(r){
          if(r.messageId === this.message.id){
              this.reactions.push(r)
          }
       }
   },
  async mounted(){
      const reaction = await Reaction.Get(this.message.id)
      this.reactions = reaction.data.reactions
   }
})
</script>

<style scoped>
.reactions{
    position: absolute;
    top: -9px;
    left: 0;
    padding: 0 5px 0 5px;
    background: grey;
    border: solid 1px wheat;
    border-radius: 10px;
}
</style>