<template>
  <div class="group-container">
    <q-tabs
        v-model="tab"
        indicator-color="primary"
        class="text-primary"
      >
        <q-tab name="allGroups" icon="groups">
          <q-tooltip>
           {{$t('AllGroups')}}
          </q-tooltip>
        </q-tab>
        <q-tab name="addGroups" icon="group">
          <q-tooltip>
            {{$t('addGroups')}}
          </q-tooltip>
        </q-tab>
        <q-tab name="myGroups" icon="group_add">
          <q-tooltip>
           {{$t('MyGroups')}}
          </q-tooltip>
        </q-tab>
      </q-tabs>
      <div class="groups-list">

      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent ({
  data: () => ({
    tab: 'addGroups'
  })
})
</script>

<style scoped>
.group-container {
  padding: 0px 5px 0px 5px;
}


</style>