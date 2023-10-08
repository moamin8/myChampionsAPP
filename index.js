import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue ,push,remove,child,set,update} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


const appSettings = {
  databaseURL:'https://mychampionsapp-c6710-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const messagelistInDB = ref(database, "message-list");
let sotch=false;
// const messagelistInDB = child(ref(database), "message-list");
// const messagelistInDB = database.ref("message-list");



//elements
const textarea=document.getElementById('textarea');
const fromInput=document.getElementById('from-input');
const toInput=document.getElementById('to-input');
const messageList=document.getElementById('message-list');
const publishButton=document.getElementById('publish-btn');


//add message:
publishButton.addEventListener('click',function(){

 
  const messData={
     toValue:toInput.value,
     messTextValue:textarea.value,
    fromValue:fromInput.value,
    like_count:0,
  }

  if(messData.fromValue && messData.toValue && messData.messTextValue){
    // const messDataJson=JSON.stringify(messData)
   
     push( messagelistInDB,messData);


//test:
// push(messagelistInDB,messData)
// const key=push(messagelistInDB).key;
// set(child(messagelistInDB,key),messData)

// console.log(id)


  }

  
  toInput.value='';
  textarea.value='';
fromInput.value='';

})



function creatMessage(id,mess){
 
 const id_li=id;
  const li=document.createElement('li');
  const from=document.createElement('h3');
  const messText=document.createElement('p');
  const toDiv=document.createElement('div');
  const to=document.createElement('h3');
const likeDiv=document.createElement('div')
const likeimg=document.createElement('span')
const likecount=document.createElement('span')

likeimg.textContent='❤️';
likecount.textContent=mess.like_count
likeDiv.className='like-div'



likeimg.addEventListener('click',function(){
  let c=mess.like_count;
 
  if(sotch===false){
    c+=1;
sotch=true;
console.log(sotch)
  }else if(sotch===true) {
    c-=1;
    sotch=false;
  }
  console.log(c)
  update(child(messagelistInDB,id_li),{
    like_count:c
  })

//     likecount.textContent=c;
// update(ref(messagelistInDB,id),{
//   like_count:c,
// })
// 


})




  li.append(to);
  li.append(messText);
  li.append(toDiv);
  likeDiv.append(likeimg)
  likeDiv.append(likecount)
  toDiv.append(from);
  toDiv.append(likeDiv)
   
  //values;
  to.textContent=`To ${mess.toValue}`
  messText.textContent=mess.messTextValue;
  from.textContent=`From ${mess.fromValue}`
  messageList.prepend(li)


  
}

onValue(messagelistInDB, function(snapshot) {
  messageList.innerHTML=''
// snapshot.exists()
  if(snapshot.exists()){
    let messageItem = Object.entries(snapshot.val());
    messageItem.forEach(function(mess){
        // const message=JSON.parse(mess[1])
        const message=mess[1];
       creatMessage(mess[0],message)
    
     })

    
  }else {
    messageList.innerHTML = "No message here... yet"
}
  
  
})
