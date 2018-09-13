/*
* @Author: calasaba
* @Date:   2018-09-12 09:29:34
* @Last Modified by:   calasaba
* @Last Modified time: 2018-09-12 15:06:30
*/
var app = new Vue({
    el: "#app",
    data: {
        message:"Hello world !"
    } 
});

var app2 = new Vue({
    el: "#app-2",
    data: {
        message: '页面加载于' + new Date().toLocaleString(),
    }
});
var app3 = new Vue({
    el : "#app-3",
    data : {
        seen: true,
    }
});
var app4 = new Vue({
    el : "#app-4",
    data : {
        todos : [
           { text : "学习 JavaScript" },
           { text : "学习 Vue" },
           { text : "整个组件" }
        ]
    }
});
var app5 = new Vue({
    el : "#app-5",
    data : {
        message : "Hello Vue.js"
    },
    methods : {
        reverseMessage : function (){
            this.message = this.message.split('').reverse().join('')
        }
    }
});
var app6 = new Vue({
    el : "#app-6",
    data : {
        message : "Hello Vue!"
    }
});
Vue.component('todo-item',{
    // todo-item 组件现在接受一个“prop“，类似于一个自定义特性
    //这个prop 名为 todo
    props : ['todo'],
    template : "<li>{{ todo.text }}</li>"
})
var app7 = new Vue({
    el: "#app-7",
    data : {
        groceryList : [
           {id : 0, text : "蔬菜"},
           {id : 1, text : "奶酪"},
           {id : 2, text : "随便其他什么吃的东西"},
        ],
        aaa : [
        {id : 0, text : "衣服"},
        {id : 1, text : "食物"},
        {id : 2, text : "交通"},
        ]
    }
});
var app8 = new Vue({
    el: "#app-8",
    data: {
        rawHtml : "<span style = 'color : red'> This should be red.</span>"
    }
});
var vm = new Vue({
    el : "#example",
    data : {
        message : "Hello",
    },
    computed : {
        reversedMessage : function(){
            return this.message.split('').reverse().join('')
        }
    }
});

var demo = new Vue({
    el : "#demo",
    data : {
        firstName : "foo",
        lastName : "bar"
    },
    computed : {
        fullName : {
            get : function(){
                return this.firstName + " " + this.lastName
            },
            set : function(newName){
                var names = newName.split(" ");
                this.firstName = names[0];
                this.lastName = names[names.length-1];
            }
        }
    }
});

var watchExampleVM = new Vue({
    el : "#watch-example",
    data : {
        question : '',
        answer : " I cannot give you an answer  until you ask a question."
    },
    watch : {
        //如果question 发生改变，这个函数就会运行
        question : function(newQuestion,oldQuestion){
            this.answer = "Waiting for you to stop typing......"
            this.debouncedGetAnswer()
        }
    },
    created : function(){
        // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
        // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
        // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
        // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
        // 请参考：https://lodash.com/docs#debounce
        this.debouncedGetAnswer = _.debounce(this.getAnswer,500);
    },
    methods : {
        getAnswer : function(){
            if(this.question.indexOf("?") === -1){
                this.answer = 'Questions usually contain a question mark. :-)'
                return
            }
            this.answer = "Thinking ..."
            var vm = this
            axios.get('http://yesno.wtf/api').then(function (response){
                vm.answer = _.capitalize(response.data.answer)
            }).catch(function(error){
                vm.answer = "Error! Could not reach the API. " + error
            })
        }
    }
})