import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { Foo, Bar } from '@my/lib'

const foo = new Foo()
const bar = new Bar()

console.log(foo.x)
console.log(bar.y)

createApp(App).mount('#app')
