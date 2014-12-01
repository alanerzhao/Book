编写可维护的JavaScript 记录
===============
 > 随便记录一些书中重要的，因为当你真正自己写一个相对完整的前端项目，
 你会发现你没有命名规范，没有一些模式，没有一些注释你以后就真的别
 想维护了。

代码格式及命名规范
--------------------
 代码4空格缩进，每行不要超过80个字符，如果判断条件过长，那么换行在运算符后
 换行的代码缩进也为4个空格
     
 每个函数语句结尾不加分号， 每个流控制语句之前加入空行 方法之间也要加入空行
 在方法中的局部变量和第一条语句之间最好也要加入空行，方便阅读。
 在多行或单行注释之前适当加入空行
     
 常量用全大写字母 驼峰式命名变量名
 函数或方法的前缀是动词，变量的前缀是名词 例如
 ```
 can has is get set 
 var URL MAX_COUNT
 ```
 特殊值```null```用来初始化一个变量，这个变量可能是一个对象
 当函数的参数期望是对象时，用作参数传入，当函数的返回值期望是以象时，用作返回值
 ```null``` 就相当于对象的占位符
 ```undefined```是一个特殊值 是一个类型，```undefined``` typeof 的运算符混淆
 多行注释 注释前加空格，星号后加空格
 当代码不是很清晰时才加注释，难于理解的代码，可能被误认为错误的代码
 块语句左右加间隔。

UI层的松耦合
------------------
 如果两个组件耦合太紧，则说明一个组件和另一个组件直接相关，这样的话修改一个组件的逻辑
 那么另一个组件逻辑也需修改。
 当你能够做到修改一个组件而不需要更改其他的组件时，你就做到了松耦合。
 
 * 当需要通过```JavaScript```修改元素样式的时候，最佳的方法是操作css的className。
 * ``` HTML ``` 不要放在```JavaScript ``` 里，简的做法可以用一些客户端模板，正如我所用的```Handlebars```
 * 避免全局变量，老声常谈的问题，可维护性，命名冲突，带来需多问题。
 * 任何来自函数外部的数据都应当以参数形式传进来，这样做可以将函数和其外部环境隔离开来。并且你修改不会影响程序其它部分。
 * 单全局变量也就是单体，用一个大对象来管理属性和方法，有点类似于命名空间
 * 零全局变量- 小的功能块，不需要提供任何接口，也不依赖任何模块

事件处理
-----------------
 * 隔离应用逻辑，也就是~~业务逻辑~~说错了，后来想了想应用逻辑是指你写的这个组件的逻辑，不是指的业务逻辑。
 
 ```javascript 
    var app = {
        //事件处理函数
        handleClick : function () {
            this.showPopup();
        },
        //应用逻辑
        showPopup : function () {
            var popup = document.getElementById("popup");
            popup.style.left = event.clientX + 'px';
        }
    };
    addListener(element,'click',function (event) {
        app.handleClick(event);
    })
 ```
 * 不要分发事件对象，明确传入参数
 * 当处理事件时，最好让事件处理程序成为接触到event对象的唯一的函数
  - 应当在进入业务或应用逻辑之前处来处理一些依赖于event的操作
 
 ```javascript 
    var app = {
        handleClick : function (event) {
            this.showPopup(event.clinetX, event.clientY);
            //阻止默认行为
            event.preventDefault()
            //阻止事件冒泡
            event.stopPropagation()
        },
        //可以app.showPopup(1,2)来做测试
        showPopup : function (x, y) {
            var popup = document.getElementById("popup");
            popup.style.left = x + 'px';
        }
    };
    //事件处理函数
    addListener(element,'click',function (event) {
        app.handleClick(event);
    })
 ```
避免"空比较"
-------------------
 5 种数据类型，字符串，数字，布尔值，null 和 undefined
 基本类型可以用```typeof``` 来做判断，未定义的变量值为undefined 通过typeof将返回"undefined"

 检查引用类型最好的方法是使用instanceof 来判断这个值是不是这个构造函数的实例，但所有对象都是```Object```的实例
 所以也有局限性

 检测数组最优雅的方案
 ```javascript 
    function isArray(val) {
        if(typeof Array.isArray === "function") {
            return Array.isArray(val);
        } else {
        return Object.prototype.toString.call(value) === "[object Arrat]";
        }
    }
 ``` 
 检测属性（检测一个属性是否在对象上存在时）
 ``` in ``` 简单的判断对象的属性是否存在
 ``` hasOwnProperty ```也可以达到同样的目的，检查实例对象的某个属性

将配置数据从代码中分离出来
---------------------------
 配置数据是应用中写死的值，那即然是配置就应当更灵活些。
 ```javascript
    var config = {
            URL:"XX",
            MESSAGE:"XX"
        }
    function validate(value) {
        if(!value) {
            alert(config.MESSAGE);
        }
    }
 ```
抛出自定义错误
----------------
 ``` throw ``` 抛出错误信息
 如果没有通过try-catch 语句捕获，抛出任何值都将引发一个错误。
 ```javascript
    function getDivs (element) {
        if(element && element.getElementsByTagName) {
        return element.getElementsByTagName("div");
        } else {
            throw new Error("getDivs":Argument mus be a DOM element);
        }
    }
 ```
浏览器嗅探
------------------
 最好不要使用用户代理而是去检测对象属性等方法（特性检测）``` window.getElementById ```

自动化
-----------------
### 基本结构
 **build** 用来放放置最终构建后的文件  
 
 **src** 用来放置所有的源文件  
 
 **tests** 用来放置所有的测试文件  
 

 有时间看看开源的jQuery和BackBone等代码如何构建编译的
 
风格指南
------------
** 注释声明
 ``` javascript
    
    //TODO 说明代码还未完成，应当包含下一步要做的事情
    
    //HACK 说明代码实现走了一个捷径，应当包含为何使用hack
    
    //XXX 说明代码是有问题的并应当尽快修复
    
    //FIXME 说明代码是有问题的并应尽快修复
    
    //REVIEW 说明代码任何可能的改动都需要评审

    //TODO: 我希望找到一种更好的方式
    doSomething()

    /*
     * HACK: 不得不针对IE 6去做除理
     * 可能再下一版本去掉
     */
     if (document.all) {
        fuck ie    
     }

     //REVIEW: 有更好的方法吗？
     if (document.all) {
         
     }
 ```
 

