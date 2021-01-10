import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    // const $root = document.createElement('div')
    // $root.classList.add('excel')
    this.components = this.components.map(Component => {
      // const $el = document.createElement('div')
      // $el.classList.add(Component.className)
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      // DEBUG
      // if (component.name) {
      //   window['c' + component.name] = component
      // }
      // $el.innerHTML = component.toHTML()
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
    // $root.textContent = 'test'
    // $root.style.fontSize = '5rem'
    return $root
  }

  render() {
    // console.log(this.$el)
    // this.$el.insertAdjacentHTML('afterbegin', `<h1>test<h1/>>`)
    // const node = document.createElement('h1')
    // node.textContent = 'TEST'
    this.$el.append(this.getRoot())
    this.components.forEach(component => component.init())
  }
}
