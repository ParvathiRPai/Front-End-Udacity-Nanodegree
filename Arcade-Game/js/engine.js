/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make 
 * writing app.js a little simpler to work with.
 */

 var Engine=(function(global)
 {
      /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc=global.document,
    win=global.window,
    canvas=doc.createElement('canvas');
    ctx = canvas.getContext('2d');
    var lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    //updating the gameboards
    function main()
    {
        var now =Date.now();
        dt=(now-lastTime)/1000;
        // call update function 
        update(dt);
        // call render function 
        render();
        // set lasttime to current time
        lastTime=now;
        //reset the browser 
        win.requestAnimationFrame(main);

    
    }
     /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init()
    {
        reset();
        lastTime=Date.now();
        main();
    }
    function update(dt)
    {
        updateEntities(dt);
    }
    // updates the bugs in app.js
    function updateEntities(dt)
    {
        bugs.forEach(function(bug)
        {
            bug.update(dt);
        });
        player.update();
        
    }

     // draw the board 
     function render()
     {
        var rowImages = [
            'images/water-block.png',   // Top row is water
            'images/stone-block.png',   // Row 1 of 3 of stone
            'images/stone-block.png',   // Row 2 of 3 of stone
            'images/stone-block.png',   // Row 3 of 3 of stone
            'images/grass-block.png',   // Row 1 of 2 of grass
            'images/grass-block.png'    // Row 2 of 2 of grass
        ],
        numRows=6,
        numCols=5,
        row, col;
       // Before drawing, clear existing canvas
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       for(row=0; row<numRows;row++)
       {
           for(col=0; col<numCols;col++)
           {
            ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
           }
       }
          renderEntities()
     }
     // define the bug and player in app.js render 
     function renderEntities()
     {
        
         bugs.forEach(function(bug)
         {
             bug.render();
         });
         player.render();
         
     }
     function reset()
     {

     }
       /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-horn-girl.png',
        'images/Gem Blue.png',
        'images/Gem Green.png',
        'images/Gem Orange.png'
    ]);
    Resources.onReady(init);
    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
 })(this);