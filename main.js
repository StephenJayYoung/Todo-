var app = {};

$(function() { //when DOM is ready...
	app.users = new UserCollection([
		{username:'Person1', password: '1234'},
		{username:'Person2', password: '12345'},
		{username:'Person3', password: '123456'}
	]);

	app.issues = new IssueCollection([
		{title:'task1 title',
		description:'task1 description',
		status:'assigned'},
		{title:'task2 title',
		description:'task1 description',
		status:'unassigned'},
		{title:'task3 title',
		description:'task3 description',
		status:'assigned'}
	]);

app.gui = new GUI(app.users,
					app.issues,
					'#app');// selector of main div

})