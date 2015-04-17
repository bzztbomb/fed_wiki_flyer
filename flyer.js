
function sizeCanvas() {
var canvases = document.getElementsByTagName('canvas');

for (var i = 0; i < canvases.length; i++) {


    canvases[i].style.width = '100%';
    canvases[i].style.height = '100%';
    canvases[i].width = canvases[i].clientWidth;
    canvases[i].height = canvases[i].clientHeight;
	}

}

function flyer() {
	sizeCanvas();

	var c = $("#myCanvas");
	c.width(c.width());
	c.height(c.height());

	var canvas = $("#myCanvas"),
	 	ctx = canvas.get(0).getContext("2d"),
	 	width = canvas.width(),
	 	height = canvas.height(),
		dark = "#444444",
	 	light = "#000000",
	 	curCircles = [],
	 	radius = 20;

	ctx.fillStyle = "#111111";
	ctx.fillRect(0,0,width,height);
	ctx.translate(0.5, 0.5);
	ctx.imageSmoothingEnabled = true;
	ctx.lineWidth = 3;

	function line(x1,y1,x2,y2) {
		ctx.beginPath();
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.strokeStyle = dark;
		ctx.stroke();
	}

	function circle(x, y, r, c) {
		curCircles.push({cx : x, cy : y, cr : r});
	}

	function add_circles() {
		var num_added = 0;
		for (var i = 0; i < curCircles.length; i++) {
			var search_radius = 50 + Math.random() * 50.0;
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

		// ctx.beginPath();
		// ctx.arc(curCircle.cx, curCircle.cy, curCircle.cr, 0, 2*Math.PI);
		// ctx.fillStyle = dark;
		// ctx.fill();
		// ctx.strokeStyle = dark;
		// ctx.stroke();

		var num_sides = Math.floor(3 + Math.random() * 5);
		var t = Math.random() * 2 * Math.PI;
		var j, q;
		var radii = [1.0, 0.99, 0.66, 0.60, 0.25];

		for (q = 0; q < radii.length; q++) {
			ctx.beginPath();
			for (j = 0; j <= num_sides; j++) {
				var x,y;
				x = (curCircle.cr * radii[q]) * Math.cos(t) + curCircle.cx;
				y = (curCircle.cr * radii[q]) * Math.sin(t) + curCircle.cy;
				if (j==0)
					ctx.moveTo(x,y);
				else
					ctx.lineTo(x,y);
				t += (Math.PI * 2) / num_sides;

				ctx.fillStyle = (q == 4 ? dark : light);
				ctx.strokeStyle = dark;
				ctx.stroke();
				ctx.fill();
			}
		}
	}
}

$( window ).resize(flyer);

$(document).ready(flyer);