import './index.css'
import './style.less'
import { times } from './test'
const root = document.getElementById('root')
root.innerHTML = `
    <p class="box">hello</p>
`

const test = (a, b) => {
    
    return a + b
}

class A {
    constructor(a) {
        this.a = a
    }
}

console.log(times(1,4))
