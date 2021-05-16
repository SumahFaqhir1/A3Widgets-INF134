
// File name: demo.js

import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.move(100,150);
btn.setText('Button');

// btn.onclick(function(e){
// 	console.log(e.target);
//     // console.log(e.target)
//     // console.log(e)
// });

btn.stateChanged(function(event){
    console.log(event)
})


var check = new MyToolkit.CheckBox;
check.move(100,400);
check.setText('Option1')


check.stateChanged(function(event){
    console.log(event)
})

var text = new MyToolkit.textBox;
// text.move(10,10)


var check = new MyToolkit.CheckBox;
check.move(100,500);
check.setText('Option2')



var check = new MyToolkit.Radio(5);
check.move(100,600);
check.setText('Radio17')

var check2 = new MyToolkit.Radio(5);
check2.move(100,700);
check2.setText('Radio18')



var x = new MyToolkit.radioButtons(5);
console.log(x[1]);



// var check = new MyToolkit.Radio(4);
// check.move(100,700);
// check.setText('Radio2')

// var radio = new MyToolkit.Radio;
// radio.move(100,370);




