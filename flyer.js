$(document).ready(function()
{
	var canvas = $("#myCanvas"),
	 	ctx = canvas.get(0).getContext("2d"),
	 	width = canvas.width(),
	 	height = canvas.height(),
		dark = "#000000",
	 	light = "#FFFFFF",
	 	curCircles = [];

	function line(x1,y1,x2,y2) {
		ctx.beginPath();
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.stroke();
	}

	function circle(x, y, r, c) {
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2*Math.PI);
		ctx.fillStyle = c;
		ctx.fill();
		curCircles.push({cx : x, cy : y, cr : r});
	}

	function compute_circle(x,y) {
		var radius = 10;
		var search_radius = 30;
		var search_radius_squared = search_radius*search_radius;
		circle(x,y,radius);
		var t = Math.random() * 2 * Math.PI;
		var attempts = 200;
		for (var i = 0; i < attempts; i++) {
			var nx = search_radius * Math.cos(t) + x;
			var ny = search_radius * Math.sin(t) + y;
			var s = 0;
			var found = false;
			for (s = 0; s < curCircles.length; s++) {
				var test_circle = curCircles[s];
				var dist_squared = (nx-test_circle.cx)*(nx-test_circle.cx)+(ny-test_circle.cy)*(ny-test_circle.cy);
				if (dist_squared < search_radius_squared) {
					found = true;
					break;
				}
			}
			if (!found) {
				line(x,y,nx,ny);
				compute_circle(nx,ny,radius); // draw line
			}
			t += Math.random() * ((Math.PI * 2) / attempts);
		}
	}

	compute_circle(Math.random() * width, Math.random() * height);
});
