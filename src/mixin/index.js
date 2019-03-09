import classnames from '../index';

const isFunction = (obj) => Object.prototype.toString.call(obj) === '[object Function]';

const injectBem = (namespace, component) => {
  const _classnames = classnames(namespace, component);
  return (obj) => {
    (isFunction(obj) ? obj.prototype : obj).classnames = (ele, mods) => _classnames(ele, mods);
    return obj;
  };
};

const vueMixin = (namespace,component) => {
  const _classnames = classnames(namespace, component);
  return {
    methods:{
      classnames:(ele,mods) => {
        return _classnames(ele,mods)
      }
    }
  }
}


export {
  injectBem,vueMixin
}