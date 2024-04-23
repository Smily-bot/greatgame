function drawTable(tx, ty, tz, tw, th, tl)
{
	ctx.fillStyle = "#917857";
	
	fillPrism(tx, ty, tz, tw, th/8, tl);                            //tabletop
	fillPrism(tx+3*tw/8, ty+th/8, tz+3*tl/8, tw/4, 13*th/16, tl/4); //support column
	fillPrism(tx+tw/4, ty + 15*th/16, tz+tl/4, tw/2, th/16, tl/2);  //table base
}

function drawChair(cx, cy, cz, cw, ch, cl, cdir)
{
	ctx.fillStyle = "#e6c687";
	
	fillPrism(cx, cy+5*ch/8, cz, cw, ch/16, cl);  //chair seat
	
	fillPrism(cx, cy+11*ch/16, cz, cw/8, 5*ch/16, cl/8);
	fillPrism(cx+7*cw/8, cy+11*ch/16, cz, cw/8, 5*ch/16, cl/8);     //chair legs
	fillPrism(cx+7*cw/8, cy+11*ch/16, cz+7*cl/8, cw/8, 5*ch/16, cl/8);
	fillPrism(cx, cy+11*ch/16, cz+7*cl/8, cw/8, 5*ch/16, cl/8);
	
	switch(cdir)
	{
		case 0: fillPrism(cx, cy, cz, cw/8, 5*ch/8, cl); break;
		case 1: fillPrism(cx, cy, cz, cw, 5*ch/8, cl/8); break;
		case 2: fillPrism(cx+7*cw/8, cy, cz, cw/8, 5*ch/8, cl); break;
		case 3: fillPrism(cx, cy, cz+7*cl/8, cw, 5*ch/8, cl/8); break;
	}
}

function drawHouse(hx, hy, hz, hw, hh, hl)
{
	ctx.fillStyle = "#aba871";

	draw3dQuad(hx, hy, hz, hx, hy, hz + hl, hx, hy + hh, hz + hl, hx, hy + hh, hz);  //left
	draw3dQuad(hx, hy, hz, hx, hy + hh, hz, hx + hw, hy + hh, hz, hx + hw, hy, hz);  //front
	
	draw3dQuad(hx + hw, hy + hh, hz + hl, hx + hw, hy + hh, hz,    //right
	    hx + hw, hy, hz, hx + hw, hy, hz + hl);
		
	ctx.fillStyle = "#cae4ed";
		
	draw3dQuad(hx + hw, hy + hh, hz + hl, hx + hw, hy + hh, hz,  //floor
	    hx, hy + hh, hz, hx, hy + hh, hz + hl);
		
	ctx.fillStyle = "#d8dbb8";
		
	draw3dQuad(hx + hw/3, hy + hh, hz + hl, hx + hw/3, hy, hz + hl,    //back
	    hx, hy, hz + hl, hx, hy + hh, hz + hl);
		
	draw3dQuad(hx + hw, hy + hh, hz + hl, hx + hw, hy, hz + hl,    //back
	    hx + hw/2, hy, hz + hl, hx+hw/2, hy + hh, hz + hl);
	draw3dQuad(hx + hw/3, hy, hz + hl, hx + hw/3, hy+hh/2, hz + hl,    //back
	    hx + hw/2, hy+hh/2, hz + hl, hx+hw/2, hy, hz + hl);
		
	ctx.fillStyle = "#075175";
		
	draw3dQuad(hx, hy, hz, hx, hy, hz + hl, hx + hw/2, hy-hh, hz + hl/2, hx + hw/2, hy-hh, hz + hl/2); //roof
	draw3dQuad(hx + hw/2, hy-hh, hz + hl/2, hx + hw/2, hy-hh, hz + hl/2, hx + hw, hy, hz, hx + hw, hy, hz + hl); //roof
	draw3dQuad(hx, hy, hz, hx + hw/2, hy-hh, hz + hl/2, hx + hw/2, hy-hh, hz+hl/2, hx + hw, hy, hz); //roof opposite door
	draw3dQuad(hx + hw/2, hy-hh, hz+hl/2, hx, hy, hz + hl, hx + hw, hy, hz+hl, hx + hw/2, hy-hh, hz+hl/2); //roof door
	
	
	ctx.fillStyle = "#5c4c36";
	fillPrism(hx+hw/3, hy+hh/2, hz+hl-hz/8, hw/50, hh/2, hl/8); //door
	ctx.fillStyle = "#f2e82e";
	fillPrism(hx+hw/3 - hw/50, hy+hh-hh/4, hz+hl-hz/8+hl/10, hw/50, hh/50, hl/80); //door handle 
	
	drawTable(hx+hw/4, hy+hh - hh/4, hz+hl/4, hw/4, hh/4, hl/4);
	
	drawChair(hx+hw/2, hy+hh - 3*hh/8, hz + 5*hl/16, hw/8, 3*hh/8, hl/8, 2);
	drawChair(hx+hw/8, hy+hh - 3*hh/8, hz + 5*hl/16, hw/8, 3*hh/8, hl/8, 0);
}
