$(document).ready(function()
{
	var canvas = $("#myCanvas"),
	 	ctx = canvas.get(0).getContext("2d"),
	 	width = canvas.width(),
	 	height = canvas.height(),
		dark = "#000000",
	 	light = "#FFFFFF",
	 	curCircles = [],
	 	radius = 10;

	function line(x1,y1,x2,y2) {
		ctx.beginPath();
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.stroke();
	}

	function circle(x, y, r, c) {
		curCircles.push({cx : x, cy : y, cr : r});
	}

	function add_circles() {
		var num_added = 0;
		for (var i = 0; i < curCircles.length; i++) {
			var search_radius = 30 + Math.random() * 30.0;
			var search_radius_squared = search_radius*search_radius;
			var t = Math.random() * 2 * Math.PI;

			var curCircle = curCircles[i];
			var t = Math.random() * Math.PI * 2;
			var nx = search_radius * Math.cos(t) + curCircle.cx;
			var ny = search_radius * Math.sin(t) + curCircle.cy;
			if ((nx > width + radius) || (nx < -radius) || (ny > height + radius) || (ny < -radius))
				continue;
			var s = 0;
			var found = false;
			for (s = 0; s < curCircles.length; s++) {
				var test_circle = curCircles[s];
				var dist_squared = (nx-test_circle.cx)*(nx-test_circle.cx)+(ny-test_circle.cy)*(ny-test_circle.cy);
				if ((dist_squared < search_radius_squared) && (dist_squared > 0)) {
					found = true;
					break;
				}
			}
			if (!found) {
				line(curCircle.cx,curCircle.cy,nx,ny);
				circle(nx,ny,radius, dark);
				num_added++;
			}
		}
		return num_added;
	}

	circle(Math.random() * width, Math.random() * height, radius, dark);
	var zero_added = 0;
	while (zero_added < 64) {
		if (add_circles() > 0) {
			zero_added = 0;
		} else {
			zero_added++;
		}
	}
	var i;
	for (i=0; i < curCircles.length; i++) {
		var curCircle = curCircles[i];

		ctx.beginPath();
		ctx.arc(curCircle.cx, curCircle.cy, curCircle.cr, 0, 2*Math.PI);
		ctx.fillStyle = dark;
		ctx.fill();
		ctx.strokeStyle = dark;
		ctx.stroke();
	}
});
