export function formatEditedTime(date: Date) {
  const getDateInfo = (data) => {
    return data.toString().padStart(2, '0')
  }
  return `${date.getFullYear()}-${getDateInfo(date.getMonth() + 1)}-${getDateInfo(date.getDate())} ${getDateInfo(date.getHours())}:${getDateInfo(date.getMinutes())}:${getDateInfo(date.getSeconds())}`
}
