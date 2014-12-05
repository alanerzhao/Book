BackBone.js
--------------

## Backbone 事件对象

### 基本事件对象
 
 ``` on ``` 绑定对象的自定义事件，可以直接监听对象自带的一些事件。也可监听单一的属性事件. 

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
        "change:editor": mfChange.changeEditor
    }

    var mfView = new mofangView();

    mfView.on("changeEvent")
    mfView.on("change:developer",mfChange.changeDeveloper);
    mfView.on("change:editor",mfChange.changeEditor);

 ```
 
