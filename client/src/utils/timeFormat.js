import moment from "moment"

export function timeFormat(time, formatType) {
  return moment(time).format(formatType)
}

export function fromNowFormat(time) {
  return moment(time).fromNow()
}
