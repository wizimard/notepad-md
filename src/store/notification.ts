import { defineStore } from 'pinia'
import { reactive } from 'vue'

type NotificationType = {
  id: string
  type: 'error' | 'message'
  content: string
}

const useNotificationStore = defineStore('notification', () => {
  const notifications = reactive<NotificationType[]>([])

  const addNotification = (type: 'error' | 'message', content: string) => {
    notifications.push({
      id: Math.random().toString(16).slice(2),
      type,
      content
    })
  }
  const deleteNotification = (id: string) => {
    const index = notifications.map((notification) => notification.id).indexOf(id)

    notifications.splice(index, 1)
  }

  return {
    notifications,
    addNotification,
    deleteNotification
  }
})

export default useNotificationStore
