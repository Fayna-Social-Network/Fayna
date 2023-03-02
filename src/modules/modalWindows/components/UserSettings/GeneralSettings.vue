<template>
  <q-select filled v-model="locale" :options="options" :label="$t('ChooseLanguage')" />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { locales } from 'src/i18n/localeList'

interface ILocale {
  label: string
  value: string
}

interface IGeneralSettingsData {
  locale: ILocale | null
  options: Array<ILocale>
}

export default defineComponent({
  data:(): IGeneralSettingsData => ({
    locale: null,
    options: locales
  }),
  mounted(){
    this.options.forEach(option => {
      if(option.value === this.$i18n.locale){
        this.locale = option
      }
    })
  },
  watch:{
    locale(){
      if(this.locale){
        this.$i18n.locale = this.locale.value
        localStorage.setItem('locale', this.locale.value)
      }
    }
  }
})
</script>