var GUI = (function(){ //IIFE for all Views

//Code for AddTaskView
var AddTaskView = Backbone.View.extend({
    // className: 'modal',

    render: function(){
      var $form = $('<form>');
      var $title = $('<input type="text" name="title" id="title" placeholder="task title">');
      var $description = $('<input type="text" name="description" id="description" placeholder="task description">');
      var $dueDate = $('<input type="text" name="dueDate" id="dueDate" placeholder="task due date">');
      var $importance = '<select id = "dropdown">';
      var $submit = $('<button id="submit">Submit</button>');
      $form.append([$dueDate, $title, $description, $importance, $submit] );
      this.$el.html($form);
    },

    initialize: function(){
      $('#app').append(this.$el);
      this.listenTo(app.tasks, 'delete', this.deleteIt);
      this.listenTo(app.tasks, 'edit', this.editIt);
      this.listenTo(app.tasks, 'complete', this.completeIt);
    },

    events: {
      'click #submit' : 'addTask',
      'click #edit' : 'editIt',
      'click #complete' : 'completeIt',
      'click #delete' : 'deleteIt'
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
      app.tasks.create(task);
      var all ='<div>' +'<b>title: </b>' + task.title + ' ' + '<b>description:</b>' + task.description + ' ' + '<b>due date: </b>' + task.dueDate + '</div>' + '<button id="edit">Edit Task</button>' + '<button id="complete">Complete Task</button>' + '<button id="delete">Delete Task</button>';
      $('#app').append(all);
      this.remove();
      // var assignedTasksView = new AssignedTasksView();
      // assignedTasksView.render();

      // $('#app').removeClass('faded');
    },
        editIt: function() {
        console.log("edit the things");
    },
        completeIt: function() {
        console.log("complete the things");
    },
        deleteIt: function() {
          console.log("dlete the things");
     }
  });
//End code for addTaskView


//Code for AssignedTaskView

  // var AssignedTasksView = Backbone.View.extend({
  //   render: function () {
  //     var $Buttons = $('<button id="editTask">Edit Task</button>' + '<button id="completeTask">Complete Task</button>' + '<button id="deleteTask">Delete Task</button>');
  //     this.$el.html($Buttons);

  //   },
  //   initialize: function () {
  //   this.render();
  //     $('#app').append(this.$el);
  //     this.listenTo(app.tasks, 'change', this.render);

  //   },
  //   events : {

  //   },

  //   },
  // });

//End Code for Assigned TaskView



//Code for UserTaskView////////////////////////////
  // var UserTasksView = Backbone.View.extend({
  //  //  tagName: 'div',
  // 	// className: 'UserTasksView column',

  // 	render: function () {
		// 	var usernames = UserModel.model.get("value");
		// 	this.$el.html('<h1>My Tasks</h1>');

  //     for(var i = 0; i < app.tasks.length; i++){
  //       if(app.tasks.at(i).get('assignee') == app.currentUser){
  //         var viewB = new TaskView({model: app.tasks.at(i)});
  //         this.$el.append(viewB.$el);
  //       }
  //   }

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
    // id : 'UserView',
    initialize: function () {
      // this.listenTo(app.tasks, 'sync', this.hi);
      // app.tasks.on('sync', this.hi);
      // app.tasks.fetch();
      },
  	render: function() {
			var $header   = $('<div id="greeting">');
			var greeting = '<h1>Hi, '+ app.currentUser + '!</h1>';
			var btn = '<button id="newTask">Create A New Task</button>';
      var logout   = '<button id = "logout">Log-Out</button>';
      var all =  greeting + btn + logout;
		this.$el.html(all);

      $('#app').append(this.$el); // TODO: check if this works or not?
	  },

    hi: function() {
      console.log("you have successfully listened to a sync event");
    },
    events: {
      'click #newTask' : 'newTask',
      'click #logout'  : "logout"
    },
    display: function() {
      console.log("you are clicking logout");
       app.router.navigate('loggedout', true);
       this.remove();
    },
    newTask: function () {
      var addTask = new AddTaskView();
      addTask.render();
      this.$el.append(addTask.$el);
    },

  	logout: function() {
  		// this.$el.empty();
      $('#app').html('');
  		app.gui.switchToLogin();
  	}
});
//End Code for UserView///////////////////////



//Code for the Login View ////////////////////////////////
var LoginView = Backbone.View.extend({
  // id : 'LoginView',
	render: function() {
		var button = '<button id = "login">Login</button>';
    // app.users.fetch();
		var users = app.users.pluck("username");
    // console.log('client sees these users',app.users);
		var dropdown = '<select id = "dropdown">';
    users.forEach(function(element){dropdown += "<option>"+element+"</option>";});
		dropdown += ('</select>');
		var title = '<h1>Please Choose A Username</h1>';
    var title1 = '<br><br><h3>Not A User? Sign Up:</h3>';
    var form = '<form id = "form"><input id = "input" placeholder="Add a user"></input><button type = "submit" id = "submit">Submit</button></form>';
		var all =  title + dropdown + button + title1 + form;
		this.$el.html(  all );
	},
	delete: function() {
			this.$el.html('');
	},
	initialize: function() {
		this.listenTo(app.users, "update", this.render);
    // this.listenTo(app.users, 'change', this.render);
    app.users.fetch();
    app.tasks.fetch();
    console.log(app.tasks.fetch);
    // app.users.invoke('save');
    this.render();
	},
  display : function() {
    console.log("you are clicking login");
     app.router.navigate('loggedin', true);
     this.remove();
  },
	events: {
		"click #logout" : "logout",
		"click #login" : "login",
    'click #submit' : "newUser",
    // 'click #login' : 'display'
	},
	login: function() {
		app.currentUser = $('#dropdown').val();
    this.remove();
			app.gui.switchToUser();
	},
	logout: function() {
		this.$el.empty();
		this.remove();
		app.gui.switchToLogin();
	},
  newUser : function (event) {
    console.log('newUser event triggered');
    event.preventDefault();
    var username = $('#input').val();
    // app.users.fetch();
    app.users.create({username: username });
    // app.users.save();
  }

});

//End Code for Login View//////////////////////////////

function GUI(users,tasks,el) {
	this.switchToUser = function (){
		var userView = new UserView();
		userView.render();
		$('#app').append(userView.$el);
	};
	 this.switchToLogin = function() {
		 var login = new LoginView();
		 login.render();
		 $("#app").append(login.$el);
   };
	  var currentUser = this.currentUser;
    this.switchToLogin();
}

return GUI;
}())