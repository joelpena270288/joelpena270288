import hello from 'hellojs'

export default ({ Vue }) => {
  hello.init({
    facebook: '1708367656034485'
  })
  Vue.prototype.$hello = hello
}