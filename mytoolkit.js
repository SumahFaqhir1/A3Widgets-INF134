import {SVG} from './svg.min.js';



var draw = SVG().addTo('body').size('120%','150%');


var MyToolkit = (function() {

    var scrollBar = function(height)
    {
        var frame = draw.group();
        var rect = draw.rect(30,height).fill('white').stroke('black').radius(10)
        //actual scroll toggle 
        var smallScroll = draw.rect(30,height/3).fill('black')
        //set direction of scroll 
        var direction = 'none'
        this.stateEvent = null
        this.defaultState = 'idle'
        var limit = height + 80
        //make sure the toggle is actually being clicked and not just hovered over
        var mouseClick = false


        frame.add(rect)
        frame.add(smallScroll)


        smallScroll.mousedown(function(event){
            mouseClick = true
        });


        //if the mouse is dragging the scroll down, move according to the position
        smallScroll .mousemove(function(event){
            if (event.offsetY < limit && mouseClick == true)
            {
                smallScroll.move(rect.x, event.offsetY)                
            }

        })

        return {
            //move both the actual outline and the toggle 
            move: function(x, y) {
                rect.move(x,y)
                smallScroll.move(x,y)
                rect.x = x;
                rect.y = y;
            },
        }
    }


    var toggle = function()
    {
        //custom toggle with on and off property 
        var frame = draw.group();
        //outer rectangle
        var rect = draw.rect(75,40).fill('grey').rx("20").ry("20").opacity("0.4").stroke('black')
        //inner rectangle 
        var circle = draw.circle(39,39).fill('white').stroke('black').opacity("0.6")
        frame.add(rect)
        frame.add(circle)

        //default toggle is off
        var toggleOn = false;

  
        var clickEvent = null
        var stateEvent = null
        var defaultState = "unchecked"

        
        

        circle.click(function(event)
        {

            if (toggleOn == false)
            {
                //if toggle is off and is clicked, switch to on mode
                rect.fill({ color: 'green', opacity: "0.9"})
                circle.fill({ color: 'white'})
                circle.move(rect.x+35,rect.y)


                toggleOn = true
                defaultState = "toggle on"
                transition()
            }
            else if (toggleOn == true)
            {
                //if on and clicked, turn off toggle
                rect.fill({ color: 'white'})
                circle.fill({ color: 'grey'})
                circle.move(rect.x,rect.y)


                toggleOn = false;
                defaultState = "toggle off"
                transition()
                

            }
  
        })
        function transition()
        {
            if (stateEvent != null)
            stateEvent(defaultState)
        }

        rect.click(function(event)
        {
            //duplicate function just to make sure that the inner 
            // and outer toggle both take input and change

            if (toggleOn == false)
            {
                rect.fill({ color: 'green', opacity: "0.9"})
                circle.fill({ color: 'white'})
                circle.move(rect.x+35,rect.y)


                toggleOn = true
                defaultState = "toggle on"
                transition()
            }
            else if (toggleOn == true)
            {
                rect.fill({ color: 'white'})
                circle.fill({ color: 'grey'})
                circle.move(rect.x,rect.y)


                toggleOn = false;
                defaultState = "toggle off"
                transition()
            }
  
        })
        function transition()
        {
            if (stateEvent != null)
            stateEvent(defaultState)
        }



        return {
            move: function(x, y) {
                rect.move(x, y);
                circle.move(x,y)
                rect.x = x;
                rect.y = y;
            },
            stateChanged: function(eventHandler)
            {
                stateEvent = eventHandler

            },
        }
    }


    var progressBar = function(width, increment)
    {
        var bar = draw.group();
        //empty bar 
        var rect = draw.rect(width,40).fill('white').opacity("0.4").stroke('black')
        //actual progress thumbnail
        var thumb = draw.rect(0,40).fill('green')
        // var x = setInterval(scroll(width), 3000);

        scroll(width)
        //start the progress bar 


        var frame = draw.group();

         function scroll(width)
         {


            bar.add(rect)
            bar.add(thumb)

            for(let idx=increment; idx < width; idx++) {
              
                bar.add(thumb)
                //add the thumb again because it is updating frequently 

                var runner = thumb.animate().width(width).loop(200,1000,600)
                //run it for a 200 loop with delay 
                idx += 20
                increment += 20;
                //gradually increase the increment that was passed in as a parameter 

            }
        }
        


        return {
            move: function(x, y) {
                bar.move(x, y);
                // thumb.move(x,y)
            },
            getIncrement: function() {
                //returns the current increment level 
                return increment
            },
            incrementValue: function(newIncrement) {
                var newIncrement = (width*(newIncrement))/100
                increment = newIncrement
                scroll(newIncrement)
                //changes increment and continues again 
        },
        }
        

    }

    var textBox = function()
    {
        var frame = draw.group();
        frame.rect(400,100).stroke("orange").fill("white")
        //frame of the textbox
        frame.click(function(event){
            console.log("window")
            console.log(event)
        })

        var text = frame.text("").move(40,42)

        frame.mouseover(function(){
            //animate caret when hovered over and move 
            var caret = frame.rect(2,15).move(frame.x,frame.y)
            var runner = caret.animate().width(0)
            runner.loop(1000,1,0) 
           

        })

            SVG.on(window, 'keyup', (event) => {
                //when text is entered in, recieve it 
            text.text(text.text() + event.key)
            update()
            // caret.x(text.length() + 40)

            
        })

        function update()
        {
            caret.x(text.length() + 40)

        }


   

        return {
            move: function(x,y)
            {
                //move both the caret and the actual frame
                frame.move(x,y)
                // caret.move(x,y)
                frame.x = x
                frame.y = y
            },

            getText: function()
            {
             //get the text input by the user 
                
            }
        }
      
    }




    var Button = function(){
        var button = draw.group();


        var rect = draw.rect(100,50).fill('gray').rx("20").ry("20").opacity("0.4").stroke('black')
        //outer rectangle for button
        var clickEvent = null
        var stateEvent = null
        var defaultState = "idle"
        //default is idle because we don't want anything pressed


        button.add(rect);


        rect.mouseover(function(){
            // console.log(rect.mouseover)
            this.fill({ color: 'blue'})
            defaultState = "hover"
            transition()

        })
      
        rect.mouseout(function(){
            this.fill({ color: 'gray'})
            defaultState = "idle"
            transition()
            //if state changes, use the transition function to capture new changes 
        })
        rect.mouseup(function(){
            this.fill({ color: 'gray'})
            defaultState = "idle"
            transition()
        })
     

        rect.mousedown(function()
        {
            this.fill({color:'pink'})
            defaultState = "pressed"
            transition();
        })
        

        rect.mousemove(function(event)
        {

           if (stateEvent != null) 
           {
               stateEvent(defaultState)
           }

        })

        function transition()
        {
            //default state is null but if not, pass in new to stateEvent()
            if (stateEvent != null)
            stateEvent(defaultState)
        }



        return {
            move: function(x, y) {
                rect.move(x, y);
                rect.x = x;
                rect.y = y;
                //move everything when the button is moved 
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },

            stateChanged: function(eventHandler)
            {
                stateEvent = eventHandler

            },

            

            setText: function(text)
            {
                var text = draw.text(text).attr({x:60, y:50});
                text.font({anchor: 'middle',fill: 'black', size: 25, family: 'Helvetica'});
        
                button.add(text);
                text.move(rect.x + 15,rect.y+10);
                //centering the buttons
                //passing in the x and y values for the buttons
            }
        }
    }

    var CheckBox = function(){
        var checked = false
        var CheckBox = draw.group();
        var rect = draw.rect(40,40).fill('white').stroke('black')
        //rect for the checkbox 
        
        var clickEvent = null
        var stateEvent = null
        var defaultState = "unchecked"
        //default is empty/unchecked until user selects

        CheckBox.add(rect);


    
    
        rect.click(function(event){

            this.fill({ color: 'black'})
                
            if (this.fill() == 'white')
            {
                //if unchecked and white, the state is unchecked 
                this.checked  = false;
                defaultState = "unchecked"
                transition()

            }

            if (this.checked == false)
            {
                //if checked after the state was unchecked
                this.fill({ color: 'gray'})
                this.checked = true
                defaultState = "checked"
                transition()
            }

            else if (this.checked != false)
            {
                //restore to the default state if unchecked again 
                this.fill({ color: 'white'})
                this.checked = false;
                defaultState = "unchecked"
                transition()
                

            }

        })

        function transition()
        {
            if (stateEvent != null)
            stateEvent(defaultState)
            //change from selected to unselected and vice versa 
        }

        
        return {
            move: function(x, y) {
                rect.move(x, y);

                rect.x = x;
                rect.y = y
            },

 
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            setText: function(text)
            {
                //sets the text at the right of the button
                var text = draw.text(text);
                text.font({anchor: 'middle',fill: 'black', size: 25, family: 'Helvetica'});
                //anchors the text near the middle 
                CheckBox.add(text);
                text.move(rect.x + 50, rect.y+5);
                //centering the buttons
                //passing in the x and y values for the buttons
            },

            stateChanged: function(eventHandler)
            {
                stateEvent = eventHandler

            },

            
        }

    }


    var radioButtons = function(num,names){
        //parameter is an array of the number of widgets they want to create and the names for them 
        let totalElems = num;
        var namesArray = [];
        namesArray.push(names)

        var stateEvent = null
        var defaultState = 'unselected'


        const groupName = "radioGroup";
        let radioButtons = [];


        var radio = draw.group();
        var trackY = 1;
        var buttonGroup = []



        //takes all the parameters and puts them in an array for future use 
        for(let idx=0; idx < totalElems; idx++) {
            if (idx == 1)
            {
                radioButtons.push([names[idx],'checked'])
            }

            radioButtons.push([names[idx],'unchecked'])

        }



        //draw the outer circle and inner circles in a loop for all the buttons
        for (var idx = 0; idx < radioButtons.length; idx++){
            var circle = draw.circle(30,30).fill('white').stroke('black')

            circle.move(0,trackY)
            var radioText = draw.text(radioButtons[idx][0]).move(40,trackY+5)
            //if the property has been checked, mark as selected in the UI
            if (radioButtons[idx][1] == 'checked'){
                var button = draw.circle(25).fill('#Black')
                button.move(1, trackY+3)
                button.hide()
            }
            //add all the components to an actual button and a list of buttons
            buttonGroup.push(circle)
            radio.add(circle)
            radio.add(button)
            radio.add(radioText)

            trackY += 50
            //add space between the elements so they aren't cluttered 

        }

     
        buttonGroup.map(e => e.node.addEventListener("click", function()
        {
            //make sure only one value is selected at a time 
            button.show();
            button.move(e.x()+2, e.y()+2);
            defaultState = "Selected"
            transition()

        }));

        
        function transition()
        {
            if (stateEvent != null)
            stateEvent(defaultState)
        }


     
        return{
            move: function(x, y) {
                radio.move(x, y);
            },
            stateChanged: function(eventHandler)
            {
                stateEvent = eventHandler

            },
        }

    }



  

    




return {Button, CheckBox, textBox, scrollBar, progressBar, toggle, radioButtons}
}());

export{MyToolkit}

