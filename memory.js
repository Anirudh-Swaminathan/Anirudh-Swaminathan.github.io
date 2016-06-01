var nr = 4;
var nc = 4;
var arr = [];
var id=0;
var rid = 0;
for(var i=0; i<nr*nc/2; ++i){
	arr.push(i+1);
	arr.push(i+1);
}

//Introducing the scores module to this game
//Flipping a pair consists of 1 move.
var score = 10;
//The tolerance limit is 10 moves. After 10 moves,for each 
//move the user makes, the score decreases by 1 point.
//The user loses if the point reaches 0, but the board is not
//completely taken out.
var moves = 0;
var clos = 0;
var finish = false;

for(var i=0; i<15; ++i){
	var a = Math.floor(Math.random()*nc*nr);
	var x = arr[i];
	arr[i] = arr[a];
	arr[a] = x;
}

//alert('Arr is '+arr);
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
				this.innerHTML = this.getAttribute('data-inter');
				this.style.background = "#13e6db";
				if(!isOpen){
					prev = this;
					isOpen = true;
				}
				else if(this.id != prev.id){
					//updating the number of moves.
					moves++;
					if(moves>(nr*nc/2)+2) score--;
					if(score === 0){
						alert('Game Over!!!');
						finish = true;
					}
					if(score<=3 && score != 0) alert('You have '+score+' moves left');
					
					now = this;
					isOpen = false;
					susp = true;
					if(prev.innerHTML != now.innerHTML){
						
						setTimeout(function(){prev.innerHTML = '';
						now.innerHTML = ''; 
						prev.style.background='url(spider.jpg) no-repeat';
						prev.style.backgroundSize='cover';	
						now.style.background='url(spider.jpg) no-repeat'; 
						now.style.backgroundSize='cover'; susp = false;},800);
					}
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
				else{
					alert('Please click a different tile from the one you just clicked');
				}
			}
			else{
				alert('Suspended');
			}
		}
		//Coding for the scores
		if(!finish && clos === nr*nc/2) finish = true;
		
		if(!finish){
			var docu = document.getElementById("updateScore");
			docu.innerHTML = "Moves: "+moves+"<br/>Score: "+"<br/>Tiles Closed: "+clos*2;
		}
		else{
			var docu = document.getElementById("updateScore");
			docu.innerHTML = "Moves: "+moves+"<br/>Score: "+ score;
			if(score !=0) alert('Congratulations on finishing the game!!\nYour score is '+score);
			docu.innerHTML = "Moves: "+moves+"<br/>Score: "+ score+"<br/><a href='' id='try_again'>Wanna Try again?</a>";
			document.getElementById('try_again').onclick = function(){
				location.reload();
			}
		}
	}
}

