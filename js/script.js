var statuss = {
	1: "one",
	2: "two",
	3: "three",
	4: "four",
};
var init_data;
var addUser;
var users_json;
var editUser;
var form;
var len;
window.onload=function(){
	loadData();
	
}
function loadData(){
	users_json=JSON.parse(localStorage.getItem("data"))||init_data;
	len=users_json.length
	var main=document.getElementById("root");
	main.innerHTML=``;
	userId=0;
	users_json.forEach((user)=>{
		userId+=1;
		user.userId=userId;
		var ele=document.createElement("div");
		var name=user.name;
		var statusMessage=user.statusMessage;
		var piclink=user.profilePicture;
		var presence=user.presence;
		var state=statuss[presence];
		var id=userId;
		ele.innerHTML=`
		<div  class="empty">
		<div class="img-container">
			<img src='${piclink}'onclick="show(${id},${users_json.length})" class='user-image ${state}' alt="user image" />
		</div>
		<div class="user-detail">
		<p class="user-name" onclick="show(${id},${users_json.length})">${name}</p>
		<p class="user-message" onclick="show(${id},${users_json.length})">${statusMessage}</p>
		</div>
		<div class='three-btn'>
			<div class="dropdown">
				<a class="" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bi bi-three-dots-vertical"></i></a>
				<ul class="dropdown-menu">
				<li><button id='${id}' onclick='deleteItem(${id})'class="dropdown-item ">Delete</button></li>
				<li><button  id='${id}' onclick='updateItem(${id})'class="dropdown-item ">Update</button></li>
				</ul>
			</div>
		</div>
		</div>
	`
	var chatAdd=document.querySelector(".container-1");
	var chat=document.createElement("div");
	chat.innerHTML=`<header id="chatHeader"></header>
	<div class="chatData" id="chatData${id}">
	<div class="text odd">Heyy this is ${name}!</div>
	<div class="text even"> Heyy this is ${name}!</div>
	<div class="text odd"> Heyy this is ${name}!</div>
	<div class="text even"> Heyy this is ${name}!</div>
	</div>
	<footer id="chatFooter">
		<input type="text" name="message${id}" id="message ${id}"class="message" placeholder="Enter the message here...">
		<button class="send" id="send ${id}" onclick="sendMessage(${id})">send</button>
		
	</footer>`
	chat.className=`userChat ${id}`
	chat.id=`userChat ${id}`;
	ele.className=`user ${id}`;
	ele.id=`user ${id}`;
	chatAdd.append(chat)
	main.appendChild(ele);
	localStorage.setItem("data",JSON.stringify(users_json))
	});
}
function visibileUserForm(){
	var form=document.getElementById("addUserForm");
	var formEdit=document.getElementById("editUserForm");
	form.style.display="flex";
	formEdit.style.display="none";
	for(var i=1;i<=len;i++){
		var msgBox=document.getElementById(`userChat ${i}`);
		msgBox.style.display="none";
	}
	addUser=function(){
		form.style.display="none";
		console.log("hi")
		var namee=document.getElementById("name").value;
		var statusMessagee=document.getElementById("statusMessage").value;
		var piclink=document.getElementById("profilePicLink").value;
		var presencee=document.getElementById("presence").value;
		var obj = { userId: 20, presence: presencee, name: namee, statusMessage: statusMessagee, profilePicture: piclink };
		users_json.push(obj);
		localStorage.setItem("data",JSON.stringify(users_json));
		loadData();
		
		
	}
}
function deleteItem(id){
	var form=document.getElementById("editUserForm");
    form.style.display="none";
	var formAdd=document.getElementById("addUserForm");
	formAdd.style.display="none";
	for(var i=1;i<=len;i++){
		var msgBox=document.getElementById(`userChat ${i}`);
		msgBox.style.display="none";
	}
	var data=JSON.parse(localStorage.getItem("data"));
	data.splice(id-1,1);
	localStorage.setItem("data",JSON.stringify(data));
	loadData();
}
function updateItem(id){
	var data=JSON.parse(localStorage.getItem("data"));
	var form=document.getElementById("editUserForm");
	var formAdd=document.getElementById("addUserForm");
	formAdd.style.display="none";
	form.style.display="flex";
	var i=1;
	for(i=1;i<=len;i++){
		console.log(i)
		var msgBox=document.getElementById(`userChat ${i}`);
		console.log(msgBox.style.display)
		msgBox.style.display="none";
	}
	document.getElementById("editname").value=data[id-1].name||"";
	document.getElementById("editprofilePicLink").value=data[id-1].profilePicture||"";
	document.getElementById("editstatusMessage").value=data[id-1].statusMessage||"";
	document.getElementById("editpresence").value=data[id-1].presence||"";
	
	editUser=function(){
		flag=0;
		for(var i=1;i<=len;i++){
			var msgBox=document.getElementById(`userChat ${i}`);
			msgBox.style.display="none";
		}
			var name=document.getElementById("editname").value;
			var statusMessagee=document.getElementById("editstatusMessage").value;
			var piclink=document.getElementById("editprofilePicLink").value;
			var presencee=document.getElementById("editpresence").value;
			data[id-1].name=name;
			data[id-1].statusMessage=statusMessagee;
			data[id-1].profilePicture=piclink;
			data[id-1].presence=presencee;
			localStorage.setItem("data",JSON.stringify(data));
			form.style.display="none";	
			loadData();		
	}
}
function show(id,len){
	var form=document.getElementById("editUserForm");
    form.style.display="none";
	var formAdd=document.getElementById("addUserForm");
	formAdd.style.display="none";	
	console.log(id)
	console.log(len)
	var i=1;
	for (i=1;i<=len;i++){
		var msgBox=document.getElementById(`userChat ${i}`);
		if(i==id){
			if(msgBox.style.display=="block"){
				msgBox.style.display="none"
			}
			else{
				msgBox.style.display="block"
			}
		}
		else{
			msgBox.style.display="none";
		}
	}


}
init_data = [{
		userId: 1,
		name: "Jon Snow",
		profilePicture:
		"https://preview.redd.it/hlxen8gtwpm01.jpg?width=640&crop=smart&auto=webp&v=enabled&s=a3c43bcbfc1db31d542ef67071559264358b3d2b",
		statusMessage: "We become what we think about!",
		presence: 1,
	},
	{
		userId: 2,
		name: "Daenerys Targaryen",
		profilePicture:
			"https://preview.redd.it/hlxen8gtwpm01.jpg?width=640&crop=smart&auto=webp&v=enabled&s=a3c43bcbfc1db31d542ef67071559264358b3d2b",
		statusMessage: "A positive mindset brings positivethings.",
		presence: 3,
	},
	{
		userId: 3,
		name: "Tyrion Lannister",
		profilePicture:
			"https://mir-s3-cdn-cf.behance.net/project_modules/fs/6a3f5237411193.573f25019c8bf.jpg",
		statusMessage: "One small positive thought can change your whole day",
		presence: 3,
	},
	{
		userId: 4,
		name: "Jaime Lannister",
		profilePicture:
			"https://images.nightcafe.studio/jobs/mWfF1s7OOVg5DMTYiNZ8/mWfF1s7OOVg5DMTYiNZ8--4--qccau.jpg?tr=w-1600,c-at_max",
		statusMessage: "I am a rockstar",
		presence: 1,
	},
	{
		userId: 5,
		name: "Arya Stark",
		profilePicture:
			"https://64.media.tumblr.com/21de4501827aba1c6463ce2ae6a36780/tumblr_ps5le9xxRb1w9a5vgo1_1280.jpg",
		statusMessage: "I am using Gradious messenger",
		presence: 4,
	},
	{
		userId: 5,
		name: "Arya Stark",
		profilePicture:
			"https://64.media.tumblr.com/21de4501827aba1c6463ce2ae6a36780/tumblr_ps5le9xxRb1w9a5vgo1_1280.jpg",
		statusMessage: "I am using Gradious messenger",
		presence: 4,
}
];
