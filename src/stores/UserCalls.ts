import { defineStore } from "pinia";

export type CallType = 'video' | 'audio' | null
export type Answer = 'answer' | 'noAnswer' | null

interface ICallStore {
  typeCall: CallType,
  IncomeCall: boolean,
  SignalData: string | null
  UserAnswer: Answer
  AnswerSignal: string | null
}

export const useUserCallsStore = defineStore("userCallsStore", {

  state: () : ICallStore => ({
    typeCall: null,
    IncomeCall: false,
    SignalData: null,
    UserAnswer: null,
    AnswerSignal: null
  }),

  getters: {

    getCallSettings: function(state) {
      return {typeCall: state.typeCall, IncomeCall: state.IncomeCall, SignalData: state.SignalData}
    }

  },

  actions: {

    resetCallSettings: function(){
      this.typeCall = null,
      this.IncomeCall = false
    },

    setCallSettigs: function(type: CallType,  SignalData: string | null): void {
      this.typeCall = type
      this.SignalData = SignalData
    },

    setCallType: function(type: CallType) {
      this.typeCall = type
    },

    setCallAnswer: function(answer: Answer, signal: string | null): void {
      this.UserAnswer = answer
      this.AnswerSignal = signal
    },

    setIncomeCall: function(income: boolean) {
      this.IncomeCall = income
    }
  }

})