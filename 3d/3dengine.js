var left = false;
var right = false;
var up = false;
var down = false;
var space = false;
var shift = false;
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

var xTurn = 0;
var yTurn = 0;

var fpang = 180;
var fpYang = 0;
var quadsToDraw = [];
var lightSources = [];

var loadVertices = [];
var loadTriangles = [];
var loadColor;

var triedSwapping = new Map();

function loadModel(files)
{
	var reader = new FileReader();
	
	reader.onload = function(e)
	{
		var fileContents = e.target.result;
		var parser = new DOMParser();
		var parsed = parser.parseFromString(fileContents, "application/xml");
		buildModel(parsed);
	}
	
	reader.readAsText(files[0]);
}

function buildModel(xml)
{
	loadColor = xml.querySelector('base').getAttribute('displaycolor');
	var objXml = xml.querySelectorAll('object');
	
	var xrot = 90;
	var yrot = 180;
	var zrot = 0;
	
	var rot = [degToRad(xrot), degToRad(yrot), degToRad(zrot)];
	
	for(var ob=0; ob<objXml.length; ob++)
	{
		var verXml = objXml[ob].querySelector('vertices');
		var triXml = objXml[ob].querySelector('triangles');
		
		var tr = xml.querySelector('build').querySelectorAll('item')[ob].getAttribute('transform').split(' ');
		for(var i=0; i<tr.length; i++)
		{
			tr[i] = Number(tr[i]);
		}
		
		var objVertices = [];
		var objTriangles = [];
		
		for(var i=0; i<verXml.children.length; i++)
		{
			var rv = [];
			var vertex = [];
			var vXml = verXml.children[i];
			
			rv[0] = Number(vXml.getAttribute("x"));
			rv[1] = Number(vXml.getAttribute("y"));
			rv[2] = Number(vXml.getAttribute("z"));
			
			var trv = [];
			trv[0] = rv[0] * tr[0] + rv[1] * tr[3] + rv[2] * tr[6] + tr[9];
			trv[1] = rv[0] * tr[1] + rv[1] * tr[4] + rv[2] * tr[7] + tr[10];
			trv[2] = rv[0] * tr[2] + rv[1] * tr[5] + rv[2] * tr[8] + tr[11];
			
			var xrv = [trv[0], 0, 0];
			xrv[1] = trv[1] * Math.cos(rot[0]) - trv[2] * Math.sin(rot[0]);  //x rotation
			xrv[2] = trv[1] * Math.sin(rot[0]) + trv[2] * Math.cos(rot[0]);
			
			var yrv = [0, xrv[1], 0];
			yrv[0] = xrv[0] * Math.cos(rot[1]) + xrv[2] * Math.sin(rot[1]);  //y rotation
			yrv[2] = xrv[0] * -Math.sin(rot[1]) + xrv[2] * Math.cos(rot[1]);
			
			vertex[0] = yrv[0] * Math.cos(rot[2]) + yrv[1] * -Math.sin(rot[2]); //z rotation
			vertex[1] = yrv[0] * Math.sin(rot[2]) + yrv[1] * Math.cos(rot[2]);
			vertex[2] = yrv[2];
			
			objVertices.push(vertex);
		}
		
		for(var i=0; i<triXml.children.length; i++)
		{
			var tri = [];
			var tXml = triXml.children[i];
			
			tri[0] = Number(tXml.getAttribute("v1"));
			tri[1] = Number(tXml.getAttribute("v2"));
			tri[2] = Number(tXml.getAttribute("v3"));
			
			objTriangles.push(tri);
		}
		loadVertices.push(objVertices);
		loadTriangles.push(objTriangles);
	}
}

function drawLoadedTriangles(offset) //offset is [x, y, z, scalar]
{
	ctx.fillStyle = loadColor;
	for(var ob=0; ob < loadTriangles.length; ob++)
	{
		var objVertices = loadVertices[ob];
		var objTriangles = loadTriangles[ob];
		
		for(var i=0; i<objTriangles.length; i++)
		{
			var tri = objTriangles[i];
			var poly = [];
			
			for(var j=0; j<tri.length; j++)
			{
				var offsetV = [];
				var lv = objVertices[tri[j]];
				
				for(var k=0; k<offset.length; k++)
				{
					offsetV[k] = lv[k]*offset[3] + offset[k];
				}
				
				poly.push(offsetV);
			}
			
			draw3dTri(poly);
		}
	}
}

function lightSource(point)
{
	this.x = point[0];
	this.y = point[1];
	this.z = point[2];
}

function polygon(pid, dispVertices, vertices, fillStyle)
{
	this.getEquation = function()
	{
		return this.a + "x + " + this.b + "y + " + this.c + "z = " + this.d;
	}
	
	this.getXYZ = function()
	{
		var str = "";
		var comma = "";
		for(var i=0; i<this.x.length; i++)
		{
			str += (comma + "(" + this.x[i] + ", " + this.y[i] + ", " + this.z[i] + ")");
			comma = ", ";
		}
		
		return str;
	}

	this.midpoint = function()
	{
	    var xsum = 0;
		var ysum = 0;
		var zsum = 0;
		
		var len = this.x.length;
		
		for(var i=0; i<len; i++)
		{
			xsum += this.x[i];
			ysum += this.y[i];
			zsum += this.z[i];
		}
		
		return [xsum / len, ysum / len, zsum / len];
		
	}

	this.triangleCheck = function()
	{
		for(var i=0; i<this.x.length; i++)
		{
			this.effX.push(this.x[i]);
			this.effY.push(this.y[i]);
			this.effZ.push(this.z[i]);
		
			var i1 = (i + 1) % this.x.length;
			var ptsSame = (this.x[i] == this.x[i1] && this.y[i] == this.y[i1] && this.z[i] == this.z[i1]);
			if(ptsSame)
			{
				i++;
			}
		}
	}
	
	this.computePlaneCoef = function()
	{	
		var v1 = [this.effX[1] - this.effX[0], this.effY[1] - this.effY[0], this.effZ[1] - this.effZ[0]];
		var v2 = [this.effX[2] - this.effX[0], this.effY[2] - this.effY[0], this.effZ[2] - this.effZ[0]];
		var pt = [this.effX[0], this.effY[0], this.effZ[0]];
		
		[this.a,this.b,this.c,this.d] = crossWithPoint(v1, v2, pt);
	}

	this.calcMinDist = function()
	{
		var planeCoefs = [this.a, this.b, this.c, this.d];
		var isInsideEdge = [];
		var checkType = 0;
		var edgeWalls = [];
		
		for(var i=0; i<this.effX.length; i++)
		{
			var i1 = (i+1) % this.effX.length;
			var polyEdgeVec = [ this.effX[i1] - this.effX[i], this.effY[i1] - this.effY[i], this.effZ[i1] - this.effZ[i] ];
			edgeWalls[i] = crossWithPoint(polyEdgeVec, planeCoefs, [this.effX[i], this.effY[i], this.effZ[i]]);
			var abc = edgeWalls[i][0] * x + edgeWalls[i][1] * y + edgeWalls[i][2] * z;
			isInsideEdge[i] = abc < edgeWalls[i][3];
			checkType += abc >= edgeWalls[i][3];
		}
		
		if(checkType == 0) //is inside poly, so do point-plane
		{
			var intersectP = getIntersectionPoint(planeCoefs, [x, y, z], [x+this.a, y+this.b, z+this.c] );
			this.minDist = distBtwnPts([x,y,z], intersectP);
		}
		else //is outside poly, further checks needed
		{
			onSide = false;
			for(var i=0;i<isInsideEdge.length;i++) 
			{ //get which line is closest to player's point
				if(!isInsideEdge[i])
				{
					var closestLine = [];
					var i1 = (i+1) % this.effX.length;
					closestLine[0] = [this.effX[i1], this.effY[i1], this.effZ[i1]];
					closestLine[1] = [this.effX[i], this.effY[i], this.effZ[i]];
					
					var pVec = [edgeWalls[i][0], edgeWalls[i][1], edgeWalls[i][2]]; //line perpendicular to closestLine inplane
					
					var bounded = true;
					var crop = crossProduct([this.a, this.b, this.c], pVec);
					for(var j=0; j<2; j++)
					{   
						var [ba, bb, bc, bd] = findD(crop, closestLine[j]);
						var abc = ba * x + bb * y + bc * z;
						bounded = bounded && (abc < bd == (j == 0)); //comparing to j==0 is to switch direction to check
					}
					if(bounded)
					{   // closest to line
						this.minDist = distBtwnPtAndLine([x,y,z], closestLine[0], closestLine[1]);
						onSide = true;
						break;
					}
				}
			}
			if(!onSide)
			{   //closest to vertex
				this.minDist = this.minVertexDist;
			}
		}		
	}

	this.pid = pid;
	this.mustBeBefore = [];
	this.mustBeAfter = [];
	
	this.x = [];
	this.y = [];
	this.z = [];
	this.effX = [];
	this.effY = [];
	this.effZ = [];
	
	this.distTo = [];
	this.minDist = Infinity;
	this.minVertexDist = Infinity;
	this.maxDist = 0;
	
	this.minDx = Infinity;
	this.maxDx = 0;
	this.minDy = Infinity;
	this.maxDy = 0;
	
	this.dx = [];
	this.dy = [];
	this.fillStyle = fillStyle;
	this.swapMap = new Map();
	
	for(var i=0; i<dispVertices.length; i++)
	{
		this.dx.push(dispVertices[i][0]);
		this.dy.push(dispVertices[i][1]);
	}
	
	for(var i=0; i<vertices.length; i++)
	{
		this.x.push(vertices[i][0]);
		this.y.push(vertices[i][1]);
		this.z.push(vertices[i][2]);
		
		var distToPt = distBtwnPts([x, y, z], [this.x[i], this.y[i], this.z[i]]);
		distToPt = precisionRound(distToPt, 10000);
		
		this.minVertexDist = Math.min(this.minVertexDist, distToPt);
		this.maxDist = Math.max(this.maxDist, distToPt);
		
		this.distTo.push(distToPt);
	}
	
	for(var i=0; i<this.dx.length; i++)
	{
		this.minDx = Math.min(this.minDx, this.dx[i]);
		this.maxDx = Math.max(this.maxDx, this.dx[i]);
	}
	for(var i=0; i<this.dy.length; i++)
	{
		this.minDy = Math.min(this.minDy, this.dy[i]);
		this.maxDy = Math.max(this.maxDy, this.dy[i]);
	}
	
	this.triangleCheck();
	this.computePlaneCoef();
	this.calcMinDist();
	
	this.swapAdd = function(polySwap)
	{
		this.swapMap.set(polySwap.pid, true);
	}
	
	this.swapAddBefore = function(polySwap)
	{
		this.mustBeBefore.push(polySwap);
	}
	
	this.swapAddAfter = function(polySwap)
	{
		this.mustBeAfter.push(polySwap);
	}
	
	this.unsetMustBe = function(polySwap)
	{
		for(var i = 0; i < this.mustBeBefore.length; i++)
		{
			if(this.mustBeBefore[i] == polySwap)
			{
				this.mustBeBefore.splice(i, 1);
			}
		}
		
		for(var i = 0; i < this.mustBeAfter.length; i++)
		{
			if(this.mustBeAfter[i] == polySwap)
			{
				this.mustBeAfter.splice(i, 1);
			}
		}
	}
	
	this.swapHas = function(polySwap)
	{
		return this.swapMap.has(polySwap.pid);
	}
	
	this.abovePlane = function(vIdx, polyPlane)
	{
		return ( polyPlane.a * this.x[vIdx] + polyPlane.b * this.y[vIdx] + polyPlane.c * this.z[vIdx] ) > polyPlane.d;
	}
	
	this.planeTest = function(polyi)
	{
		var a = polyi.a;
		var b = polyi.b;
		var c = polyi.c;
		var d = polyi.d;
		
		var allSame = true;
		var allDiff = true;
		
		var playerTest = ( a * x + b * y +  c * z ) >= d; //side of plane player is on
		
		for(var i=0; i<this.x.length; i++)
		{
			var abc = ( a * this.x[i] + b * this.y[i] +  c * this.z[i] );
			if(abc == d)
			{
				continue;
			}
			var pointTest = abc >= d;
			
			var sameSide = (pointTest == playerTest);
			
			allSame = allSame &&  sameSide;
			allDiff = allDiff && !sameSide;
		}

		if(allSame && allDiff)
		{
			return -2;
		}
		if(allSame)
		{
			return 1;
		}

		else if(allDiff)
		{
			return -1;
		}
		else
		{
			return 0;
		}
	}
}

window.onload = function()
{
    var fps = 60;
	document.addEventListener("keydown", keydown);
	document.addEventListener("keyup", keyup);
	document.addEventListener("mousemove", mouseMoved);
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	setInterval( gameloop, 1000 / fps);
}

function mouseMoved(evt)
{
	var mx = evt.movementX;
	var my = evt.movementY;
	
	if(document.pointerLockElement === canvas)
	{
		xTurn = mx / canvas.width;
	}
	
	if(document.pointerLockElement === canvas)
	{
		yTurn = my / canvas.height;
	}
}

canvas.onclick = function() 
{
  canvas.requestPointerLock();
}

function keydown(evt)
{
	//console.log(evt.keyCode);
	switch(evt.keyCode)
	{
		case 65:
	    case 37: left = true; break;
		case 87:
		case 38: up = true; break;
		case 68:
		case 39: right = true; break;
		case 83:
		case 40: down = true; break;
		case 16: shift = true; break;
	}
}

function keyup(evt)
{
	switch(evt.keyCode)
	{
	    case 65:
		case 37: left = false; break;
		case 87:
		case 38: up = false; break;
		case 68:
		case 39: right = false; break;
		case 83:
		case 40: down = false; break;
		case 16: shift = false; break;
	}
}

function minMax(val, min, max)
{
    return Math.min(Math.max(min, val), max);
}

function fpDrawPillar(prX, prY, prZ, prW, prH, prL)
{
	var propEnds = 0.03;
	var propIn = 0.66;

	var playerHeight = 100;
	prY = playerHeight - prH - prY;
	
	fillPrism(prX + prW * (1 - propIn)/2, prY + prH * propEnds, 
	    prZ + prL * (1 - propIn)/2, prW * propIn, prH - prH * propEnds*2, prL * propIn);
	
	
	
	var col = hexToRgb(ctx.fillStyle);
	
	ctx.fillStyle = rgbToStr(col);
	fillPrism(prX, prY, prZ, prW, prH * propEnds, prL);
	fillPrism(prX, prY + prH - prH * propEnds, prZ, prW, prH * propEnds, prL);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToStr(rgb)
{
	return 'rgb('+ parseInt(rgb.r / 2) +', '+ parseInt(rgb.g / 2) +', '+ parseInt(rgb.b / 2) +')';
}

function rgbToHsv(rgb)
{
	var ri = rgb.r / 255;
	var gi = rgb.g / 255;
	var bi = rgb.b / 255;
	
	var cmax = Math.max(ri, gi, bi);
	var cmin = Math.min(ri, gi, bi);
	
	var delta = cmax - cmin;
	
	var hue = 0; // 0 - 360
	if(ri >= gi && ri >= bi) //red is most
	{
		hue = ((gi - bi) / delta) % 6;
	}
	else if(gi >= ri && gi >= bi) //green is most
	{
		hue = (bi - ri) / delta + 2;
	}
	else if(bi >= ri && bi >= gi) //blue is most
	{
		hue = (ri - gi) / delta + 4;
	}
	hue *= 60;
	
	var sat = 0;
	if(cmax != 0)
	{
		sat = delta / cmax;
	}
	
	var hsv = 
	{
		h: hue,
		s: sat,
		v: cmax
	}
	
	return hsv;
}

function hsvToRgb(hsv)
{
	var c = hsv.v * hsv.s;
	var x = c * (1 - Math.abs((hsv.h / 60) % 2 - 1));
	var m = hsv.v - c;
	
	var arr;
	
	if(hsv.h < 60)
	{
		arr = [c, x, 0];
	}
	else if(hsv.h < 120)
	{
		arr = [x, c, 0];
	}
	else if(hsv.h < 180)
	{
		arr = [0, c, x];
	}
	else if(hsv.h < 240)
	{
		arr = [0, x, c];
	}
	else if(hsv.h < 300)
	{
		arr = [x, 0, c];
	}
	else
	{
		arr = [c, 0, x];
	}
	
	var rgb =
	{
		r: (arr[0] + m) * 255,
		g: (arr[1] + m) * 255,
		b: (arr[2] + m) * 255
	}
	
	return rgb;
}

var fff = 0;
function fillPrism(prX, prY, prZ, prW, prH, prL)
{
    draw3dQuad(prX, prY, prZ, prX, prY, prZ + prL, prX + prW, prY, prZ + prL, prX + prW, prY, prZ);  //top
	draw3dQuad(prX, prY, prZ, prX, prY, prZ + prL, prX, prY + prH, prZ + prL, prX, prY + prH, prZ);  //left
	draw3dQuad(prX, prY, prZ, prX, prY + prH, prZ, prX + prW, prY + prH, prZ, prX + prW, prY, prZ);  //front
	
	draw3dQuad(prX + prW, prY + prH, prZ + prL, prX + prW, prY + prH, prZ,    //right
	    prX + prW, prY, prZ, prX + prW, prY, prZ + prL);
	draw3dQuad(prX + prW, prY + prH, prZ + prL, prX + prW, prY + prH, prZ,  //bottom
	    prX, prY + prH, prZ, prX, prY + prH, prZ + prL);
	draw3dQuad(prX + prW, prY + prH, prZ + prL, prX + prW, prY, prZ + prL,    //back
	    prX, prY, prZ + prL, prX, prY + prH, prZ + prL);
}

function calcFov(deg)
{
	var ha = degToRad(deg/2);
	var hw = canvas.width/2;
	
	var sd = hw / Math.tan(ha);
	
	return sd;
}

function degToRad(deg)
{
	return deg / 180 * Math.PI;
}

function vecFromPts(p1, p2)
{
	var returnVec = [];
	for(var i=0; i<p1.length; i++)
	{
		returnVec.push(p2[i] - p1[i]);
	}
	
	return returnVec;
}

function dotProduct(v1, v2)
{
	var sum = 0;
	for(var i=0; i<v1.length; i++)
	{
		sum += v1[i] * v2[i];
	}
	
	return sum;
}

function crossProduct(v1, v2)
{
	var a = v1[1] * v2[2] - v1[2] * v2[1];
	var b = v1[2] * v2[0] - v1[0] * v2[2];
	var c = v1[0] * v2[1] - v1[1] * v2[0];
	
	return [a,b,c];
}

function crossWithPoint(v1, v2, point)
{
	//making a plane from two vectors and a point it passes through
	
	var abc = crossProduct(v1, v2);
	return findD(abc, point);
}

function findD(abc, point)
{
	//a = abc[0], b = abc[1], c = abc[2]
	var d = abc[0] * point[0] + abc[1] * point[1] + abc[2] * point[2];
	return [abc[0], abc[1], abc[2], d];
}

function distBtwnPtAndLine(p0, p1, p2)
{
	//so apparently we can find the distance between a point and line
	//    | (p2 - p1) x (p1 - p0) |         where p0 is a point and
	//   ---------------------------        p1 and p2 are the ends
	//          | p2 - p1 |                 of our line segment
	
	//we do this because two lines of i cross the j plane and
	//we want to figure out which one is closer to the j poly
	
	var p1p0 = [ p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2] ];	 
	var p2p1 = [ p2[0] - p1[0], p2[1] - p1[1], p2[2] - p1[2] ];
	var crossProd = crossProduct(p2p1, p1p0);
	
	var magOfCross = calcMagOfVector(crossProd);
	var magOfp2p1 = calcMagOfVector(p2p1);
	
	return magOfCross / magOfp2p1;
}

function screenPlane()
{
	var yComp = Math.sin(fpYang);
	var xzComp = Math.cos(fpYang);
	
	var xComp = xzComp * Math.sin(fpang);
	var zComp = xzComp * Math.cos(fpang);
	
	var d = x * xComp + y * yComp + z * zComp;
	
	return [xComp, yComp, zComp, d+1];
}

function get3dPoint(x1, y1, z1)
{
	var x1Diff = x1 - x;
	var y1Diff = y1 - y;
	var z1Diff = z1 - z;
	
	var translatedX1 = x1Diff * Math.cos(-fpang) + z1Diff * Math.sin(-fpang);
	var midTransZ = z1Diff * Math.cos(-fpang) - x1Diff * Math.sin(-fpang);
	
	var translatedY1 = y1Diff * Math.cos(-fpYang) + midTransZ * Math.sin(-fpYang);
	var translatedZ1 = midTransZ * Math.cos(-fpYang) - y1Diff * Math.sin(-fpYang);
	
	var screenDistance = calcFov(fov);
	
	var dispX1 = (translatedX1 / translatedZ1) * screenDistance;
	var dispY1 = (translatedY1 / translatedZ1) * screenDistance;
	
	var centerOfScreenX = canvas.width/2;
	var centerOfScreenY = canvas.height/2;
	
	dispX1 += centerOfScreenX;
	dispY1 += centerOfScreenY;
	
	return [dispX1, dispY1, translatedZ1];
}

function precisionRound(n, precision)
{
	return Math.round(n * precision) / precision;
}

function distBtwnPts(p1, p2)
{
	var sum = 0;
	for(var i=0; i<p1.length; i++)
	{
		sum += Math.pow(p1[i] - p2[i], 2);
	}
	return Math.sqrt(sum);
}

function getIntersectionPoint(plane, p1, p2)
{
	var la = plane[0];
	var lb = plane[1];
	var lc = plane[2];
	var ld = plane[3];

	var xDiff = p1[0] - p2[0];
	var yDiff = p1[1] - p2[1];
	var zDiff = p1[2] - p2[2];

	var lt = (ld - la * p1[0] - lb * p1[1] - lc * p1[2]) / (la * xDiff + lb * yDiff + lc * zDiff);
	var liPoint = [p1[0] + xDiff * lt, p1[1] + yDiff * lt, p1[2] + zDiff * lt];
	
	return liPoint;
}

function lineIntersection2d(p1, p2, p3, p4)
{
	var m1 = (p2[1] - p1[1]) / (p2[0] - p1[0]);
	var m2 = (p4[1] - p3[1]) / (p4[0] - p3[0]);
	
	var ret = [];
	
	ret[0] = (p1[0] * m1 + p3[1] - p3[0] * m2 - p1[1]) / (m1 - m2);
	ret[1] = m1 * (ret[0] - p1[0]) + p1[1];
	
	return ret;
}

function draw3dTri(vs)
{
	draw3dQuad(vs[0][0], vs[0][1], vs[0][2], 
	           vs[1][0], vs[1][1], vs[1][2],
			   vs[2][0], vs[2][1], vs[2][2],
			   vs[2][0], vs[2][1], vs[2][2]
			  );
}

function draw3dQuad(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4)
{
	var qd = [];

	qd[0] = get3dPoint(x1, y1, z1);
	qd[1] = get3dPoint(x2, y2, z2);
	qd[2] = get3dPoint(x3, y3, z3);
	qd[3] = get3dPoint(x4, y4, z4);
	
	var qd3d = [ [x1,y1,z1], [x2,y2,z2], [x3,y3,z3], [x4,y4,z4] ];
	
	var posZs = 0;
	
	for(var i=0; i<qd.length; i++)
	{
		posZs += (qd[i][2] >= 0);
	}
	
	if(posZs == 0)
	{
		return;
	}
	else if(posZs < qd.length)
	{
		var scrPln = screenPlane();
		
		var newPoints = [];
		
		for(var i=0; i<qd.length; i++)
		{
			if(qd[i][2] < 0)
			{
				var prevIdx = (i + qd.length - 1) % qd.length;
				var nextIdx = (i + 1) % qd.length;
				var prevPt = qd[prevIdx][2] >= 0;
				var nextPt = qd[nextIdx][2] >= 0;
				
				if(prevPt && nextPt)
				{
					var iPoint1 = getIntersectionPoint(scrPln, qd3d[i], qd3d[prevIdx]);
					var iPoint2 = getIntersectionPoint(scrPln, qd3d[i], qd3d[nextIdx]);
					
					var n1 = get3dPoint(iPoint1[0], iPoint1[1], iPoint1[2]);
					var n2 = get3dPoint(iPoint2[0], iPoint2[1], iPoint2[2]);
					
					newPoints[i] = [n1, n2];
				}
				else if(!prevPt && !nextPt)
				{
					newPoints[i] = -1;
				}
				else
				{
					var useIdx = -1;
					if(prevPt) { useIdx = prevIdx; }
					if(nextPt) { useIdx = nextIdx; }
					
					var liPoint = getIntersectionPoint(scrPln, qd3d[i], qd3d[useIdx]);
					newPoints[i] = get3dPoint(liPoint[0], liPoint[1], liPoint[2]);
				}
			}
			else
			{
				newPoints[i] = false;
			}
		}
		
		for(var i=0; i<newPoints.length; i++)
		{
			if(newPoints[i] == -1)
			{
				newPoints[i] = newPoints[(i+1) % newPoints.length];
			}
			if(newPoints[i] != false)
			{
				if(typeof(newPoints[i][0]) == 'number')
				{
					qd[i] = newPoints[i];
				}
				else
				{
					for(var j=qd.length-1; j>i; j--)
					{
						qd[j+1] = qd[j];
					}
					qd[i] = newPoints[i][0];
					qd[i+1] = newPoints[i][1];
				}
			}
		}
	}
	
	var poly = new polygon(quadsToDraw.length, qd, qd3d, ctx.fillStyle);
	quadsToDraw.push(poly);
}

function ctxDrawLine(x1, y1, x2, y2)
{
    ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

function ctxDrawPolygon(poly)
{
	ctx.fillStyle = calcLighting(poly);

	ctx.beginPath();
	ctx.moveTo(poly.dx[0], poly.dy[0])
	for(var i=1; i<poly.dx.length; i++)
	{
		ctx.lineTo(poly.dx[i], poly.dy[i]);
	}
	ctx.closePath();
	ctx.fill();
}

function calcLighting(poly)
{
	var midpoint = poly.midpoint();
	var lightCoef = 0;

	for(var i=0; i<lightSources.length; i++)
	{
		var light = lightSources[i];
		
		var planeTest = ( poly.a * light.x + poly.b * light.y +  poly.c * light.z ) >= poly.d;
		
		//if(!planeTest)
		//{
			var lightVector = [light.x - midpoint[0], light.y - midpoint[1], light.z - midpoint[2]];
			var polygonNormal = [poly.a, poly.b, poly.c];
			
			var costheta = Math.abs(dotProduct(lightVector, polygonNormal)) 
							/ (calcMagOfVector(lightVector) * calcMagOfVector(polygonNormal));
			lightCoef = minMax(lightCoef + costheta, 0, 1);
		//}
	}
	
	var rgb = hexToRgb(poly.fillStyle);
	var hsv = rgbToHsv(rgb);
	hsv.v = minMax(lightCoef, 0.05, 0.95);
	var rgb2 = hsvToRgb(hsv);
	
	ctx.fillStyle = rgbToStr(rgb2);
}

function calcMagOfVector(vec) //magnitude
{
	var sumOfSquares = 0;
	for(var i=0; i<vec.length; i++)
	{
		sumOfSquares += Math.pow(vec[i], 2);
	}
	return Math.sqrt(sumOfSquares);
}

function polysIntersect(polyi, polyj)
{
	/*
	
	two polygons, P and Q, points of each are p1, p2, p3, p4 and q1, q2, q3, q4

	v1 = < p2.x - p1.x, p2.y - p1.y >

	v2 = perpendicularLine = < p1.y - p2.y, p2.x - p1.x >

	v2 = <v2.x, v2.y> / sqrt((v2.x)^2 + (v2.y)^2)
	
	for (all points on both lines){
		pro1 = projectedPoint =  v2.x * q1.x + v2.y * q1.y
	}

	find min and max or P and Q of projected pts
	overlapping = ! (minP > maxQ || maxP < minQ)
	break if !overlapping

	repeat for all lines on both polys

	if still overlapping, then polys intersect
	
	*/
	
	var iPolys = [polyi, polyj];
	var overlapping = true;
	
	for(var i=0; i < 2 && overlapping; i++) //poly loop
	{
		var polyP = iPolys[i];
		var ppl = polyP.dx.length;
		
		for(var p = 0; p < ppl && overlapping; p++) //line loop
		{
			var lilperp = [ polyP.dy[p] - polyP.dy[(p+1) % ppl], polyP.dx[(p+1) % ppl]  - polyP.dx[p] ];
			var magnitude = Math.sqrt(Math.pow(lilperp[0], 2) + Math.pow(lilperp[1], 2));
			var normVec = lilperp.map(x => x / magnitude);
			
			var polyMin = [Infinity, Infinity];
			var polyMax = [-Infinity, -Infinity];
			
			for(j = 0; j < 2; j++)  //poly point loop
			{
				var chkPoly = iPolys[j];
				
				var cpl = chkPoly.dx.length;
				
				for(var q = 0; q < cpl; q++) //point loop
				{
					var projPt = normVec[0] * chkPoly.dx[q] + normVec[1] * chkPoly.dy[q];
					polyMin[j] = Math.min(polyMin[j], projPt);
					polyMax[j] = Math.max(polyMax[j], projPt);
				}
			}
			
			overlapping = !( polyMin[0] > polyMax[1] || polyMax[0] < polyMin[1] );
		}
	}
	
	return overlapping;
}

function swapPolysInner(polyi, polyj)
{
	var tswapStr = polyi.pid + " <-> " + polyj.pid;
	if(triedSwapping.has(tswapStr) || polyi.pid == polyj.pid)
	{
		if(polysIntersect(polyi, polyj))
		{
			return false;
		}
		else
		{
			polyi.unsetMustBe(polyj);
			polyj.unsetMustBe(polyi);
			
			return tswapStr;
		}
	}
	else
	{
		triedSwapping.set(tswapStr, true);
	}
	for(var i=0; i<polyi.mustBeBefore.length; i++)
	{
		var idxSwap = polyj.curIdx;
		var sPoly = polyi.mustBeBefore[i];
		var idxMax = sPoly.curIdx;

		if(idxSwap >= idxMax)
		{
			var ret = swapPolysInner(sPoly, polyj);
			if(ret !== true)
			{
				if(polysIntersect(polyi, polyj))
				{
					return false;
				}
				else
				{
					polyi.unsetMustBe(polyj);
					polyj.unsetMustBe(polyi);
					
					return tswapStr;
				}
			}
		}
	}
	
	for(var i=0; i<polyj.mustBeAfter.length; i++)
	{
		var idxSwapi = polyi.curIdx;
		var sPolyj = polyj.mustBeAfter[i];
		var idxMin = sPolyj.curIdx;

		if(idxSwapi <= idxMin)
		{
			var ret = swapPolysInner(polyi, sPolyj);
			if(ret !== true)
			{
				if(polysIntersect(polyi, polyj))
				{
					return false;
				}
				else
				{
					polyi.unsetMustBe(polyj);
					polyj.unsetMustBe(polyi);
					
					return tswapStr;
				}
			}
		}
	}
	
	quadsToDraw[polyj.curIdx] = polyi;
	quadsToDraw[polyi.curIdx] = polyj;
	
	var temp = polyj.curIdx;
	polyj.curIdx = polyi.curIdx;
	polyi.curIdx = temp;
	
	return true;
}

function swapPolys(polyi, polyj)
{
	var ret = swapPolysInner(polyi, polyj);
	triedSwapping.clear();
	
	var tStr = polyi.pid + " <-> " + polyj.pid;
	if(typeof(ret) == 'string' && ret != tStr)
	{
		ret = swapPolysInner(polyi, polyj);
		triedSwapping.clear();
	}

	if(ret === true)
	{
		swapManage(polyi, polyj, true);
	
	}
	else
	{
		polyi.swapAdd(polyj);
		polyj.swapAdd(polyi);
	}
}

function swapManage(polyi, polyj, afterFirst)
{
	if(afterFirst)
	{
		polyi.swapAddAfter(polyj);
		polyj.swapAddBefore(polyi);
	}
	else
	{
		polyi.swapAddBefore(polyj);
		polyj.swapAddAfter(polyi);
	}
	polyi.swapAdd(polyj);
	polyj.swapAdd(polyi);
}

function renderQuads()
{
	quadsToDraw.sort(function(a, b){return  a.minDist - b.minDist});

	for(var i=0; i<quadsToDraw.length; i++)
	{
		quadsToDraw[i].curIdx = i;
	}
	
	for(var i=0; i<quadsToDraw.length; i++)
	{
		var polyi = quadsToDraw[i];
		
		for(var j=i+1; j<quadsToDraw.length; j++)
		{
			var polyj = quadsToDraw[j];
			
			if(polyi.swapHas(polyj))
			{
				continue;
			}
			
			if(polyi.maxDist > polyj.minDist)
			{	
				if( !( polyj.minDx > polyi.maxDx || polyj.maxDx < polyi.minDx || 
					   polyj.minDy > polyi.maxDy || polyj.maxDy < polyi.minDy ) )
				{
					var ptestj = polyi.planeTest(polyj);
					var ptesti = polyj.planeTest(polyi);
					
					if(ptesti != 0 && ptesti == ptestj)
					{
						continue;
					}
					else if(ptestj > 0 || ptesti < 0)
					{
						swapManage(polyi, polyj, false);
						continue;
					}
					else if(ptestj < 0 || ptesti > 0)
					{
						swapPolys(polyi, polyj);
						i--;
						break;
					}
					
					/*
					
					complicatedPart:
					find equation of plane of polygon j 
					for all vertices of polygon i, check which side of the j-plane they are on
					for adjacent points of i that are on opposite sides of the plane:
						find line between points and find intersection point with plane
						for each line of polygon j do a test to see whether the intersection is inside or outside
						for the point which is outside, take the two j points that made up line segment, that's v1
						v2 is the line of polygon i with which we found the intersection point
						cross product to find planar equation, using one of the points of i as the point
						if polygons are not intersecting, all points of i should be on one side of this new plane
						which side of the plane it's on determines which one should be drawn first
		
					*/
					
					var ptCheck = [];
				
					var pl = polyi.x.length;
				
					for(var pts=0; pts < pl; pts++)
					{
						ptCheck[pts] = polyi.abovePlane(pts, polyj);
					}
					
					var closerPoly = false;
					var checkFailed = false;
					var firstCompare = true;
					var closestIPointDist = -1;
					
					for(var pts=0; pts < pl; pts++)
					{
						var lnCheck = (ptCheck[pts] != ptCheck[(pts+1) % pl]);
						if(lnCheck)
						{
							var ivec = [ polyi.x[pts] - polyi.x[(pts+1) % pl], 
									     polyi.y[pts] - polyi.y[(pts+1) % pl], polyi.z[pts] - polyi.z[(pts+1) % pl] ];
							var it = (polyj.d - polyj.a * polyi.x[pts] - polyj.b * polyi.y[pts] - polyj.c * polyi.z[pts]) 
									 / (polyj.a * ivec[0] + polyj.b * ivec[1] + polyj.c * ivec[2]);
							var iPoint = [ polyi.x[pts] + ivec[0] * it, polyi.y[pts] + ivec[1] * it, polyi.z[pts] + ivec[2] * it];
							
							//iPoint is the intersection coors with the plane of j on an edge of i that crosses the plane
							
							var oj = [ polyj.a, polyj.b, polyj.c ]; //vector orthogonal to the plane of j
							
							var pjl = polyj.x.length;
							var allInside = true;
							var jToUse = -1;
							
							for(var jpts=0; jpts < pjl; jpts++)
							{
								var jp1 = (jpts+1) % pjl;
								var jPtsvec = [polyj.x[jp1] - polyj.x[jpts], 
											   polyj.y[jp1] - polyj.y[jpts], 
											   polyj.z[jp1] - polyj.z[jpts]];
							
								//find cross-product of line perpendicular to j-plane and one of j's sides
								//basically doing this 4 times makes a prism of infinite length and we
								//want to find where iPoint is outside the box with oTest
								
								var [oa,ob,oc,od] = crossWithPoint(jPtsvec, oj, [polyj.x[jp1],polyj.y[jp1],polyj.z[jp1]]);
								
								var oTest = ( oa * iPoint[0] + ob * iPoint[1] + oc * iPoint[2] ) >= od;
								var outside = oTest;
								
								if(outside)
								{
									allInside = false;
									jToUse = jpts;
									break;
								}
							}
							
							if(allInside)
							{
								checkFailed = true;
								break;
							}
						
							var jp1 = (jToUse+1) % pjl;  //jp1 = j plus 1
							var jvec = [polyj.x[jp1] - polyj.x[jToUse], 
										polyj.y[jp1] - polyj.y[jToUse], 
								        polyj.z[jp1] - polyj.z[jToUse]];
							
							var linePt1 = [ polyj.x[jToUse], polyj.y[jToUse], polyj.z[jToUse] ];
							var linePt2 = [ polyj.x[jp1], polyj.y[jp1], polyj.z[jp1] ];
							var iPointDistToJSegment = distBtwnPtAndLine(iPoint, linePt1, linePt2);
							
							if(closestIPointDist != -1 && closestIPointDist <= iPointDistToJSegment)
							{
								continue; //no point in checking if line is farther away
							}
							else
							{
								closestIPointDist = iPointDistToJSegment;
								firstCompare = true; //reset
							}
								
							//we take the line of j outside the infinite box and cross product it with
							//the line that crosses the j-plane, then set it at a point on polygon j
							//thus we find a separating plane between the two polygons
											
							var [pa,pb,pc,pd] = crossWithPoint(ivec, jvec, linePt2);				
							var playerTest = ( pa * x + pb * y +  pc * z ) >= pd; //side of plane player is on
							
							//idk what opi stands for, maybe orthogonal points iterator (?)							
							for(var opi=0; opi < pl; opi++)
							{
								var jptTest = ( pa * polyi.x[opi] + 
											    pb * polyi.y[opi] +
											    pc * polyi.z[opi] ) >= pd; //side of plane each point of i is on
												
								//if player and jpts match, player and polygon i are on the same side of plane
								var sameSide = (jptTest == playerTest);
								
								if(firstCompare)
								{
									closerPoly = sameSide;
									firstCompare = false;
								}
								else
								{
									if(sameSide != closerPoly)
									{
										checkFailed = true;
										break;
									}
								}
							}
						}
					}
					
					if(checkFailed)
					{
						continue;
					}
					
					if(closerPoly)
					{
						swapManage(polyi, polyj, false);
						continue;
					}
					else
					{
						swapPolys(polyi, polyj);
						i--;
						break;
					}
				}
			}
			else
			{
				break;
			}
		}
	}
	
    for(var i=quadsToDraw.length-1; i>=0; i--)
	{
		var poly = quadsToDraw[i];
		ctxDrawPolygon(poly);
	}
}