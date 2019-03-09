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
    return modifiers.map(m => modifier(ele,m))
  }
  return Object.keys(modifiers).reduce((result,key) => {
      result[modifier(ele,key)] = modifiers[key]
     return result
  },{})
}

export default function bem(namespace,component){
  const hasNC = namespace && component
  let np = hasNC ? (join(namespace,component,SEPARATOR)) : namespace || component || ''

  return function(ele,modifiers){
    if(ele && typeof ele !== 'string'){
      modifiers = ele
      ele = ''
    }
    ele = join(np,ele,ELEMENT)
    return modifiers ? [ele,modifier(ele,modifiers)] : ele
  }
}

