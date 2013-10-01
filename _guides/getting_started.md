@page started Getting Started
@parent guides 0

@body

In this guide, we'll use FuncUnit to write functional tests for the [Srchr sample app](http://bitovi.github.io/srchr). We'll cover:

* How to get FuncUnit
* Enhancing unit tests
* Testing integration between widgets

Note:

FuncUnit has two dependencies:

* jQuery - only on the test runner page
* QUnit or Jasmine

## How to get FuncUnit

You can download [funcunit.js](/dist/latest/funcunit.js), or install as a bower component:

    bower install funcunit

All examples below can be downloaded [here.](/dist/examples.zip)

## Enhancing unit tests

This section will take a basic QUnit test and use FuncUnit to simulate user interaction.

Instead of using the built in QUnit assertions, you can use any of FuncUnit's [waits](/guides/funcunit.waits.html).

    test('Hello World!', function() {
        F('.sample').text('Hello World!', 'h1 should have text hello world');
    });

_Note: Included in the [examples package](/dist/examples.zip) is a "Hello World" Jasmine spec._

## Testing a UI widget

This section will test a single UI widget, using QUnit from the [Srchr](http://bitovi.github.io/srchr) app. Specifically, the Tabs widget will be explained here, however Srchr has many FuncUnit tests for each widget.

Srchr is built using [StealJS](http://javascriptmvc.com/docs/stealjs.html) and [CanJS](http://canjs.com).

Setup is similar to any unit testing approach:

    steal('ui/tabs', 'funcunit', function(Tabs, F) {

        //Some DOM we'll use for testing the Tabs widget
        var tabsHTML ="<ul id='resultsTab'>\
            <li><a class='flickr' href='#flickr'>Flickr</a></li>\
            <li><a class='yahoo' href='#yahoo'>Yahoo</a></li>\
            <li><a class='upcoming' href='#upcoming'>Upcoming</a></li>\
            </ul>\
            <div id='flickr' class='tab'>one</div>\
            <div id='upcoming' class='tab'>three</div>\
            <div id='yahoo' class='tab'>two</div>";

        //Using QUnit's setup/teardown methods,
        //create a Tabs widget before each test, then clean up the DOM after
        module("ui/tabs",{
            setup : function(){
                $("#qunit-test-area").html(tabsHTML);
                this.flickrLI = $("#resultsTab li:eq(0)");
                this.upcomingLI = $("#resultsTab li:eq(1)");
                this.yahooLI = $("#resultsTab li:eq(1)");
            },
            teardown: function(){
                $("#qunit-test-area").empty();
            }
        });

        //tests will go here
    });

Now, test basic functionality for the Tabs widget. "Tabs" shows and hides panels based on the `click` event and setting respective CSS classes.

In the below example, notice: `F(".yahoo").click()`. This will trigger `mousedown`, `click` and `mouseup` accordingly, accurately depicting a true user click. `F("#yahoo").visible()` is a [wait](/guides/funcunit.waits.html) and can take a callback method. This method will execute after $('#yahoo') is visible on the page. This is helpful for elements that are animated in, as FuncUnit will poll for a given "wait" assertion.

    test("Proper hiding and showing", function() {
        var enabled  = can.compute(['flickr','yahoo','upcoming']);
        new Tabs("#resultsTab",{
            enabled: enabled
        });

        F(".yahoo").click();
        F("#yahoo").visible(function() {
            equal(F("#flickr").css('display'), 'none', "Old tab contents are hidden");
            ok(!F(".flickr").parent().hasClass('active'), 'Old tab is not set to active');
            ok(F(".yahoo").parent().hasClass('active'), 'New tab is set to active');
        });
    });

You can mix/match your built in assertion library as well as use FuncUnit's waits & actions to accurately depict user interaction.

## Testing integration between widgets

A more powerful use for FuncUnit is testing the interaction between widgets. Sometime's referred to as smoke or integration tests, FuncUnit provides an API to test an app via url.

_Note: It is recommend for this type of test to have a fixturized service layer such as [CanJS fixtures](http://canjs.com/docs/can.fixture.html) or use an isolated test database when service calls are present._

Use [F.open](/docs/FuncUnit.open.html) to open a new window with the url to test.

    steal('funcunit', function(F) {
        module('srchr', {
            setup: function() {
                F.open('srchr/srchr.html');
            }
        });
    });

FuncUnit keeps a reference to the new page and can run tests in an applications true state, as opposed to within a test div with standard unit testing.

Using FuncUnit's actions, waits and QUnit's built in assertions, we can test Srchr as a normal user might expect.

    test('Search shows results in selected service', function() {
        F('input[value=Reddit]').click();
        F('#query').click().type('Dogs\r');

        // wait until there are 2 results
        F("#Reddit li").exists(function() {

            ok(true, "We see results in Reddit");
            // make sure we see dogs in the history
            var r = /Dogs\s+r/i;

            ok(r.test(F("#history li.selected").text()), "we see dogs correctly");

            // make sure flickr and everyone else is diabled
            ok(F('#results li:contains(Flickr)').hasClass('disabled'), "Flickr is disabled.");
            ok(F('#results li:contains(Google)').hasClass('disabled'), "Google is disabled.");
        });
    });

## Conclusion

Hopefully, this guide illustrates how FuncUnit provides the holy grail of testing: easy, familiar syntax, in browser running for
easy debugging and simple automation.

FuncUnit will transform your development lifecycle, give your developers confidence and improve quality.

That's it! If you want to learn more, read about FuncUnit's [FuncUnit API](/docs).