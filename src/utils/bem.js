const ELEMENT = '__'
const MODIFIER = '--'
const SEPARATOR = '-'

function join(name,ele,symbol){
  return ele ? `${name}${symbol}${ele}` : name
}

function modifier(ele,modifiers) {
  if(typeof modifiers === 'string'){
    return join(ele,modifiers,MODIFIER)
  }
  if(Array.isArray(modifiers)) {
    return modifiers.map(m => join(ele,m,MODIFIER))
  }
  return Object.keys(modifiers).reduce((result,key) => {
     if(modifiers[key]){
      result[join(ele,key,MODIFIER)] = true
     }
     return result
  },{})
}

export default function bem(namespace,component){
  const hasNC = namespace && component
  let np = hasNC ? (namespace + SEPARATOR +component) : namespace || component || ''

  return function(ele,modifiers){
    if(ele && typeof ele !== 'string'){
      modifiers = ele
      ele = ''
    }
    ele = join(np,ele,ELEMENT)
    return modifiers ? [ele,modifier(ele,modifiers)] : ele
  }
}

