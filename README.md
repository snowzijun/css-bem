##### 插件说明

1. 简化class命名规范bem书写方式，让使用bem规范变得更简单
2. 避免在react,vue 等框架中拼接classname 字符串
3. 方便样式增减，减少不必要的判断

#### 使用说明

```javascript
  // 安装
  npm install css-bem
  // 引入
  import cssBem, { bem, flatten, injectBem,vueMixin } from 'css-bem'

```

1. 常规使用(以react为例)
``` jsx
  // 指定命名空间和组件名称
  const bem = cssBem('ns','button')
  /**也可以只指定一个
   * bem = cssBem('button')
  */

  // 组件
  export default class Button extend React.Component{
    render(){
      // 是否禁用 是否扁平化 类型 主题
      const {disabled,plain,type,theme = 'dark'} = this.props
      return (
        <div className={bem('wrap',[theme])}>
          <button className={bem([
            type,
            {disabled,plain}
          ])}>
            {this.props.children}
          </button>        
        </div>
      )
    }
  }
  
```
```jsx
//页面
  export default class Page extend React.Component{
    statis {
      disabled: false
    }
    render(){
      return <Button type='primary' plain disabled={this.state.disabled}>测试按钮</Button>
    }
  }
```
```html
 <!--结果-->
  <div class='ns-button__wrap ns-button__wrap--dark'>
    <button class='ns-button ns-button--primary ns-button--plain'>测试按钮</button>
  </div>
```

2 高阶组件
```javascript
  class Button extend React.Component{
    render(){
      const {classnames} = this
      return <div className={classnames('wrap',[theme])}>
          <button className={classnames([
            type,
            {disabled,plain}
          ])}>
            {this.props.children}
          </button>        
        </div>
    }
  }

  export default injectBem('ns','button')(Button)

  // 也可以使用装饰器
  @injectBem('ns','button')
  export default class Button extend React.Component{
    render(){
      const {classnames} = this
    }
  }
```

3. 只使用bem

   bem函数 用于简化组件命名空间 和 组件名重复输入的问题，主要适用于vue中使用，bem生成的结果可直接给vue的class属性
```javascript
  const $bem = bem('ns','button')

console.log($bem())
/**输出
 *  'ns-button'
*/

  console.log($bem('wrap',{
    disabled:true
  }))
  /**输出
   * ['ns-button__wrap',{
   *  'ns-button__wrap--disabled':true
   * }]
   * 
  */

 console.log($bem({
   disabled:true
 }))
 /**
  * 输出
  * ['ns-button',{'ns-button--disabled':true}]
 */

console.log($bem(['normal',{
  plain: false
}]))
/**
 * ['ns-button',['ns-button--normal',{'ns-button--plain':false}]]
 * 
*/
```

4. Vue中使用
```javascript

 export default {
   mixins:[vueMixin('ns','button')],
   props:{
     disabled:{
       type:Boolean,
       default: false
     }
   }
 }

 <template>
  <div :class="classnames('wrap')">
    <button :class="classnames([{disabled}])"></button>
  </div>
 </template>
 
```