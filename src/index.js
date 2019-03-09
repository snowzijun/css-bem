import bem from  './utils/bem.js'
import flatten from './utils/flatten.js'
import {injectBem,vueMixin} from './mixin/index.js'

export default function classnames(namespace,name){
  const _bem = bem(namespace,name)
  return (ele,modifiers) => {
    return flatten(_bem(ele,modifiers))
  }
}

export {
  bem,flatten,injectBem,vueMixin
}