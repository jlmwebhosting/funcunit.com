steal('funcunit', function() {
	module('todomvc');

	test('basic todo functionality', function() {
		F('#new-todo', 0).type('FuncUnit [enter]');
		F('#new-todo', 0).type('is [enter]');
		F('#new-todo', 0).type('awesome! [enter]');

		F('.toggle:not(:checked)', 0).click();
		F('.toggle:not(:checked)', 0).click();
		F('.toggle:not(:checked)', 0).click();

		//adding wait for dramatic effect
		F.wait(1000, function() {
			F('#clear-completed', 0).click();
			F('.todo.completed', 0).missing();
		});
	});
});