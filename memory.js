//Number of rows and columns
var nr = 4;
var nc = 4;
var finish = false;
var score = 0;
var moves;
var max_moves = 10;
//The function that plays the game
function start(){
var arr = [];
var id=0;
var rid = 0;

var arr = ['barca.png','barca.png','bayern.png','bayern.png','chelsea.png','chelsea.png','dortmund.png','dortmund.png',
			'liverpool.png','liverpool.png','manu.png','manu.png','real_madrid.png','real_madrid.png','totten.png','totten.png'];
/*
for(var i=0; i<15; ++i){
	arr.push(i+1);
	arr.push(i+1);
}
*/
//Introducing the scores module to this game
//Flipping a pair consists of 1 move.
score = 10;
//The tolerance limit is 10 moves. After 10 moves,for each 
//move the user makes, the score decreases by 1 point.
//The user loses if the point reaches 0, but the board is not
//completely taken out.
moves = 0;
var clos = 0;

//Creating array of random images
for(var i=0; i<nc*nr-1; ++i){
	var a = Math.floor(Math.random()*nc*nr);
	var x = arr[i];
	arr[i] = arr[a];
	arr[a] = x;
}

//alert('Arr is '+arr);
//Populating tiles with random images
for(var i=0; i<nr; ++i){
	rid++;
	var newdiv = document.createElement("div");
	document.getElementById("game2").appendChild(newdiv);
	newdiv.className = 'row';
	newdiv.setAttribute('id',rid.toString()+"row");
	for(var j=0; j<nc; ++j){
		id++;
		var ele = document.createElement("div");
		document.getElementById(rid.toString()+"row").appendChild(ele);
		ele.className = "column";
		ele.setAttribute('id',id.toString());
		ele.setAttribute('data-inter',arr[id-1].toString());
		ele.setAttribute('clicka',true);
		ele.innerHTML = '';
	}
}

//onclick for the whole class
var x = document.getElementsByClassName("column");
var prev,now;
var isOpen = false;
var susp = false;
//alert(""+x);
var len = x.length;
for(var i=0; i<len; ++i){
	x[i].onclick = function(){
		if(this.getAttribute('clicka') === 'true' && !finish){
			
			if(susp === false){
				//alert('You clicked '+x[i].id+' Its parents id is '+x[i].parent.id+'\n innerHTML is '+x[i].innerHTML);
				//this.innerHTML = this.getAttribute('data-inter');
				//this.style.background = "#13e6db";
				this.style.background = "url("+this.getAttribute('data-inter')+") no-repeat";
				this.style.backgroundSize = 'cover';
				if(!isOpen){
					prev = this;
					isOpen = true;
				}
				else if(this.id != prev.id){
					//updating the number of moves.
					moves++;
					if(moves>max_moves) score--;
					if(score === 0){
						alert('Game Over!!!');
						finish = true;
						ended = true;
					}
					if(score<=3 && score != 0) alert('You have '+score+' moves left');
					
					now = this;
					isOpen = false;
					susp = true;
					//Unequal tiles
					if(prev.getAttribute('data-inter') != now.getAttribute('data-inter')){
						
						setTimeout(function(){prev.innerHTML = '';
						now.innerHTML = ''; 
						prev.style.background='url(spider.jpg) no-repeat';
						prev.style.backgroundSize='cover';	
						now.style.background='url(spider.jpg) no-repeat'; 
						now.style.backgroundSize='cover'; susp = false;},800);
					}
					//equal tiles
					else{
						//susp  = true;
						clos++;
						
						setTimeout(function(){prev.setAttribute('clicka',false);
						now.setAttribute('clicka',false); prev.innerHTML = ''; now.innerHTML = '';
						prev.style.backgroundColor = "yellow";
						now.style.backgroundColor = "yellow";
						susp = false;},800);
					}
				}
				//Same tile clicked
				else{
					alert('Please click a different tile from the one you just clicked');
				}
			}
			//The user is clicking too fast to see the tile he just opened
			else{
				alert('Don\'t click so fast!');
			}
		}
		//Coding for the scores
		if(!finish && clos === nr*nc/2) {finish = true; ended = true;}
		
		if(!finish){
			var docu = document.getElementById("updateScore");
			var moveItAni = max_moves+10-moves;
			docu.innerHTML = "Moves made: "+moves+"<br/>Moves Left: "+moveItAni+"<br/>Score: "+"<br/>Tiles Closed: "+clos*2;
		}
		else if(finish && clos === nr*nc/2){
			var docu = document.getElementById("updateScore");
			var moveItAni = max_moves+10-moves;
			docu.innerHTML = "Moves made: "+moves+"<br/>Moves Left: "+moveItAni+"<br/>Score: "+ score;
			if(score !=0) alert('Congratulations on finishing the game!!\nYour score is '+score);
			docu.innerHTML = "Moves: "+moves+"<br/>Score: "+ score+"<br/>Click <a href='' id='try_again'>HERE</a> to try again";
			document.getElementById('try_again').onclick = function(){
				location.reload();
			}
		}
		else{
			alert('Sorry, TIME\'S UP. Better luck next time');
			var docu = document.getElementById("updateScore");
			score = 0;
			var moveItAni = max_moves+10-moves;
			docu.innerHTML = "Moves: "+moves+"<br/>Moves Left: "+moveItAni+"<br/>Score: "+ score+"<br/>Click <a href='' id='try_again'>HERE</a> to try again";
			document.getElementById('try_again').onclick = function(){
				location.reload();
			}
		}
	}
}
}

document.getElementById('start').onclick = function(){
	//getting the grid size
	var grid = document.getElementsByName('gridSize');
	var sizeG;
	for(var i=0; i < grid.length; ++i){
		if(grid[i].checked){
			sizeG = grid[i].value;
			break;
		}
	}
	
	if(sizeG == 'large'){
		nr = 4;
		nc = 4;
		max_moves = 10;
	}
	else if(sizeG == 'medium'){
		nr = 3;
		nc = 4;
		max_moves = 6;
	}
	else{
		nr = 2;
		nc = 3;
		max_moves = 2;
	}
	
	start();
	//getting the difficulty
	var diffi = document.getElementsByName('difficulty');
	var diff_val;
	for(var i = 0; i < diffi.length; i++){
		if(diffi[i].checked){
			diff_val = diffi[i].value;
			//alert(''+diff_val+typeof(diff_val));
			break;
		}
	}
	
	
	//alert(''+diff_val+typeof(diff_val));
	if(diff_val == 'easy'){
		if(sizeG == 'large') timeSet = 90000;
		else if (sizeG == 'medium') timeSet = 60000;
		else timeSet = 45000;
	}
	else if(diff_val == 'medium'){
		if(sizeG == 'large') timeSet = 60000;
		else if(sizeG == 'medium') timeSet = 45000;
		else timeSet = 30000;
	}
	else{
		if(sizeG == 'large') timeSet = 45000;
		else if(sizeG == 'medium') timeSet = 30000;
		else timeSet = 15000;
	}
	startIt();
	document.getElementById('start').disabled = true;
}

