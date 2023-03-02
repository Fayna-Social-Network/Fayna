<template>
  <transition appear enter-active-class="animated pulse">

    <div class="reactions" v-if="reactions.length > 0" :class="{ 'recip': message.seller != user?.id }">
      <span v-for="reaction in reactions" :key="reaction.id">{{ reaction.reactionName }}</span>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IReaction } from "src/modules/Message/types/Reaction";
import Reaction from 'src/modules/Message/services/messages/reactions.service'
import { mapState } from "pinia";
import { useMainStore } from "stores/Main";
import { IMessage } from "src/modules/Chat/types/message";
import { useUserStore } from "src/stores/User";

export default defineComponent({
  props: {
    message: {
      required: true,
      type: Object as PropType<IMessage>
    }
  },
  data: () => ({
    reactions: Array<IReaction>()
  }),
  computed: {
    ...mapState(useMainStore, ['reaction']),
    ...mapState(useUserStore, ['user']),

    onReaction() {
      return this.reaction
    }
  },
  watch: {
    onReaction(r) {
      if (r.messageId === this.message.id) {
        this.reactions.push(r)
      }
    }
  },
  async mounted() {
    const reaction = await Reaction.Get(this.message.id)
    this.reactions = reaction.data.reactions
  }
})
</script>

<style scoped>
.reactions {
  position: absolute;
  bottom: -23px;
  right: 2px;
  padding: 3px 5px 2px 5px;
  background: grey;
  border: solid 1px wheat;
  border-radius: 10px;
}

.recip {
  right: 2px;
}
</style>