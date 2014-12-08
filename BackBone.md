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
        //自定义show方法
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

   **数据验证**
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
                    //将执行checkDate得到返回的error
                    retrun "error"
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
        //将不在触发任何验证
        onceDate.set("age","fuck",{"silent":true})

   ```
### 更新数据回滚
   ```page 72``` 没什么可总结的。  
   ____

### 删除数据
   ```unset clear``` 来删除数据，前者删除一个或多个对象，后者删除所有  
### 对象属性操作
   在Backbone中每一个实例对象所有属性都保存在一个名为attributes的对象中  
   对象的```set get ``` 都依赖此对象，可以直接调用attributes获得全部属性值  
   ```javascript
      obj.attributes //获得模型对象的所有属性（不会产生任何触发事件）
      obj.previous(attrName) //获得修改之前的值
      obj.previousAttributes() //获取修改之前的所有值
   ```
### 同步数据到服务器
   ```save``` 在服务器中保存客户端发送的数据，设置```wait```属性可以调用validate  
   当数据请求不成功时，将回滚数据，很实用。如果不设置无论失败成功都将更新为最新的数据  

   ```fetch``` 从服务器获取数据，用于数据恢复或数据模型初始化。用法和save基本一样  
   ```destroy``` 将以``DELETE```的请求方式，向服务器发送对象id  必须要设置```idAttribute```

   ```javascript
     var student = Backbone.Model.extend({
            initilize: function () { },
            url: 'server/save.php',
            defaults: {
                name:"baozi",
                age : 26,
                love: "web developer"
            }
        })
        var stu = new student;
        stu.save(null,{
            //拿到服务器返回的值
            success:function(model,response){
            console.log(response.code)
            },
            error: function (error) {
                 console.log(error)
            }
        })

   ```
###模型集合
   定义：Collection 是依附于基类的另外一个数据集合类，它的功能是管理和存储由模型衍生的数据集合  
   相当于一个model的包裹层，相当于数据库的一张数据表，处理表中的每条数据。  

#### 创建集合对象
   * 自定义集合类，再实例化集合对象
     集合类是依附于数据模型类，首先声明一个集合（Collection)类，并在集合类中设置model数据类  
     然后实例化一个当前集合类的对象，就可以添加数据模型
   * 直接实例化集合对象（简单）
   ```javascript 
      //example 1 (自定义集合类)

       //声明数据模型类
        var student = Backbone.Model.extend({
            initilize: function () { },
            defaults: {
                name:"",
                age : "",
                love: ""
            }
        })

        //声明模型集合类
        //通过Collection.extend继承student
        var stulist = Backbone.Collection.extend({
            //设置依赖名称数据模型，相当于外面"数据结构"是什么样？嘿嘿懂了！
            //它将存储在模型集合的model属性中
            model: student
        })
        var stumodels = [{
            name:"zhaoshuai",
            age:"26",
            love:"web developer"
        },{
            name:"zhaoyan",
            age:"36",
            love:"teacher"
        }]
        var stus = new stulist(stumodels);
        console.log(stus.models)
    ```
    ```javascript 

        //example2(实例化集合类)
        
        var mfPerson = Backbone.Model.extend({
            defaults: {
                frontEnd:4,
                BackEnd :10,
                Total : 14
            }
        })

        var mfs = [{
            frontend:10,
            backend:10,
            total:20
        },{
            frontend:20,
            backend:1,
            total:21
        }]

        //这里是实例化
        var stu = new Backbone.Collection(mfs,{
            model: mfPerson
        })
    ```
#### 自定义集合方法
  和自定义数据模型方样一样类似的。现在看Collection更像是除里数据模型的集合  

#### 操作集合中模型对象  
  
  ```remove```从指定的集合对象中移除一个或多个模型对象
  ```pop```移除集合中最后一个模型对象
  ```shift```移除集合中首个模型对象

  使用方法都很简单，不在练习，如果忘记再回来看  

#### 添加集合对象中的模型
    ```add```
    ```push```
    ```unshift```
 和操作集合是一样的，很类似于原生的javascript  

 ```javascript 
     var student = Backbone.Model.extend({
            defaults : {
                code:"",
                name:"",
                age:""
            }
        })
        var stumodels = [{
            code:"js",
            name:"baozi",
            age: 21
        },{
            code:"node",
            name:"ppr",
            age: 21
        },{
            code:"css3",
            name:"pro",
            age: 22
        },{
            code:"html5",
            name:"alane",
            age: 26
        }]
        var stus = new Backbone.Collection(stumodels,{
            model: student
        })
        for(var i = 0;i < stus.models.length;i++) {
            console.log(stus.models[i].toJSON())
        }
        console.log("===========================================")
        stus.remove(stus.models[0]);
        stus.pop()
        stus.shift();
        for(var i = 0;i < stus.models.length;i++) {
            console.log(stus.models[i].toJSON())
        }
        console.log("===========================================")
        stus.push({
            name:"zhanglei",
            code:"php",
            age:30
        })
        stus.add({
            name:"wangxia",
            code:"java",
            age:27
        },{at:1})
        for(var i = 0;i < stus.models.length;i++) {
            console.log(stus.models[i].toJSON())
        }
        var findId = stus.get(21);
        console.log(stus.get(21).toJSON())
        console.log(stus.at(2).toJSON())
        console.log(stus.findWhere({
            name:"baozi"
        }).toJSON());

 ```
 #### 与服务器交互集合中的模型对象
 ```fetch ``` 获得数据用做初始化
 ```create``` 创建好集合对象中的全部模型数据发送到服务器，数据同步,指定id则为修改服务器数据
 















