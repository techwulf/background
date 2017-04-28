$(document).ready(Main);

var xrange = 0;
var yrange = 0;
var cells = {};
var canvas = $('<canvas>');
canvas.attr('id','background');


function Main(){
	CheckRange();
	GenerateCanvas();
	AnimateCells();
	$(window).resize(CheckRange);
}


function CheckRange(){
	this.height = $(window).height();
	this.width  = $(window).width();
	this.xran   = Math.floor(width/50)+1;
	this.yran   = Math.floor(height/50)+1;
	this.canvas = canvas;
	if(xran !== xrange || yran !== yrange){
		xrange = xran;
		yrange = yran;
		for(y=0;y<yrange;y++){
			for(x=0;x<xrange;x++){
				this.cell = x.toString()+'_'+y.toString();
				if(cell in cells){
					if(cells[cell]['x'] > xrange ||
						cells[cell]['y'] > yrange){
						delete cells[cell];
					}
				}
				else{
					cells[cell] = {
						'x':x,
						'y':y,
						'delay':$.now(),
						'color':randrange(197,255),
						'i':0,
					};
				}
			}
		}
		canvas.attr('width',xrange*50);
		canvas.attr('height',yrange*50);
		$(canvas).css('margin-top','-'+((yrange*50)/2).toString()+'px');
		$(canvas).css('margin-left','-'+((xrange*50)/2).toString()+'px');
	}
}

function GenerateCanvas(){
	this.width = xrange*50;
	this.height = yrange*50;
	this.topMargin = '-'+((yrange*50)/2).toString()+'px';
	this.leftMargin= '-'+((xrange*50)/2).toString()+'px';
	canvas.attr('width',width);
	canvas.attr('height',height);
	//canvas.css('margin-top',topMargin);
	//canvas.css('margin-left',leftMargin);
	$('body').prepend(canvas);
}


function AnimateCells(){
	setInterval(function(){
		$.each(cells, function(key,obj){

			x = obj['x']*50;
			y = obj['y']*50;
			i = obj['i'];
			color = obj['color'];
			delay = obj['delay'];
			ctx = canvas[0].getContext('2d');
			scol = color;

			if(delay<$.now()){
				if(i == 10){
					cells[key]['color'] = randrange(197,255);
					cells[key]['delay'] = randrange(2000,4000)+$.now();
					cells[key]['i'] = 0;
				}
				else{
					cells[key]['color'] = scol;
					cells[key]['i'] += 1;
					scol = 'rgba('+scol.toString()+','
							+scol.toString()+','
							+scol.toString()+',.1)';
					ctx.fillStyle = scol;
					ctx.fillRect(x,y,50,50);

				}
			}
		});
	},100);
}


function randrange(lower,higher){
	this.number = Math.floor(Math.random()*(higher-lower)+lower);
	return number;
}
