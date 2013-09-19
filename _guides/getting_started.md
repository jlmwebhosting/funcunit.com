@page started Getting Started
@parent guides 0

@body

In this guide, we'll use FuncUnit to write functional tests for the jQuery UI 
autocomplete widget. We'll go over:

* Running a test in browser
* Writing a test
* Debugging a broken test

Note:

FuncUnit has two dependencies:

* jQuery - only on the test runner page
* QUnit or Jasmine

## Running Autocomplete Tests

Open _funcunit/test/autosuggest/autosuggest.html_ in a browser.  Type "J" in the input.  You'll see the following:

@image static/images/autosuggest.png


This page is a simple demo app, using [jQueryUI autocomplete](http://jqueryui.com/demos/autocomplete/). It 
shows results when you start typing, then you can click a result (or use mouse navigation) to populate the input.

There is a test already written.  Open <i>funcunit/test/autosuggest/autosuggest_test.js</i> in your IDE:

@codestart
module("autosuggest",{
  setup: function() {
    F.open('autosuggest.html')
  }
});

test("results appear",function(){
  F('input').visible().click().type("Java")

  // wait until we have some results
  F('.ui-menu-item').visible(function(){
    equal( F('.ui-menu-item').size(), 2, "there are 2 results")
  })
});
@codeend

As you can probably tell, the [funcunit.finding F method] is an alias for jQuery (*).  This test:

1. Opens autosuggest.html
1. Grabs the input element, clicks it, and types "Java"
1. Grabs the element that is populated with results, waits for it to be visible
1. Asserts that there are 2 results shown

(*) Actually its a [http://api.jquery.com/jQuery.sub/ copy] of jQuery that performs queries in 
the application window by default, and sometimes caches its selector to run asynchronously.

To run this test, open <i>funcunit/test/autosuggest/funcunit.html</i> in any browser (turn off your popup blocker).  The test will open and run.  The results are shown in the QUnit page:

@image static/images/qunit.png


## Writing an Autocomplete Test

Next we'll add a test for selecting a result with the keyboard.  FuncUnit's [apifuncunit API] consists of:

* [funcunit.finding The F Method] - Perform a query in the application window
* [funcunit.actions Actions] - Simulate user actions like [FuncUnit.prototype.click click],  [FuncUnit.prototype.type type],  [FuncUnit.prototype.drag drag]
* [funcunit.waits Waits] - Wait for a condition in your page to be met.  Fail the test if the condition isn't met before a timeout.
* [funcunit.getters Assertions & getters] - Synchronously check a condition in your page.

The setup and assertion methods are part of the [http://docs.jquery.com/Qunit QUnit] API.

Our test should do the following:

1. Type "JavaS" in the input.
1. Wait for a result to be visible.
1. Select the input and press the down and enter keys to select the first item.
1. Wait for the input to show "JavaScript".

Add the following under the first test:

@codestart
test("keyboard navigation",function(){
  F('input').visible().click().type("JavaS")

  F('.ui-menu-item').visible()
  F('input').type('[down][enter]')
    .val("JavaScript")
});
@codeend

A few important notes about this test:

1. We have no assertions. This is ok. Most FuncUnit tests don't need them. If the wait conditions aren't met before a timeout, the test will fail.  If the test completes, this feature is working.
1. The click, visible, and val methods are actually doing asynchronous things. FuncUnit lets you write tests with this linear syntax by queueing the actual methods and running them one by one. This is to prevent your tests from being an unreadable mess of nested functions like:

@codestart
F('.input').visible(function(){
  F('.input').click(function(){
    F('input').type("JavaS")
  })
})
@codeend

Reload the funcunit.html page and see your new test run and pass.

## Debugging tests

Now change .val("JavaScript") to .text("C#").  Reload the page and watch it timeout and fail.

@image static/images/broken.png


In this case, the error message shown is a good indication for why the test is broken. But often we need 
more visibility to debug a test.

Your first debugging instinct might be "Let's add a breakpoint!".  But, as noted, this 
code is running asynchronously.  When .val() runs, its adding a method to 
FuncUnit.queue, not actually doing the check.  When its this wait condition's turn to 
run, $("input").val() === "JavaScript" is checked repeatedly until its true or a timeout is reached.  

We can replace the string value with a checker function and use console.log to see what's going on. When 
previous queued methods finish, this function will run on repeat. Change that line to:

@codestart
  .val(function(val){
    console.log(val, this)
    if(val === "C#") return true;
  });
@codeend

"this" in your wait method is the element that .text is being run against.

## Conclusion

Hopefully, this guide illustrates how FuncUnit provides the holy grail of testing: easy, familiar syntax, in browser running for 
easy debugging, and simple automation.  

FuncUnit will transform your development lifecycle, give your developers confidence, and improve quality.


That's it! If you want to learn more, read about FuncUnit's [FuncUnit API](../docs) 
or check out some [funcunit.demos demos].