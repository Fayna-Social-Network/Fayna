<template>
<li
    class="replies"
    >
        <div class="media">
            <div class="profile"></div>
            <div class="media-body">
                <div class="contact-name">
                </div>
                <div class="msg-box">
                    <div class="msg-text "><p class="typing">{{$t('Typing')}}...</p></div>
                </div>
            </div>

        </div>
    </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "pinia";
import { v4 as uuid } from 'uuid';
import { useMainStore } from "stores/Main";

export default defineComponent({
  methods:{
    ...mapActions(useMainStore, ['setMessageTrigger'])
  },
    maunted(){
        setTimeout(() => {
          this.setMessageTrigger(uuid())
        }, 500);
    }
})
</script>

<style scoped>

li {
    width: 100%;
    display: list-item;
    text-align: -webkit-match-parent;
}



.msg-box {
    position: relative;
    border-radius: 0 25px 25px 30px;
    color: var(--correspondence-message-income-text);
    background-color:var(--correspondence-message-income-bg);
    margin-top: 10px;
    cursor: pointer;
}

    .replies{
        margin-left: auto;
        text-align: left;
    }

    .media{
        position: relative;
        display: flex;
        align-items: flex-start;
        /* flex-direction: row-reverse; */
    }

.msg-text{
    padding: 16px 20px;

    font-family: "Montserrat",sans-serif;
    font-size: calc(13px + (14 - 13) * ((100vw - 320px) / (1920 - 320)));
    font-weight: 600;
}


.typing {
  border-right: solid 3px rgba(0,255,0,.75);
  white-space: nowrap;
  overflow: hidden;
  font-size: 16px;
  color: rgba(255,255,255,.70);
}

/* Animation */
.typing {
  animation: animated-text 1s steps(29,end) 1s 1 normal both,
             animated-cursor 600ms steps(29,end) infinite;
}

/* text animation */

@keyframes animated-text{
  from{width: 0;}
  to{width: 100px;}
}

/* cursor animations */

@keyframes animated-cursor{
  from{border-right-color: rgba(0,255,0,.75);}
  to{border-right-color: transparent;}
}
</style>