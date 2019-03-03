import bem from  './utils/bem.js'
import classnames from './utils/classnames'

export default (namespace,name) => {
  const _bem = bem(namespace,name)
  return (ele,modifiers) => {
    return classnames(_bem(ele,modifiers))
  }
}

export {
  bem,classnames
}