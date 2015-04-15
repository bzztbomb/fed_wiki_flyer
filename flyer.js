$(document).ready(function()
{
	var canvas = $("#myCanvas"),
	 	ctx = canvas.get(0).getContext("2d"),
	 	width = canvas.width(),
	 	height = canvas.height(),
		dark = "#000000",
	 	light = "#FFFFFF";

	function setPixel(x, y, c)
	{
		ctx.fillStyle = c;
		ctx.fillRect(x, y, 1, 1);
	}

	function circle(x, y, r, c) {
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2*Math.PI);
		ctx.fillStyle = c;
		ctx.fill();
	}

	var x,y;
	var diameter = 25;
	for (x=0; x<width+diameter; x+=diameter) {
		for (y=0; y<height+diameter; y+=diameter) {
			circle(x, y, diameter / 2, dark);
		}
	}
});
