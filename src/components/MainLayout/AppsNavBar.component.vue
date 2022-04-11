<template>
  <div class="apps">
    <div class="apps-header">
      <div class="logo">
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
      </div>
      <div class="text">Apps</div>
    </div>
  </div>
</template>


<style scoped>
.apps{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.apps-header{
  padding: 15px 0px 15px 0px;
  border-bottom: solid 1px  var(--border-navs);
}
.logo{
  display: flex;
  align-items: center;
  justify-content: center;
}
.text{
  color: var(--text-color)
}
 svg{
   stroke: #1c9dea;
 } 
</style>