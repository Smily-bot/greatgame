var x = 100;
var y = 494;
var vspd = 0;
var canJump = false;
var direct = 1;
var pWidth = 30;
var pHeight = 50;

var blink = 0;


var psframe = 1;

var crouch = false;

var player = new asprite("assets/player.png");
var win = new sprite("assets/winblock.png");
var lose = new sprite("assets/unaliveblock.png");
var jsound = new sound("assets/jump.mp3", 0);
var wsound = new sound("assets/walk.mp3", 0);
var mousePos;
var mousePos2;
var mousePos3;

var slect = document.getElementById("tools")
var out = document.getElementById("out")
var winx = 714;
var winy = 30;

var losex = 450;
var losey = 250;

var youwin = false;
var youlose = false;

var levels = 
[
[],

];

var playerstart = [
[800,800,800,800,800,800]
];

var oldps = playerstart[0];
var oldws = [];
var oldnum = 1;
var lvlnum = 0;



var pwlkanim = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6]

var winnum = 2;
var wall = [];
var killwall = [];
var fakewall = [];
var pwdt = [
{
'cx' : 0, 'cy' : 0, 'cw' : 28, 'ch' : 50
},
{
'cx' : 29, 'cy' : 0, 'cw' : 28, 'ch' : 50
},
{
'cx' : 56, 'cy' : 0, 'cw' : 28, 'ch' : 50
},
{
'cx' : 84, 'cy' : 0, 'cw' : 28, 'ch' : 50
},
{
'cx' : 0, 'cy' : 51, 'cw' : 28, 'ch' : 50
},
{
'cx' : 29, 'cy' : 51, 'cw' : 28, 'ch' : 50
},
{
'cx' : 58, 'cy' : 53, 'cw' : 28, 'ch' : 50
},
{
'cx' : 84, 'cy' : 51, 'cw' : 28, 'ch' : 50
},
{
'cx' : 3, 'cy' : 100, 'cw' : 28, 'ch' : 50
},
{
'cx' : 41, 'cy' : 101, 'cw' : 28, 'ch' : 50
},
{
'cx' : 70, 'cy' : 100, 'cw' : 28, 'ch' : 50
},
]

x = playerstart[lvlnum][0];
y = playerstart[lvlnum][1];
winx = playerstart[lvlnum][2];
winy = playerstart[lvlnum][3];
losex = playerstart[lvlnum][4];
losey = playerstart[lvlnum][5];

function  youwinloop(){
ctx.fillStyle = "#696";
ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function  youlosloop(){
ctx.fillStyle = "#696";
ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function gameloop()
{

    gameLogic();
    paintScreen();

}



function isColliding(potX, potY)
{
    var retVal = -1;
    for(var i=0; i<wall.length; i++)
	{
		if(intersectRect(potX, potY, potX + pWidth, potY + pHeight, wall[i][0], 
		wall[i][1], wall[i][0] + wall[i][2], wall[i][1] + wall[i][3]))
		{
		    retVal = i;
			break;
		}
	}
    return retVal;
}
function iskColliding(potX, potY)
{
    var retVal = -1;
    for(var i=0; i<killwall.length; i++)
	{
		if(intersectRect(potX, potY, potX + pWidth, potY + pHeight, killwall[i][0], 
		killwall[i][1], killwall[i][0] + killwall[i][2], killwall[i][1] + killwall[i][3]))
		{
		    retVal = i;
			break;
		}
	}
    return retVal;
}
function isfColliding(potX, potY)
{
    var retVal = -1;
    for(var i=0; i<fakewall.length; i++)
	{
		if(intersectRect(potX, potY, potX + pWidth, potY + pHeight, fakewall[i][0], 
		fakewall[i][1], fakewall[i][0] + fakewall[i][2], fakewall[i][1] + fakewall[i][3]))
		{
		    retVal = i;
			break;
		}
	}
    return retVal;
}
function undo(){
wall = oldws;
x = oldps[0];
y = oldps[1];
winx = oldps[2];
winy = oldps[3];
losex = oldps[4];
losey = oldps[5];
}
function undw(){
wall.pop();
}
function reset(){
wall.length = 0;
fakewall.length = 0;
killwall.length = 0;
playerstart = [0,0,0,0,0,0];
x = playerstart[lvlnum][0];
y = playerstart[lvlnum][1];
winx = playerstart[lvlnum][2];
winy = playerstart[lvlnum][3];
losex = playerstart[lvlnum][4];
losey = playerstart[lvlnum][5];
}
function savething(){
let code = "[";
let code1 = "[";
for(let i = 0; i <= wall.length-1; i++){
code += "[";
for(let k = 0; k <= 3; k++){
code += Math.round(wall[i][k]).toString();
if(k != 3) code += ',';
}
if(i != wall.length-1) code += "],"; else code += "]";
}
code += "]"

code1 += Math.round(x+0).toString() + ',';
code1 += Math.round(y+0).toString() + ',';
code1 += Math.round(winx+0).toString() + ',';
code1 += Math.round(winy+0).toString() + ',';
code1 += Math.round(losex+0).toString() + ',';
code1 += Math.round(losey+0).toString() + ']';

out.value = "level code :\n\n" + code + "\n\ndata :\n\n" + code1
}

function controlLogic()
{
	tool = slect.value.charCodeAt() - 49
}

function handleGravity()
{
	
}

function spritelogic()
{
	
}

function winloselogic()
{
if(colide_with_sprite(x,y,win)){
if(lvlnum == winnum){
youwin = true; 
}else{ 
x = playerstart[lvlnum+1][0];
y = playerstart[lvlnum+1][1];
winx = playerstart[lvlnum+1][2];
winy = playerstart[lvlnum+1][3];
losex = playerstart[lvlnum+1][4];
losey = playerstart[lvlnum+1][5];
lvlnum++;
}
}

if(colide_with_sprite(x,y,lose)){
youlose = true;
}
}
function gameLogic()
{
	if(!youwin && !youlose){
    blink = (blink + 1)
	if(blink >= 18) blink = 0
	
    controlLogic();
	
	handleGravity();
	spritelogic();
	}
	//winloselogic();

}

function paintScreen()
{
	ctx.fillStyle = "#696";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//ctx.fillStyle = "#00F";
	//ctx.fillRect(x, y, pWidth, pHeight);
	
	//var pimageDraw = pimage;
	win.draw(winx,winy);
	lose.draw(losex,losey);
	
	player.framedraw(x,y,28,50,psframe,pwdt)
	
	ctx.fillStyle = "#000";
	for(var i=0; i<wall.length; i++)
	{
		ctx.fillRect(wall[i][0], wall[i][1], wall[i][2], wall[i][3]);
	}
	ctx.fillStyle = "#ff0000";
	for(var i=0; i<killwall.length; i++)
	{
		ctx.fillRect(killwall[i][0], killwall[i][1], killwall[i][2], killwall[i][3]);
	}
	ctx.fillStyle = "#000";
	for(var i=0; i<fakewall.length; i++)
	{
		ctx.fillRect(fakewall[i][0], fakewall[i][1], fakewall[i][2], fakewall[i][3]);
	}
	//console.log(pimageDraw.sprite);
}




const name = 'map';

async function savetofile(){
  let stuffcool = [Math.round(x+0),Math.round(y+0),Math.round(winx+0),Math.round(winy+0),Math.round(losex+0),Math.round(losey+0)]
  var saveArr = [wall,stuffcool,fakewall,killwall]
  var saveStr = JSON.stringify(saveArr);
  var taBlob = new Blob([saveStr], {type: 'text/plain'});
  
  const pickerOptions = {
    suggestedName: `${name.toLowerCase()}.ssm`,
    types: [
      {
        description: 'Simple StickMan Map',
        accept: {
          'text/plain': ['.ssm'],
        },
      },
    ],
  };

  const fileHandle = await window.showSaveFilePicker(pickerOptions);

  const writableFileStream = await fileHandle.createWritable();

  await writableFileStream.write(taBlob);

  await writableFileStream.close();
}

function loadSavedFile(loadStr)
{
	//var loadStr = getCookie("instrumentData" + saveSlot);
	
	if(loadStr == '')
	{
		return;
	}
	// (PART C) READ SELECTED FILE
	let reader = new FileReader();
	reader.onload = () => {
		let data = JSON.parse(reader.result);
		console.log(data);
	};
	reader.readAsText(file);
	/*
	
	*/
	
}

function load () {
  // (PART B) GET SELECTED FILE
  let file = document.getElementById("fileSelector").files[0];

  // (PART C) READ SELECTED FILE
  let reader = new FileReader();
  reader.onload = () => {
    let data = JSON.parse(reader.result);
	playerstart[lvlnum] = data[1];
	wall = data[0];
	x = playerstart[lvlnum][0];
	y = playerstart[lvlnum][1];
	winx = playerstart[lvlnum][2];
	winy = playerstart[lvlnum][3];
	losex = playerstart[lvlnum][4];
	losey = playerstart[lvlnum][5];
	fakewall = data[2];
	killwall = data[3];
  };
  reader.readAsText(file);
}

function fixthisshitimade(thelevel){

let outarray = [];

for(let i = 0; i <= thelevel.length-1; i++){

let t = thelevel[i];

let a = t[2];
let b = t[3];
let c = t[0];
let d = t[1];

if(Math.sign(a) == -1){
	c += a;
}

if(Math.sign(b) == -1){
	d += b;
}

outarray.push([c, d, Math.abs(a), Math.abs(b)]);

}

return outarray;
	
}

//ctx.fillRect(0, 0, canvas.getAttribute("height"), canvas.getAttribute("width"));

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


	//report the mouse position on click
	canvas.addEventListener("mousedown", function (evt) {
		oldws = wall;
		oldps = [x,y,winx,winy,losex,losey];
		if(tool == 0){
		mousePos = getMousePos(canvas, evt);
		//alert(mousePos.x + ',' + mousePos.y);
		}else if(tool == 1){
		mousePos3 = getMousePos(canvas, evt);
		winx = mousePos3.x - 32;
		winy = mousePos3.y - 32;
		}else if(tool == 2){
		mousePos3 = getMousePos(canvas, evt);
		losex = mousePos3.x - 32;
		losey = mousePos3.y - 32;
		}else if(tool == 3){
		mousePos3 = getMousePos(canvas, evt);
		x = mousePos3.x - 15;
		y = mousePos3.y - 25;
		}else if(tool == 4){
		mousePos = getMousePos(canvas, evt);
		}else if(tool == 5){
		mousePos = getMousePos(canvas, evt);
		}else if(tool == 6){
		//no
		}else if(tool == 7){
		mousePos3 = getMousePos(canvas, evt);
		let shit = isColliding(mousePos3.x,mousePos3.y);
		if(shit != -1) wall.splice(shit, 1); else {
			let shit = iskColliding(mousePos3.x,mousePos3.y);
			if(shit != -1) killwall.splice(shit, 1); else {
				let shit = isfColliding(mousePos3.x,mousePos3.y);
				if(shit != -1) fakewall.splice(shit, 1);
			}
		}
		}
		
		
		
	}, false);
	canvas.addEventListener('mouseup', e => {
	if(tool == 0){
	mousePos2 = getMousePos(canvas, e);
	wall.push([mousePos.x, mousePos.y, (mousePos2.x - mousePos.x), (mousePos2.y - mousePos.y)]);
	mousePos = {x: 0, y:0}
	mousePos2 = {x: 0, y:0}
	wall = fixthisshitimade(wall);
	}else if(tool == 4){
	mousePos2 = getMousePos(canvas, e);
	killwall.push([mousePos.x, mousePos.y, (mousePos2.x - mousePos.x), (mousePos2.y - mousePos.y)]);
	mousePos = {x: 0, y:0}
	mousePos2 = {x: 0, y:0}
	killwall = fixthisshitimade(killwall);
	}else if(tool == 5){
	mousePos2 = getMousePos(canvas, e);
	fakewall.push([mousePos.x, mousePos.y, (mousePos2.x - mousePos.x), (mousePos2.y - mousePos.y)]);
	mousePos = {x: 0, y:0}
	mousePos2 = {x: 0, y:0}
	fakewall = fixthisshitimade(fakewall);
	}
	}, false);




