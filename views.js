var GUI = (function(){ //IIFE for all Views


var LoginView = Backbone.View.extend ({
console.log('logged in');

});

function GUI(users,issues,el) {

	var login = new LoginView({collection: users});
	login.render();
	$(el).append(login.$el);
 	};

return GUI;
}())