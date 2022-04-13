import moment from "moment"


export  function timeFilter(date: string){
   return moment(date).format("HH:mm")
}

export function dateFilter(date: string){
  return moment(date).format("D.MM.yyyy")
}

export function dateTimeFilter(date: string){
  return moment(date).format("D.MM.yyyy HH:mm")
}