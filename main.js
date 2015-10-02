var app = {};

$(function() { //when DOM is ready...
	app.users = new UserCollection([
		{username:'Joseph'},
		{username:'Nathaniel'},
		{username:'Adam'}
	]);








	app.tasks = new IssueCollection([

	]);
	app.gui = new GUI(app.users,
						app.tasks,
						'#app');
});
