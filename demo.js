
// File name: demo.js

import {MyToolkit} from './mytoolkit.js';



//button
var btn = new MyToolkit.Button;
btn.move(100,150);
btn.setText('Button');

btn.stateChanged(function(event){
    console.log(event)
})

//checkbox
var check = new MyToolkit.CheckBox;
check.move(100,400);
check.setText('Option1')

check.stateChanged(function(event){
    console.log(event)
})

//radio buttons
var y = new MyToolkit.radioButtons(2, ['Radio1', 'Radio2'])
y.move(400,300)
y.stateChanged(function(event){
    console.log(event)
})


//scroll bar 
var y = new MyToolkit.scrollBar(400);
y.move(50,200)


//progress bar
var y = new MyToolkit.progressBar(500, 100);
y.move(100,900)
// y.setIncrement(50)
y.incrementValue(100)


//custom toggle switch
var z = new MyToolkit.toggle();
z.move(100,800)
z.stateChanged(function(event){
    console.log(event)
})


//Text Box
var text = new MyToolkit.textBox;
text.move(100,40)



