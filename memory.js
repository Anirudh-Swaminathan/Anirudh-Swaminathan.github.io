//alert('Hidden');
var nr = 4;
var nc = 4;
var arr = [];
var id=0;
var rid = 0;
//var mark=[];
for(var i=0; i<nr*nc/2; ++i){
	arr.push(i+1);
	arr.push(i+1);
}
/*
for(var i=0; i<nr*nc; ++i){
	mark.push(0);
}
*/
for(var i=0; i<15; ++i){
	var a = Math.floor(Math.random()*nc*nr);
	var x = arr[i];
	arr[i] = arr[a];
	arr[a] = x;
}
alert('Arr is '+arr);
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
		ele.innerHTML = 'X';
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
			if(this.getAttribute('clicka') === 'true'){
			
			if(susp === false){
				//alert('You clicked '+x[i].id+' Its parents id is '+x[i].parent.id+'\n innerHTML is '+x[i].innerHTML);
				this.innerHTML = this.getAttribute('data-inter');
				if(!isOpen){
					prev = this;
					isOpen = true;
				}
				else{
				//this.innerHTML = this.getAttribute('data-inter');
					now = this;
					isOpen = false;
					susp = true;
					if(prev.innerHTML != now.innerHTML){
						
						setTimeout(function(){prev.innerHTML = 'X';
						now.innerHTML = 'X'; susp = false;},800);
					}
					else{
						//susp  = true;
						setTimeout(function(){prev.setAttribute('clicka',false);
						now.setAttribute('clicka',false); prev.innerHTML = ''; now.innerHTML = '';
						prev.style.backgroundColor = "yellow";
						now.style.backgroundColor = "yellow";
						susp = false;},800);
					}
				}
				//alert('Hi You clicked '+this.id+"\nThe parents id is "+this.parentNode.id+'\n Hidden data is '+this.getAttribute('data-inter'));
				//alert('isOpen is '+isOpen+'\n prev is '+prev+'\nNow is '+now+'\nsusp is now'+susp+'\nclick status is '+this.getAttribute('clicka'));
			}
			else{
				alert('Suspended');
			}
		}
		}
}
function clearD(){
	prev.innerHTML = 'X';
	now.innerHTML = 'X';
	susp = false;
	//alert('Done');
}
