var Todo = Backbone.Model.extend ({//{{{

    defaults : {
        title : "empty todo",
        order : todos.nextOrder()
        done : false
    },

    toggle : function () {
        //得到模型的完成状态
        this.save({done : !this.get("done")})
    }
})//}}}

var TodoList = Backbone.Collection.extend ({//{{{

    model : Todo,
    localStorage : new Backbone.LocalStorage("todo-backbone"),
    done :  function () {
        //TODO
        return this.where({done : true});
    },
    remaining : function () {
        return this.where({done : false});
    },
    nextOrder : function () {
        return this.last().get("order") + 1;
    },
    comparator : "order"

})//}}}

var Todos = new TodoList,
    _h = Handlebars;

var TodoView = Backbone.View.extend({//{{{
    
    tagName : "li",
    template : _h.compile($(".item-template").html()),
    events : {
        "click .toggle" : "toggleDone",
        "dblclick .view" : "edit",
        "click a.destroy" : "clear",
        "keypress .edit" : "updateOnEnter",
        "blur .edit" : "close"
    },
    initialize : function () {
        //监听模型
        this.listenTo(this.model,'change',this.render)
        this.listenTo(this.model,'destroy',this.destroy)
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
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
    updateOnEnter : function (e) {
        if(e.keyCode == 13) this.close()
    },
    close : function () {
        var value = this.input.val();
        if(!value) {
            this.clear()
        } else {
            this.model.save({title: value})
            this.$el.removeClass("editing")
        }
    }
})
//}}}

var AppView = Backbone.View.extend({

    el : $("#todoapp"),
    statsTemplate : _h.compile($("#stats-template").html()),
    events : {
        "keypress #new-todo" : "createOnEnter",
        "click #clear-completed" : "clearCompleted",
        "click #toggle-all" : "toggleAllComplete"
    },
    initialize : function () {
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
    addOne : function () {

        var view = new  TodoView({
            model: todo
        })

        this.$("#todo-list").append(view.render().el);
    },
    addAll : function () {
        //如果存在数据则执行每条添加记录
        Todos.fetch(this.addOne,this)
    },
    newAttributes :  function () {
        return  {
            title : this.input.val(),
            order : Todos.nextOrder,
            done : false
        }
    
    },
    createOnEnter : function () {
        
        if(e.keyCode  != 13) return;
        if(!this.input.val()) return;
        
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
