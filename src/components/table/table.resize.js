import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  // const $parent = $resizer.$el.parentNode // bad!
  // eslint-disable-next-line max-len
  // const $parent = $resizer.$el.closest('.column') // получаем ближайшего родителя по условию // better but bad
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.$el.dataset.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
  })

  document.onmousemove = e => {
    console.log('onmousemove')
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({right: -delta +'px'})
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({bottom: -delta +'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if (type === 'col') {
      $parent.css({width: `${value}px`})
      // eslint-disable-next-line max-len
      $root.findAll(`[data-cell="${$parent.data.col}"]`)
          .forEach((elem) => elem.style.width = `${value}px`)
    } else {
      $parent.css({height: value +'px'})
    }
    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    })
  }
}
