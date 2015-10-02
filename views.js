var GUI = (function(){ //IIFE for all Views

//Code for the Login View ////////////////////////////////
var LoginView = Backbone.View.extend({
  id : 'LoginView',
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

function GUI(users,issues,el) {

	var login = new LoginView({collection: users});
	login.render();
	$(el).append(login.$el);
 	};

return GUI;
}())