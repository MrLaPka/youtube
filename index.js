onload = function () {
    document.getElementById('submit').addEventListener('click',function (){
     let txt = document.getElementById('area').value;
     let URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${txt}&type=video&maxResults=50&key=AIzaSyCZAKn50LUgqUl-F5tx414y8683angtook`;

let request = new XMLHttpRequest();
request.open('GET', URL, true);
let massVids = [];
let vidsId = [];
let begin;
let end;
let form = document.createElement('form');
let p = document.createElement('p');
p.innerHTML = `Номер страницы: <span class = 'numcolor'><strong>1</strong></span>`;
form.appendChild(p);
request.onload = function() {
   let data = JSON.parse(request.responseText);
   massVids = [...data.items];
let counterLi = 0;
let pagination = document.getElementById('pagination');
while(pagination.firstChild) {
  pagination.removeChild(pagination.firstChild);
};
for(let i=0;i<massVids.length;i++){
  vidsId[i] = massVids[i].id.videoId;
}
let idies0 = vidsId.slice(0,5).join(',');
let statistic = `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCZAKn50LUgqUl-F5tx414y8683angtook&id=${idies0}&part=snippet,statistics`;
let request2 = new XMLHttpRequest();
request2.open('GET', statistic, true);
let id1;
request2.onload = function() {
let data2 = JSON.parse(request2.responseText);
id1 = data2.items[0].id;
mainVid(id1);
resultsLoop(data2);
};
request2.send();
   for(let i=0;i<massVids.length;i++){
    counterLi++;
    vidsId[i] = massVids[i].id.videoId;
    if(counterLi%5 === 0){
     let input = document.createElement('input');
     input.classList.add('inputpages');
     input.value = counterLi/5;
     if(input.value == 1){
       input.checked = true;
     }
     input.type = 'radio';
     input.name = 'number';
     input.addEventListener('click', function(){
      p.innerHTML = `Номер страницы: <span class = 'numcolor'><strong>${input.value}</strong></span>`;
  end = input.value*5;
  begin = end-5;
  idies = vidsId.slice(begin,end).join(',');
  let statistic = `https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCZAKn50LUgqUl-F5tx414y8683angtook&id=${idies}&part=snippet,statistics`;
let request2 = new XMLHttpRequest();
request2.open('GET', statistic, true);
let id1;
request2.onload = function() {
let data2 = JSON.parse(request2.responseText);
id1 = data2.items[0].id;
mainVid(id1);
resultsLoop(data2);
};
request2.send();
   });
   p.classList.add('numstr');
   form.appendChild(input);
   }
  }
  
pagination.appendChild(form);
};

request.send();

  function mainVid(id) {
    document.getElementById('video').innerHTML = `<iframe width='560' height='315' src='https://www.youtube.com/embed/${id}' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>`;
}


function resultsLoop(data) {
  let ls = document.getElementById('list');
  while(ls.firstChild) {
    ls.removeChild(ls.firstChild);
}
   data.items.forEach(function(item, i){
        let thumb = item.snippet.thumbnails.medium.url;
        let title = item.snippet.title;
        let desc = item.snippet.description.substring(0, 500);
        let publication = item.snippet.publishedAt.substring(0, 10);
        let vid = item.id;
        let views = item.statistics.viewCount;
        let channelTit = item.snippet.channelTitle;
        let div = document.createElement('div');
   
        div.innerHTML =  `
          <article class='newarticles' data-key="${vid}">
            <div class='details'>
            <h4><a href = 'https://www.youtube.com/watch?v=${vid}' class = "listhrefs transition"target='_blank'>${title}</a></h4>
            <img src="${thumb}" alt='Заставка видео' class='thumb transition'>
              <p><strong>Описание:</strong> <span class = 'todescription'>${desc}</span></p>
              <p class = 'tochannelid'><strong>Канал:</strong> ${channelTit}</p>
<p><strong>Дата публикации:</strong> ${publication}</p>
<p><strong>Количество просмотров:</strong> ${views}</p>
            </div>

          </article>
          `;
  document.getElementById('list').appendChild(div);
        });
}
document.addEventListener('click', function(e) {
  let el = e ? e.target : window.event.srcElement;
  while (el.getAttribute("data-key") === null) {
    el = el.parentNode || el.parentElement;
  }
  let top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
  if(top > 0) {
    window.scrollBy(0,-1500);
  }
  let id = el.getAttribute("data-key");
    mainVid(id);
});
    });
};