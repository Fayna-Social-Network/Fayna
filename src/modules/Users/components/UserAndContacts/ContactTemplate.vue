<template>
<div class="contact-box">
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
.contact-box{
  display: flex;
  cursor: pointer;
  position: relative;
  padding-left: 10px;
  width: 100%;
}
.details{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile{
  margin-right: 10px;
}
</style>