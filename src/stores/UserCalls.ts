import { defineStore } from "pinia";

export type CallType = 'video' | 'audio' | null
export type Answer = 'answer' | 'noAnswer' | null

interface ICallStore {
  typeCall: CallType,
  IncomeCall: boolean
}

export const useUserCallsStore = defineStore("userCallsStore", {

  state: () : ICallStore => ({
    typeCall: null,
    IncomeCall: false,
  }),

  getters: {

    getCallSettings: function(state) {
      return {typeCall: state.typeCall, IncomeCall: state.IncomeCall}
    }

  },

  actions: {

    resetCallSettings: function(){
      this.typeCall = null,
      this.IncomeCall = false
    },

    setCallSettigs: function(type: CallType,  income: boolean): void {
      this.typeCall = type
      this.IncomeCall = income
    },

    setCallType: function(type: CallType) {
      this.typeCall = type
    },

    setIncomeCall: function(income: boolean) {
      this.IncomeCall = income
    }
  }

})