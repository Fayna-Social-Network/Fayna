<template>
<div class="presentation-page">
    <q-img
      :src="logo"
      spinner-color="white"
      style="width: 200px;"
    />
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "pinia";
import { useUserMessagesStore } from "stores/UserMessages";
import logo from 'src/assets/image/logo.png'

export default defineComponent ({
  data: () => ({
    logo
  }),
  methods:{
    ...mapActions(useUserMessagesStore, ['setCurrentCorrespondenceId'])
  },

  mounted(){
    this.setCurrentCorrespondenceId(null)
  }
})

</script>

<style>
.presentation-page{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(to right, #141e30, #243b55);
}
</style>