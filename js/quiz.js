// declaring variables for quizapp 

var is_next = false;
var is_prev = false;

var is_marked = false; // boolean to know type of ques

var history_of_index_arr = [];

// initalize of two array before start to avoid the 'undefined values'
var history_of_score_for_each_index = [0,0,0,0,0,0,0,0,0,0];
var arr_of_marked_ques = [];

var start = 0;
var counter = 0; // counter for questions

//////////////////////////////////////////////////////////////////////////////////////////////

// Setting timer for exam (five minutes)
var minutes = 4;
var seconds = 59;

var timer = setInterval (function () {

  document.getElementsByClassName('min')[0].innerHTML = minutes + ':';

  if (seconds >= 0 && seconds <=9) 
  	  document.getElementsByClassName('sec')[0].innerHTML = '0' + seconds;
  else
  	  document.getElementsByClassName('sec')[0].innerHTML = seconds;

  seconds--;

  if (seconds < 0) {
  	minutes--;
  	seconds = 59;
  }
  if (minutes == 0 && seconds <=29){

  	document.getElementsByClassName('timer')[0].style.backgroundColor="red";
  	document.getElementsByClassName('timer')[0].style.borderColor="red";
    $('.timer').animate({opacity: '0.4'}, "slow");
    $('.timer').animate({opacity: '0.9'}, "slow");
  }

  if (minutes < 0){
  // show the time out page
  var myLen = history_of_score_for_each_index.length;
  var score = 0;
    for (var i=0; i<myLen; i++){
      score += history_of_score_for_each_index[i];
     }
     // location.replace("timeOut.html?score="+ score)
      location.replace("timeOut.html?score="+ score +"&name="+ Name)
  }
},1000);

//////////////////////////////////////////////////////////////////////////////////////////////

// generating random non-repated index for question part
var arr_of_used_index=[];
function generate_index(){

  var flag = 1;
  var Random_num = Math.floor((Math.random() * 10) + 0);
  var len = arr_of_used_index.length;

  for (var i=0; i< len; i++ ){
    if (Random_num == arr_of_used_index[i])
      flag = 2;
  }

  if (flag == 2){
    return generate_index();
  }
  else {
    arr_of_used_index.push(Random_num);
    return Random_num;
  }
}



// generating random non-repated index for answer part 
var arr_of_used_index_ans = [];
function generate_index_ans(){

  var flag = 1;
  Random_num_ans = Math.floor((Math.random() * 4) + 0);
  var len = arr_of_used_index_ans.length;

  for (var i=0; i< len; i++ ){
    if (Random_num_ans == arr_of_used_index_ans[i])
      flag = 2;
  }

  if (flag == 2){
    return generate_index_ans();
  }
  else {
    arr_of_used_index_ans.push(Random_num_ans);
    return Random_num_ans;
  }
}

// generating 4 non repeated index for each answer by calling generate_index_ans() untill length of arr = 4
function array_of_four_diff_index(){

  while (arr_of_used_index_ans.length !=4){
     generate_index_ans();
}
   return arr_of_used_index_ans;
}

//////////////////////////////////////////////////////////////////////////////////////////////


// function constructor for question object
function Questions(){

  this.questions = [
                    "What does HTML stand for?",
                    "Who is making the Web standards?", 
                    "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?", 
                    "Which character is used to indicate an end tag?",
                    "In HTML-which attribute is used to specify that an input field must be filled out?",
                    "The HTML canvas element is used to:",
                    "What does CSS stand for?",
                    "Which HTML attribute is used to define inline styles?",
                    "Which input type defines a slider control?",
                    "In HTML, onblur and onfocus are:"
                  ];
            }

Questions.prototype.display_ques =  function (index){
   // console.log(history_of_index_arr);

     // if (!is_marked && !is_prev){
        if (!is_prev && !is_next && !is_marked){
         if (start >= 0 && start <=9 )
         {
         history_of_index_arr[start] = index;
         start++;
        }
      }

         $('h3').remove();
         $('<h3>'+ this.questions[index] +'</h3>' ).appendTo('.questions');

          is_marked = false;
          is_prev = false;
          is_next = false;

         // mark button display block if it is normal questions flowing (not marked question)
         document.getElementsByClassName('mark')[0].style.display = 'block';
           // console.log(history_of_index_arr);
}


//////////////////////////////////////////////////////////////////////////////////////////////

// function constructor for answer object
function Answers(){
  this.answers = [ 
            ['Hyperlinks and Text Markup Language', 'Hyper Text Markup Language', 'Home Tool Markup Language', 'None of them'],
            ['Google','Microsoft','Internet Explorer','World Wide Web Consortium W3C'],
            ['alt', 'title', 'longdesc', 'src'],
            ['.', '>', '<', '/'],
            ['placeholder', 'required', 'validate', 'formvalidate'],
            ['manipulate data in MySQL','create draggable elements','display database records','draw graphics'],
            ['Computer Style Sheets', 'Colorful Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets'],
            ['font','class','style','styles'],
            ['slider', 'search', 'control', 'range'],
            ['Event attributes','HTML elements','Style attributes', 'None of them']
        ];

  this.right_answers = ['Hyper Text Markup Language','World Wide Web Consortium W3C', 'alt', '/', 'required',
                        'draw graphics', 'Cascading Style Sheets','style', 'range', 'Event attributes' ];
}

Answers.prototype.display_ans = function(index){

   $('label').remove();
   // calling function to produce array of length 4 which have random number from [0 to 3]
   var arr = array_of_four_diff_index();
  // console.log(arr);

  $('<label onclick="evaluate_me()">'+ this.answers[index][ arr[0] ] + '<input value="1" type="radio" name="q"><br></label>').appendTo('form');
  $('<label onclick="evaluate_me()">'+ this.answers[index][ arr[1] ] + '<input value="2" type="radio" name="q"><br></label>').appendTo('form');
  $('<label onclick="evaluate_me()">'+ this.answers[index][ arr[2] ] + '<input value="3"type="radio" name="q"><br></label>').appendTo('form');
  $('<label onclick="evaluate_me()">'+ this.answers[index][ arr[3] ] + '<input value="4" type="radio" name="q"><br></label>').appendTo('form');

  // make array of used answer index empty for another use
  arr_of_used_index_ans = [];
}

//////////////////////////////////////////////////////////////////////////////////////////////

// style ONLY the selected answer
$(".container").on("click","input[type='radio']", function(){
  var myInput = document.getElementsByTagName('input');

  for (var i=0; i<myInput.length ; i++){
    if (myInput[i] == this)
      $(this).parent().toggleClass("styleSelected");
    else
      $(myInput[i]).parent().removeClass("styleSelected");
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////

// starting our Quiz by 
// [1] generating index to display random question
// [2] display answers
// [3] display initial counter -> 1
var instance_q = new Questions();
var index = generate_index();
instance_q.display_ques(index);

var instance_ans = new Answers();
instance_ans.display_ans(index);
get_the_count(index,'initial');

//////////////////////////////////////////////////////////////////////////////////////////////

// check the answer and score
function evaluate_me(){

  // if (is_marked)
  //   index = marked_indx;

    var selected = $('input[name=q]:checked', '#myForm').parent().text();

        if (selected == instance_ans.right_answers[index] )
          history_of_score_for_each_index[index] = 1;
        else
          history_of_score_for_each_index[index] = 0;
}


//////////////////////////////////////////////////////////////////////////////////////////////

function get_the_count(index, string){

  for (var i =0; i<history_of_index_arr.length; i++)
    if (index == history_of_index_arr[i])
      break;

  if (string == 'initial')
    counter = 1;

  if (string == 'next'){
    if (counter!=10)
    counter++;
  }

  if (string == 'prev'){
    if (counter!=1)
    counter--;
  }

 if (string == '')
   counter = i+1;

  $('div.counter').text(counter);
}

//////////////////////////////////////////////////////////////////////////////////////////////


//when clicking on next button
function next_ques(){


  // if (is_marked)
  //   index = marked_indx;

  get_the_count(index,'next');

  for (var i =0; i<history_of_index_arr.length; i++){
    if (index == history_of_index_arr[i]){
      var myIndx = history_of_index_arr.length-1;

      if (i==9){
         throw 'I know.';
         break;
       }
      else{  // two condition [1] navigation in history [2]generate new ques
         if (i < myIndx)
         {
            index = history_of_index_arr[i+1];
            is_next = true;
            break;
            }
        else{
          index = generate_index();
          break;
        }
      }

    }
  }

  instance_q.display_ques(index);
  instance_ans.display_ans(index);  
  console.log(history_of_index_arr);
  console.log(index);
}


//////////////////////////////////////////////////////////////////////////////////////////////

function prev_ques(){

  // if (is_marked)
  //   index = marked_indx;

  //console.log(history_of_index_arr);

  get_the_count(index,'prev');
  is_prev = true;
  var myvar;

  for (var i =0; i<history_of_index_arr.length; i++){
    if (index == history_of_index_arr[i]){

      if (i==0){
         throw 'I know.';
         break;
       }

      else{
        myvar = history_of_index_arr[i-1];
        index = myvar;
        console.log(index);
      //  console.log(i);
        break;
      }

    }
  }


  instance_q.display_ques(index);
  instance_ans.display_ans(index);

  console.log(history_of_index_arr);
}

//////////////////////////////////////////////////////////////////////////////////////////////

function submit(){  
  var myLen = history_of_score_for_each_index.length;
  var score = 0;
    for (var i=0; i<myLen; i++){
      score += history_of_score_for_each_index[i];
     }
    // location.replace("result.html?score="+ score);
     location.replace("result.html?score="+ score +"&name="+ Name)
}


//////////////////////////////////////////////////////////////////////////////////////////////

// var marked_indx;
function display_marked(c_index){
  is_marked = true;

  console.log('marked index: '+ c_index );

    instance_q.display_ques(c_index);
    instance_ans.display_ans(c_index);
    get_the_count(c_index,'');
   
     index = c_index;

   // // prevent mark the marked question itself !!
   // document.getElementsByClassName('mark')[0].style.display = 'none';
   
}


//////////////////////////////////////////////////////////////////////////////////////////////

function mark_ques(){


  var current_index = index; 
  var cnt = counter;

  if (arr_of_marked_ques[cnt-1] != 'marked'){
    $('<div class="side_list" onclick="display_marked('+ current_index +')"> Mark Question '+ cnt + '</div>').appendTo('div.marked_ques');
    arr_of_marked_ques[cnt-1] = 'marked';
    next_ques();
   }
   else
   {
    alert('You already marked this question!. ')
   }

   console.log('marked index: '+ current_index );
   console.log('array of marked:'+ arr_of_marked_ques);
}
