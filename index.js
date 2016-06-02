var arr = ["C++","C","Python","Java","Android","Javascript","PHP","HTML","CSS"];//,"Flask","NodeJS"
var i=0;
var j=0;
var inc=1;
var temp = [];
function change(){
		//alert("Hi");
	var div = document.getElementById("center_me");
	
	if(inc>0){
		if(j<arr[i].length) temp.push(arr[i][j]);
	}
	else{
		temp.splice(j,1);
	}
	var temp1 = temp.join("");
	center_me.innerHTML = "I have worked with "+temp1+"<span id='cursor_sim'> | </span>";
	if(j == arr[i].length) inc = inc*-1;
		
	j = j+inc*1;
	if(j<0 && inc==-1){
		j=0; inc=1;
		i = (i+1)%arr.length;
	}
		
}
setInterval(change,175);