const apiKey = 'ce8fbda9669343cc93af1cd29640a145';

let loadNum = 5;
let start = 0
let topic = 'all';
let date = new Date();
let todayDate = `${date.getDate()-1}-${date.getMonth()+1}-${date.getFullYear()}`
console.log(todayDate)


// selectors
const loadBtn = document.querySelector('.loadbtn')
const cardContainer = document.querySelector('.cards-containers');
const lists = document.querySelectorAll('.lists')
const main = document.querySelector('main');
const homeImg = document.querySelector('.logo-img')
const searchBtn = document.querySelector('.search-btn')
const desc = document.querySelectorAll('.news-desc');

let htmlData = '';


async function apiFetch(topicval){
    start = 0;
    htmlData = '';
    let url = `https://newsapi.org/v2/everything?q=${topicval}&from=${todayDate}&sortBy=publishedAt&apiKey=${apiKey}&language=en`
    try {
        cardContainer.classList.remove('error')
        const response = await fetch(url);
        const data = await response.json();
        let article = data['articles'];
        for(let i = start ; i <= loadNum ; i++){
            let title = article[i].title;
            let source = article[i].author;
            let urlLink = article[i].url;
            let img = article[i].urlToImage;
            let description = article[i].description;
            let author = article[i].author;
            if(img === null){
                img = article[i].urlToImage = 'noImg.png';
            };
            if(title == '[Removed]'){
                loadNum++;
                continue;
            }else{
                htmlData += `
                <div class="card">
                <div class="card-header">
                <img src="${img}" alt="img">
                </div>
                <div class="card-content">
                <h2 id="news-title">${title}</h2>
                <h6 class="news-source" id="news-sourse"><i class="fa-regular fa-clock"></i>
                ${author} ${todayDate}</h6>
                <a href="${urlLink}" target="_blank"><p class="news-desc" id="news-de">
                ${description};
                </p></a>
                </div>
                </div>
                `
            }
            start += 1;
        }
        cardContainer.innerHTML = `${htmlData}`
    } catch (error) {
        cardContainer.innerHTML = '';
        cardContainer.classList.add('error')
    }
}

// event listeners

window.addEventListener('load' , apiFetch(topic));
loadBtn.addEventListener('click' , function(){
    if(loadNum >= 95){
        return;
    }else{
        loadNum += 6;
        apiFetch(topic);
    }
})


lists.forEach(value=>{
    value.addEventListener('click' , (e)=>{
        topic = e.target.innerHTML.toLowerCase();
        apiFetch(topic);
        console.log(topic)
    })
})



searchBtn.addEventListener('click' , function(){
    const userInput = document.querySelector('.user-input');
    inputVal = userInput.value;
    topic = inputVal
    if(inputVal === ''){
        return;
    }
    loadNum = 5;
    start = 0;
    apiFetch(topic);
})


homeImg.addEventListener('click' , function(){
    homeImg.parentElement.setAttribute('href' , 'index.html')
})