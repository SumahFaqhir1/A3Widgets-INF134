import {SVG} from './svg.min.js';


var draw = SVG().addTo('body').size('120%','150%');


var MyToolkit = (function() {
    var progressBar = function(width, increment)
    {

        return {
            getIncrement: function() {
                return increment
            },
        }


    }





    var scrollBar = function(height)
    {
        var button = draw.group();

        var rect = draw.rect(20,height).fill('white').opacity("0.4").stroke('black')
        var thumb = draw.rect(5,5).fill('red')

        button.add(rect)
        button.add(thumb)

        return {
            move: function(x, y) {
                rect.move(x, y);
                rect.x = x;
                rect.y = y;
            },
        }

    }

    




    var textBox = function()
    {
        var frame = draw.group();
        frame.rect(400,100).stroke("orange").fill("white")
        frame.click(function(event){
            console.log("window")
            console.log(event)
        })

        var text = frame.text("").move(40,42)
        // var caret = frame.rect(2,15).move(50,50)
        // var runner = caret.animate().width(0)
        // runner.loop(1000,1,0)

        

        // SVG.on(window, 'keyup', (event) => {
        //     text.text(text.text() + event.key)
        //     caret.x(text.length() + 40)

            
        // })


        frame.mouseover(function(){
            var caret = frame.rect(2,15).move(50,50)
            var runner = caret.animate().width(0)
            runner.loop(1000,1,0)

            




            // runner.loop(1000,1,0)





            
            // console.log(rect.mouseover)
            // var caret = frame.rect(2,15).move(50,50)
            // var runner = caret.animate().width(0)
            // runner.loop(1000,1,0)


            
           

        })

            SVG.on(window, 'keyup', (event) => {
            text.text(text.text() + event.key)
            update()
            // caret.x(text.length() + 40)

            
        })

        function update()
        {
            caret.x(text.length() + 40)

        }


   

        return {
            // getText: function()
            // {
            //     SVG.on(window, 'keyup', (event) => {
            //         text.text(text.text() + event.key)
            //         caret.x(text.length() + 40)
        
            //     })
                
            // }
        }
      

        // return frame;

        // frame.move(10,10)


    }






    var Button = function(){
        var button = draw.group();


        var rect = draw.rect(100,50).fill('gray').rx("20").ry("20").opacity("0.4").stroke('black')
        
        var clickEvent = null
        var stateEvent = null
        var defaultState = "idle"


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
        })
        rect.mouseup(function(){
            this.fill({ color: 'gray'})
            defaultState = "idle"
            transition()
        })
        // rect.click(function(event){
        //     // console.log(event.type)
        //     this.fill({ color: 'orange'})
        //     if(clickEvent != null)
        //         clickEvent(event)
        // })



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
            if (stateEvent != null)
            stateEvent(defaultState)
        }



        return {
            move: function(x, y) {
                rect.move(x, y);
                rect.x = x;
                rect.y = y;
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
        
        
        var clickEvent = null
        var stateEvent = null
        var defaultState = "unchecked"

        CheckBox.add(rect);


    
      
        // rect.mouseout(function(){
        //     this.fill({ color: 'white'})
        // })
        // rect.mouseup(function(){
        //     this.fill({ color: 'white'})

        // })

    
        rect.click(function(event){

            this.fill({ color: 'black'})

            if (this.fill() == 'white')
            {
                this.checked  = false;
                defaultState = "unchecked"
                transition()

            }

            if (this.checked == false)
            {
                this.fill({ color: 'gray'})
                this.checked = true
                defaultState = "checked"
                transition()
            }

            else if (this.checked != false)
            {
                this.fill({ color: 'white'})
                this.checked = false;
                defaultState = "unchecked"
                transition()
                

            }

            // if(clickEvent != null)
            //     clickEvent(event)

        })

        function transition()
        {
            if (stateEvent != null)
            stateEvent(defaultState)
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
                var text = draw.text(text);
                text.font({anchor: 'middle',fill: 'black', size: 25, family: 'Helvetica'});
        
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

    var radioControl = function(array){







        return {
            createNew: function(array) {
                for(let i=0; i <= array.length; i) {
                    



                }
            },
            create: function(value)
            {
                var radio = draw.group();
                var circle = draw.circle(40,40).fill('white').stroke('black')
                var clickEvent = null

                radio.add(circle);

            }
        }
     






    }




    var radioButtons = function(num){
        let totalElems = num;
        const groupName = "radioGroup";
        let radioButtons = [];

        for(let idx=0; idx < totalElems; idx++) {
            let input = document.createElement("input");
            input.name = groupName;
            //+1 so we don't label them according to their index position
            input.value = (idx+1); 
            input.type = "radio";
            //let's set the last element to checked
            if(idx === 3) {
                input.checked = "checked";
            }
            radioButtons.push(input);
        }
        radioControl(radioButtons);
        return radioButtons;
    }





  

    



    var Radio = function(num){
        var checked = false

        var i; 
        console.log(num)


        // for (i=0; i<=num; i++)
        // {
            // console.log('for loop')
            // var radio = draw.group();
            // var circle = draw.circle(40,40).fill('white').stroke('black')
            // var clickEvent = null
    
            // radio.add(circle);

            // console.log(radio)




            // console.log(circle.x)

            
        // }



        




        var radio = draw.group();
        var circle = draw.circle(40,40).fill('white').stroke('black')
        var clickEvent = null

        radio.add(circle);


    
      
        // rect.mouseout(function(){
        //     this.fill({ color: 'white'})
        // })
        circle.mouseup(function(){
            this.fill({ color: 'white'})

        })

    
        circle.click(function(event){

            this.fill({ color: 'black'})

            if (this.fill() == 'white')
            {
                this.checked  = false;
            }

            if (this.checked == false)
            {
                this.fill({ color: 'gray'})
                this.checked = true
            }

            else if (this.checked != false)
            {
                this.fill({ color: 'white'})
                this.checked = false;

            }

            if(clickEvent != null)
                clickEvent(event)

        })
        
        return {
            move: function(x, y) {
                circle.move(x, y);

                circle.x = x;
                circle.y = y
            },

 
            onclick: function(eventHandler){
                clickEvent = eventHandler
            },
            setText: function(text)
            {
                var text = draw.text(text);
                text.font({anchor: 'middle',fill: 'black', size: 25, family: 'Helvetica'});
        
                radio.add(text);
                text.move(circle.x + 50, circle.y+5);
                //centering the buttons
                //passing in the x and y values for the buttons
            },

            
        }

    }
    



return {Button, CheckBox, textBox, scrollBar, Radio, radioButtons}
}());

export{MyToolkit}

