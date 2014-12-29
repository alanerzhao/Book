$(function () {

   /*****
    *
    * 建立基础数据模型
    *
    *****/
   var Todo = Backbone.Model.extend({//{{{
    // 设置默认的属性
     defaults: function() {
      return {
        title: "empty todo...",
        order: Todos.nextOrder(),
        done: false
      };
    },

    // 设置任务完成状态
    toggle: function() {
        this.save({done: !this.get("done")});
    }
})//}}}

    /*****
     *
     * 集合控制器
     * 对数据的整体操控做一些数据的操作
     *
     ******/
var TodoList = Backbone.Collection.extend ({//{{{
    //指定数据模型
    model : Todo,
    //拉取本地数据
    localStorage : new Backbone.LocalStorage("todo-backbone"),
    done :  function () {
        //查找到完成的
        return this.where({done : true});
    },
    remaining : function () {
        //查找到未完成的
        return this.where({done : false});
    },
    nextOrder : function () {
        if (!this.length) return 1;
      return this.last().get('order') + 1;

    },
    comparator : "order"

})//}}}


//实例化集合对象
var Todos = new TodoList;
    //_h = Handlebars;

/*****
 *
 * 定义item视图类
 * 绑定了每个item的方法
 * 主要处理的是对每个模型的控制和这个item的操作
 *
 *
 *****/
var TodoView = Backbone.View.extend({//{{{
    
    tagName : "li",
    template :  _.template($('#item-template').html()),
    events : {
        "click .toggle" : "toggleDone",
        "dblclick .view" : "edit",
        "click a.destroy" : "clear",
        "keypress .edit" : "updateOnEnter",
        "blur .edit" : "close"
    },
    initialize : function () {
        //每个item监听todo模型
        this.listenTo(this.model,'change',this.render)
        this.listenTo(this.model,'destroy',this.destroy)
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        //新版toggleClass用法，true 加
        this.$el.toggleClass("done",this.model.get("done"));
        this.input = this.$(".edit");
        return this;
    },
    toggleDone: function() {
        this.model.toggle();
    },
    edit : function () {
        $(this.el).addClass("editing");
        this.input.focus()
    },
    clear: function () {
        this.model.destroy();
    },
    //编辑状态
    updateOnEnter : function (e) {
        if(e.keyCode == 13) this.close()
    },
    close : function () {
        var value = this.input.val();
        if(!value) {
            //如果不存在则销毁
            this.clear()
        } else {
            //否则同步到服务器
            this.model.save({title: value})
            this.$el.removeClass("editing")
        }
    }
})
//}}}

/*****
 *
 * 应用类整体控制 
 * 主要通过view 绑定collection来操作远端的集合
 *
 *****/
var AppView = Backbone.View.extend({

    el : $("#todoapp"),
    statsTemplate :  _.template($("#stats-template").html()),
    events : {
        "keypress #new-todo" : "createOnEnter",
        "click #clear-completed" : "clearCompleted",
        "click #toggle-all" : "toggleAllComplete"
    },
    initialize : function () {
        //初始化所有操作
        this.input = this.$("#new-todo");
        this.allCheckbox = this.$("#toggle-all")[0];

        this.listenTo(Todos,"add",this.addOne);
        this.listenTo(Todos,"reset",this.addAll);
        this.listenTo(Todos,"all",this.render);

        this.footer = this.$("footer");
        this.main = $("#main");

        //拉取列表
        Todos.fetch();
    },
    render : function () {
        var done = Todos.done().length;
        var remaining = Todos.remaining().length;
        

        //这里就是集合里如果有数据存在做一些处理
        if(Todos.length) {
            this.main.show();
            this.footer.show();
            this.footer.html(this.statsTemplate({done:done,remaining: remaining}))
        } else {
            this.main.hide();
            this.footer.hide();
        }

        this.allCheckbox.checked = !remaining

    },
    //这里很重要，collection item view都走这里
    addOne : function (todo) {

        //指定了模型层
        var view = new  TodoView({
            model: todo
        })
        //向列表中追加了数据
        this.$("#todo-list").append(view.render().el);
    },
    addAll : function () {
        //如果存在数据则执行每条添加记录
        Todos.each(this.addOne,this)
    },
    createOnEnter : function (e) {
        
        if(e.keyCode  != 13) return;
        if(!this.input.val()) return;
        
        //因为绑定在初始化的时候绑定了add方法所以会调用addone
        Todos.create({
            title:this.input.val()
        })

        this.input.val('');

    },
    clearCompleted : function () {
        //#http://learningcn.com/underscore/#invoke
        _.invoke(Todos.done(),'destroy');
        return false;
    },
    toggleAllComplete : function () {
        var done = this.allCheckbox.checked;
        Todos.each(function (todo) {
            todo.save({'done':done})
        })

    }
})

var App = new AppView;

})
