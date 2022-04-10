<template>
  <div class="welcome" v-if="!$oidc.isAuthenticated">
    <div>lksjgkgkldsgkds</div>
    <button @click="Login">Login</button>
  </div>
   <div class="loadingPage" v-else-if="!isLoading">
        Loading...
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import loadData from "src/services/bootstrap";
import { mapState } from 'pinia'
import { useMainStore } from 'src/stores/Main'

export default defineComponent({

  computed: {
   ...mapState(useMainStore, ["isReady"]),
    isLoading(): boolean {
      return this.isReady;
    },
  },
    methods:{
      Login(){
        this.$oidc.signIn()
      }
    },
    async mounted() {
        if (this.$oidc.isAuthenticated) {
           await loadData(this.$oidc.userProfile.name as string);
        }
    },
    watch:{
      isLoading(){
        if(this.isLoading){
          this.$router.push({name: 'Start'})
        }
      }
    },

})
</script>

<style scoped>
.loadingPage{

    height: 100vh;
    background-image: linear-gradient(to right, #141e30, #243b55);

}
</style>
