const media_api_key = "50481853-62d7b31a7db65e858a354ce19";
const book_api_key = "AIzaSyBxTOs-hpczlP3BHfX1Xl6OOuUqdFUTS-g";

const book_api = "https://www.googleapis.com/books/v1/volumes?key="+book_api_key+"&q=";
const image_api = "https://pixabay.com/api/?key="+media_api_key+"&q=";
const video_api = "https://pixabay.com/api/videos/?key="+media_api_key+"&q=";
const recipe_api = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

let using_api ;
let api_type ;

function unselect(){
    let button1 = document.getElementById("video");
    let button2 = document.getElementById("book");
    let button3 = document.getElementById("recipe");
    let button4 = document.getElementById("image");
    button1.style.animation ="none";
    button2.style.animation ="none";
    button3.style.animation ="none";
    button4.style.animation ="none";
}
function unanimate(button){
    button.style.animation = 'none';
}
function animate(button){
    button.style.animationName = 'borderani';
    button.style.animationDuration= '2s';
    button.style.animationIterationCount = 'infinite';
    button.style.animationTimingFunction = 'linear';
}

apiChange('books');
function apiChange(x){
    if (x == 'video'){
        unselect();
        let button = document.getElementById("video");
        animate(button);
        using_api=video_api;
        api_type='video';
    }else if(x == 'books'){
        unselect();
        let button = document.getElementById("book");
        animate(button);
        using_api=book_api;
        api_type='books';

    }else if(x == 'recipe'){
        unselect();
        let button = document.getElementById("recipe");
        animate(button);
        using_api=recipe_api;
        api_type='recipe';

    }else{
        unselect();
        let button = document.getElementById("image");
        animate(button);
        using_api=image_api;
        api_type='image';

    }
    console.log("api in use:",using_api);
}
function showanimation(element){
    animate(element);
}
function hideanimation(element){
    unanimate(element);
}
function showcontent(element){
    let visibility = element.nextElementSibling;
    if (visibility){
        visibility.style.display="block";
    }
}
function hidecontent(element){
    let visibility = element.nextElementSibling;
    if (visibility){
        visibility.style.display="none";
    }
}
function keepshowing(element){
    let visibility = element;
    if (visibility){
        visibility.style.display="block";
    }
}
function stopshowing(element){
    let visibility = element;
    if (visibility){
        visibility.style.display="none";
    }
}

function video(content){
    let result = document.getElementById('result');
    result.innerHTML='';
    console.log('video with content:',content.hits);
    if(content.hits.length==0){
        result.innerHTML=`
            <h3>No Matching Content Available...</h3>
        `
    }
    else{
    content.hits.forEach(element => {
        console.log("each content:",element);
        let container = document.createElement('div');
        container.innerHTML=`
        <a href="${element.videos.large.url}" target="_blank" onmouseover="showanimation(this)" onmouseleave="hideanimation(this)">
            <img src='${element.videos.medium.thumbnail}' width="350px" height="250px" onmouseover="showcontent(this)" onmouseleave="hidecontent(this)">
            <div class="details" onmouseenter="keepshowing(this)" onmouseleave="stopshowing(this)">
                <p>${element.tags}</p>
                <p>${element.type}</p>
            </div>
        </a>
        `;
        result.append(container);
    });
    }
}
function image(content){
    let result = document.getElementById('result');
    result.innerHTML='';
    console.log('image with content:',content);
    if(content.hits.length==0){
        result.innerHTML=`
            <h3>No Matching Content Available...</h3>
        `
    }
    else{
    content.hits.forEach(element => {
        console.log("each content:",element);
        let container = document.createElement('div');
        container.innerHTML=`
        <a href="${element.largeImageURL}" target="_blank" onmouseover="showanimation(this)" onmouseleave="hideanimation(this)">
            <img src="${element.previewURL}" width="350px" height="250px" onmouseover="showcontent(this)" onmouseleave="hidecontent(this)">
            <div class="details" onmouseenter="keepshowing(this)" onmouseleave="stopshowing(this)">
                <p>${element.tags}</p>
                <p>${element.type}</p>
            </div>
        </a>
        `;
        result.append(container);
    });
    }
}
function recipe(content){
    let result = document.getElementById('result');
    result.innerHTML='';
    console.log('recipe with content:',content);
    if(!content.meals){
        result.innerHTML=`
            <h3>No Matching Content Available...</h3>
        `
    }
    else{
    content.meals.forEach(element => {
        console.log("each content:",element);
        let container = document.createElement('div');
        container.innerHTML=`
        <a href="${element.strSource}" target="_blank" onmouseover="showanimation(this)" onmouseleave="hideanimation(this)">
            <img src="${element.strMealThumb}" width="350px" height="250px" onmouseover="showcontent(this)" onmouseleave="hidecontent(this)">
            <div class="details" onmouseenter="keepshowing(this)" onmouseleave="stopshowing(this)">
                <p>${element.strMeal}</p>
                <p>${element.strTags}</p>
            </div>
        </a>
        `;
        result.append(container);
    });
    }
}
function books(content){
    let result = document.getElementById('result');
    result.innerHTML='';
    console.log('books with content:',content);
    if(!content.items){
        result.innerHTML=`
            <h3>No Matching Content Available...</h3>
        `
    }
    else{
    content.items.forEach(element => {
        console.log("each content:",element);
        let container = document.createElement('div');
        container.innerHTML=`
        <a href="${element.accessInfo.webReaderLink}" target="_blank" onmouseover="showanimation(this)" onmouseleave="hideanimation(this)">
            <img src="${element.volumeInfo.imageLinks.thumbnail}" width="350px" height="250px" onmouseover="showcontent(this)" onmouseleave="hidecontent(this)">
            <div class="details" onmouseenter="keepshowing(this)" onmouseleave="stopshowing(this)">
                <p>Title: ${element.volumeInfo.title}</p>
                <p>${element.volumeInfo.pageCount} Pages</p>
            </div>
        </a>
        `;
        result.append(container);
    });
    }
}

word=localStorage.getItem('searchword');
if (word!=""){
    document.getElementById('search').value = word;
    search(word);
    localStorage.setItem('searchword',"");
}

async function search(item){
    console.log("api in use:",using_api,"search type",api_type,"search word",item);
    try{
        let response = await fetch(using_api+encodeURIComponent(item));
        if (response.ok){
            let data = await response.json();
            console.log("parsed data:",data);
            if(api_type == 'video'){
                video(data);
            }
            if(api_type == 'image'){
                image(data);
            }
            if(api_type == 'books'){
                books(data);
            }
            if(api_type == 'recipe'){
                recipe(data);
            }
            if(!data){
                let result = document.getElementById('result');
                result.innerHTML=`
                    <h1>No Matching Content Available</h1>
                `
            }
            }
    }catch(error){
        console.log(error);
    }
}
function handleSearch(){
    let Search_word = document.getElementById("search").value;
    if(Search_word!=""){
    search(Search_word);
    }
}










function nav(){
    let word = document.getElementById("wesearch").value
    localStorage.setItem('searchword',word);
    document.getElementById('wesearch').value='';
    window.location.href='search.html';
    
}

function show(){
    let menu = document.getElementById('options');
    let icon = document.getElementById('icon');
    icon.style.animationName='rotate';
    icon.style.animationDuration='4s';
    icon.style.animationIterationCount='infinite';
    icon.style.animationTimingFunction='linear';
    menu.style.display='block';
}
function hide(){
    let menu = document.getElementById('options');
    let icon = document.getElementById('icon');
    icon.style.animation='none';
    menu.style.display='none';
}