// main.js中
// ...
// import EventBus from './eventBus.js'
// Vue.use(EnemtBus)
// ...

// created () {
//     let text = Array(1000000).fill('xxx').join(',')
//     this.$eventBus.$on('home-on', (...args) => {
//       console.log('home $on====>>>', ...args)
//       this.text = text
//     }, this) // 注意第三个参数需要传当前组件的this，如果不传则需要手动销毁
//   },
//   mounted () {
//     setTimeout(() => {
//       this.$eventBus.$emit('home-on', '这是home $emit参数', 'ee')
//     }, 1000)
//   },
//   beforeDestroy () {
//     // 这里就不需要手动的off销毁eventBus订阅的事件了
//   }

// see detail:  https://github.com/yurizhang/dynamic-vue-bus

const handleSymbol = Symbol("handleSymbol");
const eventsMap = Symbol("eventsMap");
class EventBus {
  constructor(vue) {
    if (!this[handleSymbol]) {
      Object.defineProperty(this, handleSymbol, {
        value: {},
        enumerable: false
      });
    }
    this.Vue = vue;
    this[eventsMap] = {};
  }
  mapEventsToUid(uid, eventName) {
    this[eventsMap][uid] = this[eventsMap][uid] || [];
    this[eventsMap][uid].push(eventName);
  }
  $on(eventName, callback, vm) {
    this[handleSymbol][eventName] = this[handleSymbol][eventName] || [];
    this[handleSymbol][eventName].push(callback);
    if (vm instanceof this.Vue) this.mapEventsToUid(vm._uid, eventName);
  }
  $emit(...args) {
    const [eventName, ...params] = args;
    const eventHandlers = this[handleSymbol][eventName] || [];
    eventHandlers.forEach(fn => {
      fn(...params);
    });
  }
  $offByUid(uid) {
    let currentEvents = this[eventsMap][uid] || [];
    currentEvents.forEach(event => {
      this.$off(event);
    });
    delete this[eventsMap][uid];
  }
  $off(eventName) {
    delete this[handleSymbol][eventName];
  }
}
let $EventBus = {};

// eslint-disable-next-line no-unused-vars
$EventBus.install = (Vue, option) => {
  Vue.prototype.$eventBus = new EventBus(Vue);
  Vue.mixin({
    beforeDestroy() {
      this.$eventBus.$offByUid(this._uid);
    }
  });
};

export default $EventBus;

// import Vue from 'vue';
//
// const Bus = new Vue();
// export default Bus;
