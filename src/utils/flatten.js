const SPACE = ' '
function flatten(cls){
  if(typeof cls === 'string'){
    return cls
  }
  if(Array.isArray(cls)){
    return cls.reduce((result,c) => {
      return (result + SPACE + flatten(c))
    },'')
  }
  return Object.keys(cls).reduce((result,key) => {
    return (result + SPACE + (flatten(cls[key] ? key : '')))
  }, '')
}

export default flatten