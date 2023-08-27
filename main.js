function display_title(){
	var s = story_json.Story;
	var html = '';
	if (s.title_image!==''){
		html += '<div class="content, img">';
		html += '<img class="center-fit" src="' + s.title_image +'">';
		html += '</div><!--content-->';
	}
	else{
		html += '<div class="content, title-page">';
		html += '<div class="title">';
		html += '<h1>' + s.title + '</h1>';
		html += '<h3>by</h3>';
		html += '<h2>' + s.author + '</h2>';
		html += '</div><!--title-->';
		html += '</div><!--content-->';
	}
	document.getElementById("mainbody").innerHTML = html;
}

function display_scene(scene_id){
	var s = story_json.Scenes[scene_id];
	var html =""
	html += '<div class="content, img">';
	html += '<img class="center-fit" src="' + s.background + '">';
	html += '</div><!--content-->';
	html += '<div id="dialog" class="dialog">';
	html += '<div class="name"><h2>' + s.name + '</h2></div><!--name-->';
	html += '<div class="dialogtext">' + s.dialog +'</div>';
	if(Array.isArray(s.responses) && s.responses.length){
		for(let i=0;i<s.responses.length;i++){
			html += '<div class="response"><div class="resbut"><button class="reply" onclick="display_scene(' + s.responses[i].go + ')">select</button></div><div class="restext">' + s.responses[i].reply +'</div></div>';
		}
	}
	if(Array.isArray(s.buttons) && s.buttons.length){
		for(let i=0;i<s.buttons.length;i++){
			if(s.buttons[i].hasOwnProperty("next")){html += '<button class="next" onclick="display_scene(' + s.buttons[i].next + ')">next</button>';}
			if(s.buttons[i].hasOwnProperty("replay")){
				html += '<div class="rq">';
				html += '<button class="replay" onclick="display_scene(0)">replay</button>';
				html += '<button class="quit" onclick="window.close()">quit</button>';
				html += '</div><!--rq-->';
			}
			//if(this.buttons[i].hasOwnProperty("quit")){html += '<button class="quit" onclick="window.close()">quit</button>';}
		}
	}
	html += '</div><!--dialog-->';
	document.getElementById("mainbody").innerHTML = html;
	document.getElementById("dialog").style.backgroundColor = "rgba(" + s.RGBA[0]+","+ s.RGBA[1]+","+ s.RGBA[2]+","+ s.RGBA[3] + ")";
}

function main(){
	setTimeout(function(){
		display_title();
	}, 1000);
	setTimeout(function(){
		display_scene(0);
	}, 2000);
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
