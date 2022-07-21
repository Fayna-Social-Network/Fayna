<template>
  <div class="welcome" v-if="!$oidc.isAuthenticated">
    <header class="header">
      <div class="container">
        <div class="header__wrapper">
          <div class="header__block">
            <a href="#" class="header__logo">
              <img :src="Logo" alt="">
            </a>
          </div>
          <nav class="nav">
            <a href="#" class="nav__link">Home</a>
            <a href="#" class="nav__link">How it work</a>
            <a href="#" class="nav__link">Friends</a>
            <a href="#" class="nav__link">Contact us</a>
          </nav>
          <div class="header__block">
            <div class="header__btn">
              <button class="header-btn">Donate</button>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section class="intro">

    </section>
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
import HeaderBg from '../assets/image/welcome/Mask group.svg'
import Logo from '../assets/image/logo-icon.png'

export default defineComponent({
  data: () => ({
    HeaderBg, Logo
  }),
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
        this.$
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

.welcome {
  background-image: url('../assets/image/welcome/Mask group.svg');
  background-repeat: no-repeat;
  background-size: cover;
}

.container {
  width: 1200px;
  margin: 0 auto;
}

.header {
  z-index: 20;
}
.header__wrapper{
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav {
 display: flex;
}

.header__block {
  width: 20%;
}

.header__block:last-child {
  text-align: right;
}

.nav__link {
  margin-right: 35px;
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 600;
}

.nav__link:last-child {
  margin-right: 0;
}



</style>
