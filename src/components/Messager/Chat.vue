<template>
   <div class="chat">
    <div class="chat-content">
      <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        stamp="7 minutes ago"
        sent
        text-color="white"
        bg-color="primary"
      >
        <div>
          Hey there!
        </div>

        <div>
          Have you seen Quasar?
          <img src="https://cdn.quasar.dev/img/discord-omq.png" class="my-emoticon" style="width: 100px;">
        </div>
      </q-chat-message>

      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        bg-color="amber"
      >
        <q-spinner-dots size="2rem" />
      </q-chat-message>

       <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        stamp="7 minutes ago"
        sent
        text-color="white"
        bg-color="primary"
      >
        <div>
          Hey there!
        </div>

        <div>
          Have you seen Quasar?
          <img src="https://cdn.quasar.dev/img/discord-omq.png" class="my-emoticon" style="width: 100px;">
        </div>
      </q-chat-message>


    <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        stamp="7 minutes ago"
        sent
        text-color="white"
        bg-color="primary"
      >
        <div>
          Hey there!
        </div>

        <div>
          Have you seen Quasar?
          <img src="https://cdn.quasar.dev/img/discord-omq.png" class="my-emoticon" style="width: 100px;">
        </div>
      </q-chat-message>
    <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        stamp="7 minutes ago"
        sent
        text-color="white"
        bg-color="primary"
      >
        <div>
          Hey there!
        </div>

        <div>
          Have you seen Quasar?
          <img src="https://cdn.quasar.dev/img/discord-omq.png" class="my-emoticon" style="width: 100px;">
        </div>
      </q-chat-message>
    </div>
  </div>
</template>



<style scoped>
.chat{
  height: 75vh;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  position: relative;
}
.chat-content{
  display: flex;
  flex-direction: column;
  padding: 0px 30px 0 30px;
  overflow-y: auto;
}

@media screen and (max-width: 500px){
  .chat-content{
     padding: 0px 10px 0 10px;
  }
}
</style>