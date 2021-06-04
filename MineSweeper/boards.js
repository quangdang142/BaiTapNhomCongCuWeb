class square{ 
// create class square
	constructor(color) {
		this.value = 0;
		this.flagValue = 0;
		this.color = ["black", "green", "blue", "orange", "red", "violet"];
		this.bgColor = color;
		this.opacity = 0;
		this.flag = "🏳️‍🌈";
		this.checkFlag = true; 
		this.opened = false;//true => show value /  false => flag
	}
}


class playerID{
	constructor(name) {
		this.name = name;
		this.point = 9999;
	}
}

function playerList(arr,name) {
	var player = new playerID(name);
	arr.push(player);
	return arr;
}

function Board(row, col,color) {
// create a new board empty 	
	var arr = Array(row).fill().map(() => Array(col).fill().map(e => new square(color)));
	return arr;
}

function randBoom(items, num,row,col,f1,f2) {
//random bom in board	
	var count = 1;
	while (count <= num){	
		var i = Math.floor(Math.random() * row);
		var j = Math.floor(Math.random() * col);

		if (items[i][j].value == "💣" || (i==f1 && j==f2))
			continue;
		else
			{
				items[i][j].value="💣";
				count += 1;
				items = checkBoom(i,j,items,row,col);
			}
	}
	return items;
}

function checkBoom(i,j,arr,r,c) {
//number of bombs around				
	var safeArea = [
		[i-1,j-1],	 [i-1,j],	[i-1,j+1],
		[i,j-1],        		[i,j+1],
		[i+1,j-1],	 [i+1,j],	[i+1,j+1]  
	];
	safeArea.map(e => {
		var a = e[0];
		var b = e[1];
		if (a>=0 && a<=(r-1) && b>=0 && b<=(c-1) && arr[a][b].value !== "💣"){
			arr[a][b].value++;
		 }	
	})	
	return arr;
}

function createTable(row,col,bom,color,i,j) {
 	//create table with data 
	var boards = new Board(row, col, color);
	return boards = randBoom(boards, bom, row, col,i,j);
}

function sort(arr) {
	arr.sort(function(a,b) {return a.point-b.point})
	arr.pop();
	return arr;
}

