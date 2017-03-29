# es6-string-template-loader

## install
```
npm install --save-dev es6-string-template-loader
```

## config
```js
  // webpack config
  {
    test: /\.xhtml/,
    use: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['env'],
          plugins: ['transform-runtime']
        }
      },
      {
        loader: 'html-template-loader'
      }
    ]
  }
```

## demo1
```html
// 1.xhtml
<h1 class="author">${it.name}</h1>
```

```js
import x1 from './1.xhtml'
let html = x1({name: '<strong>template</strong>'})
// result:
// <h1 class="author"><strong>template</strong></h1>
```

## demo2
```html
// 2.xhtml
<h1 class="author">$${it.name}</h1>
```

```js
import x1 from './2.xhtml'
import escape from './escape.js'
let html = x1({name: '<strong>template</strong>'}, escape)
// result:
// <h1 class="author">&lt;strong&gt;template&lt;/strong&gt;</h1>
```

```js
// escape.js
function _escape(string) {
  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2f;',
    '\\': '&#x5c;'
  }
  return String(string).replace(/[&<>"'/\\%]/g, function (key) {
    return entityMap[key]
  })
}
export function escape (sections, ...vars) {
  let ret = ''
  for (let i = 0, raws = sections.raw, l = raws.length; i < l; ++i) {
    let raw = raws[i]
    let value = vars[i] == null ? '' : vars[i]
    if (raw[raw.length - 1] === '$') {
      raw = raw.slice(0, -1)
    } else {
      value = _escape(value)
    }
    ret += raw + value
  }
  return ret
}
```

## demo3
```html
// 3.xhtml
<h1 class="${utils.style.author}">${it.name}</h1>
```

```js
import x1 from './3.xhtml'
let style = {author: 'ba3xfz'} // ex: css modules
let tag = null
let utils = {style: style}
let html = x1({name: '<strong>template</strong>'}, tag, utils)
// result:
// <h1 class="ba3xfz"><strong>template</strong></h1>
```
