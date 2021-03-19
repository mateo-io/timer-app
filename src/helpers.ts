import { addHours, getMinutes, getHours, getSeconds } from "date-fns"

export const convertToDuration = (secondsAmount: number) => {
  const normalizeTime = (time: string): string =>
    time.length === 1 ? `0${time}` : time

  const SECONDS_TO_MILLISECONDS_COEFF = 1000
  const MINUTES_IN_HOUR = 60

  const milliseconds = secondsAmount * SECONDS_TO_MILLISECONDS_COEFF

  const date = new Date(milliseconds)
  const timezoneDiff = date.getTimezoneOffset() / MINUTES_IN_HOUR
  const dateWithoutTimezoneDiff = addHours(date, timezoneDiff)

  const hours = normalizeTime(String(getHours(dateWithoutTimezoneDiff)))
  const minutes = normalizeTime(String(getMinutes(dateWithoutTimezoneDiff)))
  const seconds = normalizeTime(String(getSeconds(dateWithoutTimezoneDiff)))

  return `${hours}:${minutes}:${seconds}`
}

export const formatInputString = (inputString: string) => {
  let [hours, minutes, seconds] = inputString.split(":")

  if (seconds.length === 1) {
    seconds = `0${seconds}`
  } else if (seconds.length === 3) {
    const overflowElement = seconds[0]
    seconds = seconds.slice(1)
    minutes += overflowElement
  }

  if (minutes.length === 1) {
    minutes = `0${minutes}`
  } else if (minutes.length === 3) {
    const overflowElement = minutes[0]
    minutes = minutes.slice(1)
    hours += overflowElement
  }

  if (hours.length === 1) {
    hours = `0${hours}`
  } else if (hours.length === 3) {
    hours = hours.slice(1)
  }

  return `${hours}:${minutes}:${seconds}`
}
