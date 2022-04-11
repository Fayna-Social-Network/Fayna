<template>
  <div class="welcome" v-if="!$oidc.isAuthenticated">
    <div>lksjgkgkldsgkds</div>
    <button @click="Login">Login</button>
  </div>
   <div class="loadingPage" v-else-if="!isLoading">
    <Loader />
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import loadData from "src/services/bootstrap";
import { mapState } from 'pinia'
import { useMainStore } from 'src/stores/Main'
import Loader from 'src/components/UI/Loader.vue'

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
    components:{
      Loader
    }

})
</script>

<style scoped>
.loadingPage{
  height: 100vh;
  background: linear-gradient(to right, #004ff9, #fff94c);
}
</style>
