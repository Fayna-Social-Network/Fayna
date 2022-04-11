<template>
<div class="chat-box">
    <div class="profile">
       <slot name="profile">
       </slot>
    </div>
    <div class="details">
        <slot name="details">
        </slot>
    </div>
    <slot name="content">
    </slot>
</div>
</template>





<style scoped>
.chat-box{
  display: flex;
  margin: 10px 0px 0 0;
  cursor: pointer;
  position: relative;
}
.details{
  color: var(--text-color);
  display: flex;
    flex-direction: column;
    justify-content: center;
}

.profile{
 overflow: hidden;
 
  width: 60px;
  height: 60px;
  border-radius: 20px;
  margin-right: 8px;
}



</style>