import moment from "moment"


export  function timeFilter(date){
   return moment(date).format("HH:mm")
}

export function dateFilter(date){
  return moment(date).format("D.MM.yyyy")
}

export function dateTimeFilter(date){
  return moment(date).format("D.MM.yyyy HH:mm")
}