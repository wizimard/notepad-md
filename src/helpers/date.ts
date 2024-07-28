export function formatEditedTime(date: Date) {
  const getDateInfo = (data) => {
    return data.toString().padStart(2, '0')
  }

  const processCompressDate = (): string => {
    const now = new Date()

    const getCompressDate = (method, text) => {
      const diffrence = now[method]() - date[method]()
      return diffrence + ' ' + (diffrence > 1 ? `${text}s` : text) + ' ago'
    }

    if (now.getFullYear() - date.getFullYear() > 0) return getCompressDate('getFullYear', 'year')
    if (now.getMonth() - date.getMonth() > 0) return getCompressDate('getMonth', 'month')
    if (now.getDate() - date.getDate() > 0) return getCompressDate('getDate', 'day')
    if (now.getHours() - date.getHours() > 0) return getCompressDate('getHours', 'hour')
    if (now.getMinutes() - date.getMinutes() > 0) return getCompressDate('getMinutes', 'minute')

    return 'recently'
  }

  const fullDateTime = `at ${date.getFullYear()}-${getDateInfo(date.getMonth() + 1)}-${getDateInfo(date.getDate())} ${getDateInfo(date.getHours())}:${getDateInfo(date.getMinutes())}:${getDateInfo(date.getSeconds())}`

  const compressDate: string = processCompressDate()

  return {
    fullDate: fullDateTime,
    compressDate
  }
}
