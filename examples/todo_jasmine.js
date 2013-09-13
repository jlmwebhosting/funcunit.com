/*
If you're reading this source, there is an additional API option in the second parameter of F(). This is to denote frame.

eg: F('#id') will look in the window, however F('#id', 0) will look in window.frames[0].

This is not necessarily standard, however we're using an iframe on the demo page for style only.
 */

describe('TodoMVC', function(){
	it('should use the jasmine adapter', function() {
		F('#new-todo', 0).type('Jasmine! [enter]');
		F('#new-todo', 0).type('is [enter]');
		F('#new-todo', 0).type('awesome! [enter]');

		F('.toggle:not(:checked)', 0).click();
		F('.toggle:not(:checked)', 0).click();
		F('.toggle:not(:checked)', 0).click();

		F('#clear-completed', 0).click();
		F('.todo.completed', 0).missing();
	});
});