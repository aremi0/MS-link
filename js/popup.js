let dwlBtn = document.getElementById('dwl-btn');
let back = document.getElementById('back');
let creditBtn = document.getElementById('crebit-btn');
let s1 = $('.s1');
let s2 = $('.s2');

//for change color, based on url
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs){
  let url = tabs[0].url;

  if(url.match(/web.microsoftstream.com\/group\//)){
    back.setAttribute('fill', 'rgb(167, 9, 40)');
    s1.text("1. Go on 'Video' section.");
    s2.show();
  }
  else{
    back.setAttribute('fill', 'rgb(140, 140, 140)');
    s1.html("1. Click the Download button.<br>2. Select a group.<br>3. Reopen this extension...");
    s2.hide();
  }
});

//for change the action, based on url
dwlBtn.onclick = function(){
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs){
    let url = tabs[0].url;

    if(url.match(/web.microsoftstream.com\/group\//))
      chrome.tabs.executeScript(tabs[0].id, { file: './js/download.js' });
    else
      chrome.tabs.create({ url: "https://web.microsoftstream.com/studio/groups" });
  });
}

creditBtn.onclick = function(){
  chrome.tabs.create({ url: "https://github.com/aremi0" });
}