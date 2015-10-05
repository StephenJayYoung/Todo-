var GUI = (function(){ //IIFE for all Views

// app.users = [ {name: "TEST", password: "TEST"} ];


//Code for AddTaskView
var AddTaskView = Backbone.View.extend({
    className: 'modal',

    render: function(){
      var $form = $('<form>');
      var $title = $('<input type="text" name="title" id="title" placeholder="task title">');
      var $description = $('<input type="text" name="description" id="description" placeholder="task description">');
      var $dueDate = $('<input type="text" name="dueDate" id="dueDate" placeholder="task due date">');
      var $importance = $('<input type="text" name="importance" id="importance" placeholder="importance">');
      var $submit = $('<button id="submit">Submit</button>');
      $form.append([$dueDate, $title, $description, $importance, $submit] );
      this.$el.html($form);
    },

    initialize: function(){
      $('#app').addClass('faded');
      this.render();
      $('#app').append(this.$el);
    },

    events: {
      'click #submit' : 'addTask'
    },

    addTask : function(event) {
      event.preventDefault();
      var task = {
        title : this.$el.find('#title').val(),
        description : this.$el.find('#description').val(),
        dueDate: this.$el.find('#dueDate').val(),
        importance: this.$el.find('#importance').val(),
        creator : app.currentUser
      };
      app.tasks.create( task );
      AssignedTasksView.render();
      console.log('task length is now ',app.tasks.length);
      this.remove();
      $('#app').removeClass('faded');
    },
  });
//End code for addTaskView


//Code for AssignedTaskView

  // var AssignedTasksView = Backbone.View.extend({
  //   tagName: 'div',
  //   className: 'AssignedTasksView column',
  //
  //   render: function () {
  //     // var usernames = UserModel.model.get("value");
  //     this.$el.html('<h1>Assigned Tasks</h1>');
  //
  //     for(var i = 0; i < app.tasks.length; i++){
  //       if(app.tasks.at(i).get('assignee') && app.tasks.at(i).get('assignee') !== app.currentUser){
  //         var viewB = new TaskView({model: app.tasks.at(i)});
  //         this.$el.append(viewB.$el);
  //       }
  //   }
  //
  //   },
  //   initialize: function () {
  //     this.listenTo(app.tasks, 'change', this.render);
  //     this.listenTo(app.tasks, 'update', this.render);
  //     app.tasks.fetch();
  //   },
  //   events : {
  //   },
  // });

//End Code for Assigned TaskView



//Code for UserTaskView////////////////////////////
  // var UserTasksView = Backbone.View.extend({
  //   tagName: 'div',
  // 	className: 'UserTasksView column',
  //
  // 	render: function () {
	// 		var usernames = UserModel.model.get("value");
	// 		this.$el.html('<h1>My Tasks</h1>');
  //
  //     for(var i = 0; i < app.tasks.length; i++){
  //       if(app.tasks.at(i).get('assignee') == app.currentUser){
  //         var viewB = new TaskView({model: app.tasks.at(i)});
  //         this.$el.append(viewB.$el);
  //       }
  //   }
  //
  // 	},
  // 	initialize: function () {
  //     this.listenTo(app.tasks, 'change', this.render);
  //     this.listenTo(app.tasks, 'update', this.render);
  //     app.tasks.fetch();
  // 	},
  // 	events : {
  // 	},
  // });
//End Code for UserTaskView///////////////////////////




//Code for UserView//////////////////////////
  var UserView = Backbone.View.extend({
    id : 'UserView',
    initialize: function () {
      this.render();
    },
  	render: function() {
      app.tasks.fetch();
      var addTaskView = new AddTaskView();
	  },
    events: {
    },
    newTask: function () {
      // var addTask = new AddTaskView();
      // addTask.render();
      // this.$el.append(addTask.$el);
    },
  	logout: function() {
      // $('#app').html('');
  		// app.gui.switchToLogin();
  	}
});
//End Code for UserView///////////////////////



//Code for the Login View ////////////////////////////////
var LoginView = Backbone.View.extend({
  id: 'LoginView',
	initialize: function() {
    this.render();
	},
	render: function() {
    var $loginForm = $('<form id="login-form">');
    var $loginUser = $('<input id="login-name" type="text" placeholder="test">  </input>');
    var $loginPassword = $('<input id="login-password" type="password" placeholder="password">  </input>');
    var $loginSubmit = $('<input type="submit" id="login-submit" value="submit">');
    // var $loginSubmit = $('<input type="submit" value="submit">';
    $loginForm.append($loginUser).append($loginPassword).append($loginSubmit);
    this.$el.append($loginForm);
    $('#app').html(this.$el);
	},
	events: {
    'submit #login-form' : 'login'
	},
	login: function(event) {
    event.preventDefault();
    var userName = $('#login-name').val().toUpperCase();
    var userPassword = $('#login-password').val().toUpperCase();
    var user = {
      name: userName,
      password: userPassword
    };
    $.ajax({
      method: "PUT",
      url: "/login",
      data: user
    })
    .done(function(tasks) {
      if (tasks == "incorrect password") {
        alert("incorrect password");
      }
      else if (tasks === false) {
        alert("no record of user");
      }
      else {
        $('#app').html('');
        var userView = new UserView();
        // tasks.map(function (val, index, array){
        //   app.tasks.create(val, {silent: true});
        // });
        localStorage.setItem('todoUserName', userName);
      }
    });
	}
});

//End Code for Login View//////////////////////////////

function GUI(users,tasks,el) {
  // var userView = new UserView();
  // userView.render();
  // $('#app').html(userView.$el);
  var loginView = new LoginView();
}
  return GUI;

}());
