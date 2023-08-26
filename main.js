 var GM = 0;
class scene{
	constructor(){
		this.parent=parent;
		this.background=null;
		this.id;
		this.rgba=[];
		this.name='';
		this.dialog='';
		this.responses=[];
		this.buttons=[];
	}
	display(){
		var html =""
		html += '<div class="content, img">';
		html += '<img class="center-fit" src="' + this.background + '">';
		html += '</div><!--content-->';
		html += '<div id="dialog" class="dialog">';
		html += '<div class="name"><h2>' + this.name + '</h2></div><!--name-->';
		html += '<div class="dialogtext">' + this.dialog +'</div>';
		if(Array.isArray(this.responses) && this.responses.length){
			for(let i=0;i<this.responses.length;i++){
				html += '<div class="response"><div class="resbut"><button class="reply" onclick="gotoScene(' + this.responses[i][1] + ')">select</button></div><div class="restext">' + this.responses[i][0] +'</div></div>';
			}
		}
		if(Array.isArray(this.buttons) && this.buttons.length){
			for(let i=0;i<this.buttons.length;i++){
				if(this.buttons[i].hasOwnProperty("next")){html += '<button class="next" onclick="gotoScene(' + this.buttons[i].next + ')">next</button>';}
				if(this.buttons[i].hasOwnProperty("replay")){
					html += '<div class="rq">';
					html += '<button class="replay" onclick="gotoScene(0)">replay</button>';
					html += '<button class="quit" onclick="window.close()">quit</button>';
					html += '</div><!--rq-->';
				}
				//if(this.buttons[i].hasOwnProperty("quit")){html += '<button class="quit" onclick="window.close()">quit</button>';}
			}
		}
		html += '</div><!--dialog-->';
		document.getElementById("mainbody").innerHTML = html;
		document.getElementById("dialog").style.backgroundColor = "rgba(" + this.rgba[0]+","+ this.rgba[1]+","+ this.rgba[2]+","+ this.rgba[3] + ")";
	}
}

class story{
	constructor(){
		this.Scenes=[];	//Array of scenes
		this.C_Scene=0;	//Current Scenes
		this.title='';
		this.author='';
		this.title_image;
		this.obj = story_json;
	}
	displaytitle(){
		var html = '';
		if (this.title_image!==''){
			html += '<div class="content, img">';
			html += '<img class="center-fit" src="' + this.title_image +'">';
			html += '</div><!--content-->';
		}
		else{
			html += '<div class="content, title-page">';
			html += '<div class="title">';
			html += '<h1>' + this.title + '</h1>';
			html += '<h3>by</h3>';
			html += '<h2>' + this.author + '</h2>';
			html += '</div><!--title-->';
			html += '</div><!--content-->';
			}
		document.getElementById("mainbody").innerHTML = html;
	}
	build(){
		this.title = this.obj.Story.title;
		this.author = this.obj.Story.author;
		this.title_image = this.obj.Story.title_image;
		const sc = this.obj.Scenes;
		this.Scenes = new Array(sc.length);
		this.displaytitle();
		
		for(let i=0;i<sc.length;i++){
			const temp = new scene(this);
			temp.background = sc[i].background;
			temp.id = sc[i].id;
			temp.rgba = sc[i].RGBA;
			temp.name = sc[i].name;
			temp.dialog = sc[i].dialog;
			if(sc[i].hasOwnProperty("responses")){
				temp.responses = new Array(sc[i].responses.length);
				for(let c=0;c<sc[i].responses.length;c++){
					var n = [sc[i].responses[c].reply,sc[i].responses[c].go];
					temp.responses[c]=n;
				}
			}
			if(sc[i].hasOwnProperty("buttons")){
				temp.buttons = new Array(sc[i].buttons.length);
				for(let c=0;c<sc[i].buttons.length;c++){
					var n = sc[i].buttons[c];
					temp.buttons[c]=n;
				}
			}
			this.Scenes[i] = temp;
		}
	}
}


class game{
	constructor(){
		this.running=true;
		this.st = new story();
		
		if(init(this)==false){this.running=false;return -1;}
		
		setTimeout(()=>{this.display_scene(0)}, 2000);
	}
	display_scene(id){
		this.st.Scenes[id].display();
	}
	
}

function init(GM){
	GM.st.build();
	return true;
}

function gotoScene(n){
	GM.st.Scenes[n].display();
}

function main(){
	setTimeout(function(){
		GM = new game();
	}, 1000);
}

window.onload = main();

window.addEventListener("keyup", (e) =>{
	if(e.key == "H" || e.key=="h"){ 
		var d = document.getElementById("dialog");
		d.style.display = d.style.display == "none" ? "block" : "none";
	}
});


let story_json = {
	"Story": {
		"title": "A Short tale",
		"author": "Whoever",
		"title_image": "media/title.png"
	},
	"Scenes": [
		{
			"ID": 0,
			"RGBA": [20, 20, 20, 0.8],
			"background": "media/Tim_Hi.png",
			"name": "Tim",
			"dialog": "Hi, this is just a real short demo. You can create multiple ending stories with this system. By the way you can hide the Text area by hitting 'H' or 'h'. To go to the next screen click the next button at the bottom.",
			
			"buttons": [{ "next": 1 }]
		},
		{
			"ID": 1,
			"RGBA": [20, 20, 20, 0.8],
			"background": "media/Lake.png",
			"name": "Tim",
			"dialog": "As you can see you can have multiple responses. Each can lead to a different scene. A hard coded limit hasn't been set on the number of responses at present.",
			"responses": [
				{
					"reply": "Learn about how it is coded.",
					"go": 2
				},
				{
					"reply": "Learn about what is in the more powerful versions.",
					"go": 3
				},
				{
					"reply": "Learn about the license",
					"go": 4
				}
			]
		},
		{
			"ID": 2,
			"RGBA": [20, 20, 20, 0.8],
			"background": "media/Forest.png",
			"name": "Tim",
			"dialog": "The Story is coded in JSON. However, we are working on a purely visual editor to allow building the stories with no coding required.",
			"buttons": [{ "next": 5 }]
		},
		{
			"ID": 3,
			"RGBA": [20, 20, 20, 0.8],
			"background": "media/JungleJim.png",
			"name": "Tim",
			"dialog": "<p>This version is actually a cut down version. It actually is ported from a C++ version and a more complete html version that has dolls, character classes with a state based attribtute systems and more.</p> <p>The intent is to eventually create a system that has a character design system using SVG graphics and allow a lot greater customization with no coding involved on the users end.</p>",
			"buttons": [{ "next": 5 }]
		},
		{
			"ID": 4,
			"RGBA": [20, 20, 20, 0.8],
			"background": "media/FoodStall.png",
			"name": "Tim",
			"dialog": "<p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p></br><p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p></br><p>THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>",
			"buttons": [{ "next": 5 }]
		},
		{
			"ID": 5,
			"RGBA": [20, 20, 20, 0.8],
			"background": "media/TheEnd.png",
			"name": "Tim",
			"dialog": "If you want to replay the game simply click the replay button below it will take you to the first scene. If you use the quit button it will close the window.",
			"buttons": [{"replay":0}, {"quit":-1}]
		}
	]
};