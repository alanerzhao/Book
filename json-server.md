通过json-server学习Backbone
-------------------
  最近又再读Backbone源码，其实感觉源码学起来不困难，困难的是每个层之间的如何通信和联系，怎么去用mvc的思想去,写一个应用，而至用backbone源码里的方法和属性，我觉得可以像学jQuery一样，用到就查一下，没有必要全记住，当然常用的要知道。  
  json-server是一个以nodejs架设的REST 接口。
    
    Give it a JSON or JS file and it will serve it through REST routes.
    Created with <3 for front-end developers who need a flexible back-end for quick prototyping and mocking.

上面这段话就很容易理解了。至于我为什么要用它，不单是学习backbone要用到类似的接口，另一方面，在工作中有时候做前端需要请求一些服务器的数据，这时候一般前端开发都比后端要快些，我可以用这个小服务器做为我的私有数据接口模型，服务器返回的数据，这样就减少的联调的时间。我也不用一直等后端的数据了。
    
### 如何使用json-server
下面这是jsonServer的地址

    https://github.com/typicode/json-server  
    http://jsonplaceholder.typicode.com/  

官方文档很清楚了，不过有文档也不一定有多完美，官方还提供了一个在线版的接口，也做使用，不过数据太死板。我简单的总结一下，以便我自己使用，也便于搜索到此文章的人使用。

首先，安装nodejs，这些都不用说了然后 ``` npm install -g json-server``` 安装到全局,然后可以使用```json-server```执行，下面就是帮助文档了，很简单了不过多介绍

    json-server <source>
    Examples:
      json-server db.json
      json-server file.js
      json-server http://example.com/db.json
    Options:
      --help, -h     Show help
      --version, -v  Show version number
    --port, -p     Set port             [default: 3000]

### 如何用它来玩Backbone
很简单了，官网提供的Todos是用的localstorage，并不存在请求，那我们就可以用```josn-server```打一个端口，然后自己定义数据，来让backbone请求来用。这里放上一个例子。  

```javascript
  /******
   * 这里定义一个模型数据，然后定义了一个服务器的接口
   *****/
  var AppModel = Backbone.Model.extend({
      defaults : {
          name : "",
          age  : "",
          sex  : "",
          id   : ""
      },
      url:"http://localhost:3000/user", //这里是我用json-serve 打开的服务器
      idAttribute :"id",
      initialize : function () {
      this.fetch({
            success: function (model,response) { 
                view.trigger("render",response)
            },error: function () {
            
            }
        })
        this.on("change",function (model,value) {
              console.log("change")
          })
      }

  })

var server = new AppModel()
server.save({"name":"baozi"}) //用save方法发送数据然
```
上面的例子就是发送数据到服务器了。然后你打开服务器地址就能看到你是否成功了。在它的描述中
支持```Supports GET but also POST, PUT, DELETE and even PATCH requests```所以很适合玩Backbone。

当然它也可以用来做模拟数据，我这里简单来个例子。没什么难的。
```javascript
$.ajax({
    url: "http://localhost:3000/db",
    type: 'POST',
    dataType: 'json',
    data: {"bb":"1"},
    success: function (data) {
        // success callback
        console.log(data)
    },
    error: function () {
        // error callback
        console.log("error")
    }
});
```
上面也是一个简单的请求，主要是拿到模拟数据来用。分享完毕 ^ ^!


