<template>
  <DialogModal>
    <template #header-text>
      {{$t('Settings')}}
    </template>
    <template #body>
      <div style="min-width: 300px">
        <q-tabs
        v-model="tab"
        inline-label
        class="bg-orange text-white shadow-2"
        >
          <q-tab name="user" icon="manage_accounts" :label="$t('User')" />
          <q-tab name="general" icon="settings" :label="$t('General')" />
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
        >
          <q-tab-panel name="user">
            <UserProfileSettings />
          </q-tab-panel>
          <q-tab-panel name="general">
            <GeneralSettings />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </template>
    <template #actions>
      <q-btn color="negative" :label="$t('Cancel')"
        @click="closeHandle"
      />
    </template>
  </DialogModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DialogModal from 'src/modules/modalWindows/components/DialogModalTemplate.vue'
import { Close } from "src/modules/modalWindows/services";
import UserProfileSettings from './UserSettings/UserProfileSettings.vue'
import GeneralSettings from './UserSettings/GeneralSettings.vue'

export default defineComponent({
  data:() => ({
    tab: 'user'
  }),
  methods:{
    closeHandle(){
      Close()
    }
  },
  components: {
    DialogModal,
    UserProfileSettings,
    GeneralSettings
  }
})
</script>