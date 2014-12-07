BackBone.js
--------------

## Backbone 事件对象

### 基本事件对象
 
 ``` on ``` 绑定对象的自定义事件，可以直接监听对象自带的一些事件。也可监听单一的属性事件. 
 ``` on ``` 等事件绑定方法，其实也是监听方法的一种，只不过监听的对象不同  
 对象``` on ``` 方法用来监听对对象某事件的触发。即对象触发了这个事件，便执行相应的代码  

 ```javascript
    man.on("change",change);
    man.on("change:name",changeName);
 ```
 在绑定事件时，可以通过回调函数中的model对象获取属性修改前的所有值
 ```javascript
    model.previous("xx") //拿到一个属性
    model.previousAttributes() //拿到所有属性
    var mofangView = Backbone.Model.extend({
            defaults: {
                number: 100,
                developer: 30,
                editor: 70
            }
        })
    var mfChange = {
        changeDeveloper: function(model,value) {
            var oldNumber = model.previous("developer");
            if(value) {
                console.log("现在的developer人数为：" +(oldNumber + value));
            }
        },
        changeEditor: function (model,value) {
                console.log(model,value);
        }
    }
     //绑定change事件
    var changeEvent = {
        "change:developer": mfChange.changeDeveloper,
        "change:editor": mfChange.changeEditor,
        "trigger_": triggerConsole
    }
    function triggerConsole() {
        
    }

    var mfView = new mofangView();

    mfView.on("changeEvent")
    mfView.on("change:developer",mfChange.changeDeveloper);
    mfView.on("change:editor",mfChange.changeEditor);
    mfView.trigger("changeEvent['trigger_']")

 ```
 
 ``` once ``` 绑定一次，只执行一次，之后即使触发也不执行。（使用方法同上）  
 只针对于一些初始化

 ``` trigger ``` 触发事件，像change事件是Backbone封装好的对象事件，那么自定义事件  
 需要用```trigger ``` 来触发。

 ``` off ``` 移除事件和jQuery 类似，不传参数则移除所有事件。  
 ``` listenTo ```  对象监听另一个对象的事件，如果被监听的对象触发了被监听的事件，执行相应的回调  
 例如``` view ``` 对象要监听```mode``` 对象的```change ``` 事件，和我自已想的例子差不多。  
 
 ```javascript

    view.listTo(model,'change',view.render);
    model.on("change",view.render,view);

    var obj = _.extend({},Backbone.Events);

    obj.listenTo(person,"change",function(model,value) {
        var oldAge = model.previous("age");
        var newAge = model.get("age");
        if(oldAge != newAge) {
            console.log("oldAge"+oldAge+" : newAge" + newAge );
        }
    })
 ```
 ``` stopListening listenToOnce ``` 和listenTo用法一样.  
 ``` all ``` 全局对象事件，因为它监听所有事件，所以我叫他全局对象事件.  

## 数据模型
  数据模型可以理解为就是数据，定义一系列的数据，也可以是后台传过来的数据，
  用Backbone包装上一层就会得到Backbone的一些方法和属性，这时就能很好的再
  封装数据  

  一个数据模型在Backbone中会有一个初始化函数，```initialize ```也就是类似于  
  我平时也的构造函数，所以每实例化一次都会执行这个初始化函数，相关于写在了构造函数里  

### 对象模型的赋值

  如果在构建时赋值是可以通过```defaults```来设置默认值，Backbone会自动帮你处理好。  
  在实例的对象上赋值或取值就只能通过实例的``` set get ``` 方法  

  ```javascript 
    obj.set(attrName,attrValue)
    obj.set({attrName:attrValue,attrName:attrValue})
    
    // escape 不同与get 的地方在于escape会将包含html的数据实体化
    obj.get(attrName)
    obj.escape(attrName)

    var student = Backbone.Model.extend({
        //init
        initialize: function () {
            console.log(1);
        },
        //设置默认值
        defaults: {
            Code : "",
            Name : "",
            Score: 0,
            Structure:"<div></div>"
        },
        show: functio () {
             //this指向模型对象
        }

    })
    var stu = new student;
    stu.set({"Name":"zhaoshuai","Score":"22"})
    //只会得到字符，不会被解析
    stu.escape("Structure");
  ```  
### 自定义模型中的方法
  说白了也就是给你的数据层增加一些你的业务所需要的方法，相当于  
  添加再了原型对象中，这样可以理解到Backbone的模式是封装了一些模式加以应用的。
  当你实例化时，实例自然而然得到构造函数的原型对象上的方法。  

### 监听对象属性值变化
 书中为何说要放到initialize 中就是因为每个实例化的对象都需要这这些监听不同的实例  
 ```javascript
     initialize: function () {
        this.on("change:Name",changeName);
     },
     function changeName () {
        var oldName = this.previous("Name");
        var newName = this.get("Name");
        console.log(oldName,newName);
    }

 ```  
### 模型对象操作
   读取，修改，验证，删除，等，对数据的处理，书中的例子大体都能懂，和上面的```set get ```  
   大体一样的。  

   ** 数据验证 ** 
   * 添加```validate```
   * 绑定```invalid``` 事件
   * 使用``set```修改属性时，必须将validate设置为true  
   ```javascript
        var Date = Backbone.Model.extend({
            defaults: {
                name:"1",
                age:2,
                sex:22
            },
            initialize: function () {
                this.on("invalid",checkDate)
            },
            validate: function(attrs) {
                var reg = /\d/;
                if(!reg.test(attrs.age)) {
                    console.log("必须为数字")
                } else {
                    console.trace("ok")
                }
            }
        })
        function checkDate (model,error) {
            console.log(model.get("age"),error);
        }
        var onceDate = new Date();
        //必须传入validate参数才可以验证
        onceDate.set("age","fuck",{"validate":true})

   ```








