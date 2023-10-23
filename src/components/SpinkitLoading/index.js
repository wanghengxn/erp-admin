import Component from './index.vue'

let instance
let mountNode

function loadingShow(options) {
  instance = createApp(Component, options)
  mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  instance.mount(mountNode)
}

function loadingHide() {
  instance.unmount(mountNode)
  document.body.removeChild(mountNode)
}

export {
  loadingShow,
  loadingHide
}
