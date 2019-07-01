/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url are defined', function()
        {
            for (const allFeed of allFeeds) 
            {
                expect(allFeed.url).toBeDefined();
                expect(allFeed.url).not.toBe(0);
            }
            
        })

        /* This tests loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Names are defined', function()
        {
            for (const allFeed of allFeeds) 
            {
                expect(allFeed.name).toBeDefined();
                expect(allFeed.name.length).not.toBe(0);
            }
        });
    });


    /* New test suite named "The menu" */
        describe('The menu', function()
        {
         /*  Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        
           it('menu function is hidden', function()
           {
               var checkForClass=$('body').hasClass('menu-hidden')
               expect(checkForClass).toBe(true);
           });

        //Toggles on click event if menu apperas or disappears
        
        /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
        */
           it('working toggle on click event', function(){
              //first click
              $('.menu-icon-link').click();
              expect($('body').hasClass('menu-hidden')).toBe(false);

              //second click 
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);

           })
        });
       
        /* Test suite named "Initial Entries" */

    describe('Initial Entries', function()
    {
        //assign 
        beforeEach(function(done) 
        {
            loadFeed(0, function()
            {
                done();
            });
        });
        
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('Define if feed has atleast one entry', function(done)
        {
            var entry = document.querySelectorAll('.feed .entry');
            expect(entry.length).toBeGreaterThan(0); //check for at least one entry
            done();
        });

    });
        
        /* Test suite named "New Feed Selection" */
        describe('New feed selection', function()
        {
            var firstFeed;
            beforeEach(function(done)
            {
                loadFeed(0, function(){
                    //Tests if first feed is loaded 
                    console.log("first feed loading succesful");
                    //loads first entry and checks 
                    firstFeed=document.querySelector('.feed').innerHTML;
                    loadFeed(1, function(){
                        console.log("second feed loading successful");
                        done();
                    });
                });
            });
            //Tests to see if two entries are not equal 
        
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
            if('checks if two feeds are different', function(done)
            {
              var secondFeed= document.querySelector(".feed").innerHTML;
              expect(firstFeed).not.toEqual(secondFeed);
              done();
            });
        });   
}());
