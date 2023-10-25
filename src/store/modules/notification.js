const useNotificationStore = defineStore(
  // 唯一ID
  'notification',
  {
    state: () => ({
      // 消息
      message: 0,
      // 待办
      todo: 0
    }),
    getters: {
      // 未读通知总数
      total() {
        return this.message + this.todo
      }
    },
    actions: {
      // 初始化，获取所有通知的未读数量
      init() {
        this.getUnreadMessage()
        this.getUnreadTodo()
      },
      // 获取未读消息数
      getUnreadMessage() {
        // 为方便演示，这里直接写死的未读数
        this.message = 9
      },
      // 获取未读待办数
      getUnreadTodo() {
        // 为方便演示，这里直接写死的未读数
        this.todo = 0
      }
    }
  }
)

export default useNotificationStore
