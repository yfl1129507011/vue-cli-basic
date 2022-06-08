## 关于不同版本的Vue
- vue.js与vue.runtime.xxx.js的区别：
    1. vue.js是完整版的Vue，包含：核心功能+模板解析器
    2. vue.runtime.xxx.js是运行版的Vue，只包含：核心功能，没有模板解析器
- 因为vue.runtime.xxx.js没有模板器，所以不能使用template配置项，需要使用render函数接收到的createElement函数去指定具体内容


## vue.config.js配置文件
> 1. 使用vue inspect > output.js可以查看到Vue脚手架的默认配置
> 2. 使用vue.config.js可以对脚手架进行个性化定制


## ref属性
1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式
    - 打标签：`<h1 ref="xxx">...</h1>`
    - 获取：`this.$refs.xxx`


## mixin(混入)
- 功能：可以把多个组件共用的配置提取成一个混入对象

- 使用方式

    a. 定义混合：
    ```
        {
            data(){...}
            methods(){...}
            ...
        }
    ```

    b. 使用混入：
    1. 全局混入：`Vue.mixin(xxx)`
    2. 局部混入：`mixins:['xxx']`


## 插件
- 功能：用于增强Vue
- 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据
- 定义插件：
    ```
    对象.install = function (Vue, options) {
        // 1. 添加全局过滤器
        Vue.filter(...)

        // 2. 添加全局指令
        vue.directive(...)

        // 3. 配置全局混入(合)
        Vue.mixin(...)

        // 4. 添加实例方法
        Vue.prototype.$myMethod = function() {...}
        Vue.prototype.$myProperty = xxx
    }
    ```
- 使用插件：Vue.use()


## scoped样式
1. 作用：让样式在局部生效，防止冲突
2. 写法：`<style scoped>`


## 总结TodoList案例
1. 组件化编码流程：
    - 拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。

    - 实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
        1. 一个组件在用：放在组件自身即可。
        2. 一些组件在用：放在他们共同的父组件上（<span style="color:red">状态提升</span>）。
    - 实现交互：从绑定事件开始。

2. props适用于：
    - 父组件 ==> 子组件 通信
    - 子组件 ==> 父组件 通信（要求父先给子一个函数）

3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！

4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。


## webStorage(浏览器存储)
1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）
2. 浏览器端通过`Window.sessionStorage`和`Window.localStorage`属性来实现本地存储机制
3. 相关API
    ```
    // 该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值
    1. xxxStorage.setItem('key', 'value')

    // 该方法接受一个键名作为参数，返回键名对应的值
    2. xxxStorage.getItem('key')

    // 该方法接受一个键名作为参数，并把该键名从存储中删除
    3. xxxStorage.removeItem('key')

    // 该方法会清空存储中的所有数据
    4. xxxStorage.clear()
    ```
4. 备注
    - `SessionStorage`存储的内容会随着浏览器窗口关闭而消失
    - `LocalSrorage`存储的内容，需要手动清除才会消失
    - `getItem('key')`如果key对应的value获取不到，则返回null
    - `JSON.parse(null)`的结果为null



## 组件的自定义事件
1. 一种组件通信方式，适用于：<strong style="color:red">子组件 ===> 父组件</strong>
2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（`事件的回调在A父组件中`）
3. 绑定自定义事件：
    - 第一种方式，在父组件中：`<Demo @fenlon="test" />` 或 `<Demo v-on:fenlon="test" />`
    - 第二种方式，在父组件中：
        ```
        <Demo ref="demo" />
        export default {
            name:'App',
            methods: {
                test(name, ...params){
                    console.log('test')
                }
            },
            mounted(){
                this.$refs.demo.$on('fenlon', this.test)
            }
        }
        ```
    - 若想让自定义事件只触发一次，可以使用`once`修饰符，或`$once`
        ```
        <Demo @fenlon.once="test" />

        this.$refs.demo.$once('fenlon', this.test)
        ```
4. 触发自定义事件：`this.$emit('fenlon', 数据参数)`
5. 解绑自定义事件：`this.$off('fenlon')`或`this.$off(['a','b'])`解绑多个
6. 组件上也可以绑定原生DOM事件，需要使用`native`修饰符
    ```
    <Student @click.native="show">
    import Student from './components/Student'

    export default {
        name: 'App',
        methods: {
            show() {
                alert(123)
            }
        }
    }
    ```
7. 注意：通过```this.$refs.xxx.$on('atguigu',回调)```绑定自定义事件时，回调<span style="color:red">要么配置在methods中</span>，<span style="color:red">要么用箭头函数</span>，否则this指向会出问题！
    ```
    <template>
        <div class="app">
            <Student ref="student">
        </div>
    </template>
    <script>
        import Student from './components/Student'

        // 配置在methods中
        export default {
            name: 'App',
            data(){
                return {
                    studentName: ''
                }
            }
            methods: {
                getName(name, ...params) {
                    this.studentName = name
                }
            },
            mounted() {
                this.$refs.student.$on('fenlon', this.getName)
            }
        }

        // 使用箭头函数
        export default {
            name: 'App',
            data(){
                return {
                    studentName: ''
                }
            },
            mounted() {
                this.$refs.student.$on('fenlon', (name, ...params)=>{
                    this.studentName = name
                })
            }
        }
    </script>
    ```


## 全局事件总线（GlobalEventBus）
- 一种组件间通信的方式，适用于`任意组件间通信`
- 安装全局事件总线：
    ```
    // main.js
    new Vue({
        // 将App组件放入容器中
        render: h => h(App),
        beforeCreate(){
            Vue.prototype.$bus = this   // 安装全局事件总线
        }
    }).$mount('#app')
    ```
- 使用事件总线：
    1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的`回调留在A组件自身`
        ```
        export default {
            name: 'A',
            methods(){
                demoCallBack(data){...}
            },
            mounted() {
                this.$bus.$on('demo', this.demoCallBack)
            }
        }
        ```
    2. 提供数据：
        ```
        export default {
            name: 'B',
            methods(){
                // 触发事件
                sendData(data){
                    this.$bus.$emit('demo', 666)
                }
            }
        }
        ```
- 最好在`beforeDestroy`钩子中，用$off去解绑当前组件所用到的事件
    ```
    export default {
        name: 'A',
        methods(){
            demoCallBack(data){...}
        },
        mounted() {
            this.$bus.$on('demo', this.demoCallBack)
        },
        beforeDestroy(){
            this.$bus.$off('demo')
        }
    }
    ```


## 消息订阅与发布
- 一种组件间通信的方式，适用于任意组件间通信
- 使用步骤：
    1. 安装pubsub：`npm i pubsub-js`
    2. 引入：`import pubsub from 'pubsub-js'`
    3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身
        ```
        export default {
            name: 'A',
            methods(){
                demo(data){...}
            },
            mounted() {
                // 订阅消息
                this.pid = pubsub.subscribe('xxx', this.demo)
            },
            beforeDestroy() {
                // 取消订阅
                pubsub.unsubscribe(this.pid)
            }
        }
        ```
    4. 提供数据：`pubsub.publish('xxx', 数据)`


## nextTick
1. 语法：`this.$nextTick(回调函数)`
2. 作用：在下一次DOM更新结束后执行其指定的回调
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行

## Vue封装的过度与动画
1. 作用：在插入、更新或移除DOM元素时，在合适的时候给元素添加样式类名
2. 写法：
    ```
    <template>
        <div>
            <button @click="isShow = !isShow">
                显示/隐藏
            </button>
            <!--transition 只能包裹一个元素而transition-group可以包含多个元素-->
            <transition-group name="hello" appear>
                <h1 v-show="!isShow" key="1">你好!</h1>
                <h1 v-show="isShow" key="2">FenLon</h1>
            </transition-group>
        </div>
    </template>

    <script>
        export default {
            name: "Test2",
            data() {
                return {
                    isShow: true
                }
            },
        }
    </script>

    <style>
        h1{
            background: orange;
        }
        /*进入的起点，离开的终点*/
        .hello-enter,
        .hello-leave-to{
            transform: translateX(-100%);
        }
        /*进入的过程，离开的过程*/
        .hello-enter-active,
        .hello-leave-active{
            transition: linear .5s;
        }
        /*进入的终点,离开的起点*/
        .hello-enter-to,
        .hello-leave{
            transform: translateX(0);
        }
    </style>
    ```
3. 使用第三方动画库
    - 下载`nmp install animate.css`
    - 使用
        ```
        <template>
            <div>
                <button @click="isShow = !isShow">
                    显示/隐藏
                </button>
                <transition-group 
                name="animate__animated animate__bounce" 
                appear
                enter-active-class="animate__swing"
                leave-active-class="animate__backOutUp"
                >
                    <h1 v-show="isShow" key="1">你好!</h1>
                    <h1 v-show="isShow" key="2">FenLon</h1>
                </transition-group>
            </div>
        </template>

        <script>
        import 'animate.css'
        export default {
            name: "Test3",
            data() {
                return {
                    isShow: true
                }
            },
        }
        </script>

        <style>
        h1{
            background: orange;
        }
        </style>
        ```

## vue脚手架配置代理
> 安装： npm i axios
### 方法一

​	在vue.config.js中添加如下配置：

```js
devServer:{
  proxy:"http://localhost:5000"
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

### 方法二

​	编写vue.config.js配置具体代理规则：

```js
module.exports = {
	devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。


## 插槽

1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 <strong style="color:red">父组件 ===> 子组件</strong> 。

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式：

   1. 默认插槽：

      ```vue
      父组件中：
              <Category>
                 <div>html结构1</div>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot>插槽默认内容...</slot>
                  </div>
              </template>
      ```

   2. 具名插槽：

      ```vue
      父组件中：
              <Category>
                  <template slot="center">
                    <div>html结构1</div>
                  </template>
      
                  <template v-slot:footer>
                     <div>html结构2</div>
                  </template>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot name="center">插槽默认内容...</slot>
                     <slot name="footer">插槽默认内容...</slot>
                  </div>
              </template>
      ```

   3. 作用域插槽：

      1. 理解：<span style="color:red">数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。</span>（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）

      2. 具体编码：

         ```vue
         父组件中：
         		<Category>
         			<template scope="scopeData">
         				<!-- 生成的是ul列表 -->
         				<ul>
         					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
         				</ul>
         			</template>
         		</Category>
         
         		<Category>
         			<template slot-scope="scopeData">
         				<!-- 生成的是h4标题 -->
         				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
         			</template>
         		</Category>
         子组件中：
                 <template>
                     <div>
                         <slot :games="games"></slot>
                     </div>
                 </template>
         		
                 <script>
                     export default {
                         name:'Category',
                         props:['title'],
                         //数据在子组件自身
                         data() {
                             return {
                                 games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                             }
                         },
                     }
                 </script>
         ```