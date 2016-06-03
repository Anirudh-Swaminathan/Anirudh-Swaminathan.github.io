var timeSet = 8000; //Some default value;
var ended = false;
function startIt(){
	//alert('In timeSet');
var xi = new Date();//year,month,date,hour,minute,second,millis
var temo = xi.getTime();
//var timeSet = 60000;
var toBe = new Date(temo+timeSet);
//alert('The deadline for this task is '+toBe.toDateString()+" :P ");
//Set the deadline.

var calcIt = function(){
	var now = new Date();
	//alert('The present date is '+now.toDateString());

	var minu = document.getElementById('minu');
	var seco = document.getElementById('seco');
	
	if(toBe<now && !ended){
		ended = true;
		finish = true;
		var docu = document.getElementById("updateScore");
		var moveItAni = max_moves+10-moves;
		docu.innerHTML = "Moves: "+moves+"<br/>Moves Left: "+moveItAni+"<br/>Score: "+ 0+"<br/>Click <a href='' id='try_again'>HERE</a> to try again";
		/*
		document.getElementById('try_again').onclick = function(){
			location.reload();
		}
		*/
		alert('GAME OVER!!!!');
		//The deadline has ended.
	}
	else if(!ended){
		var diff = toBe - now;
		//alert('The difference is '+diff);
		
		var day_diff = Math.floor(diff/(1000*60*60*24));
		//day.innerHTML = "Days <br/>"+day_diff;
		diff = diff%(1000*60*60*24);
		
		var hour_diff = Math.floor(diff/(1000*60*60));
		//hour.innerHTML = "Hours<br/>"+hour_diff;
		diff = diff%(1000*60*60);
		
		var min_diff = Math.floor(diff/(1000*60));
		minu.innerHTML = "Minutes <br/>"+min_diff;
		diff = diff%(1000*60);
		
		var sec_diff = Math.floor(diff/1000);
		seco.innerHTML = "Seconds <br/>"+sec_diff;
		diff = diff%1000;
		//Setting the divs with the time left.
		
		//alert('The diff is Days:'+day_diff+' Hours:'+hour_diff+' Minutes:'+min_diff+' Seconds:'+sec_diff);
	}
};
setInterval(calcIt,1000);
}
