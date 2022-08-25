let hamburger = document.getElementById('hamburger-menu');
const menu = document.querySelector('nav');
const navLink = document.querySelectorAll("nav a, nav button");
const url = document.querySelector('#url');
const getStarted = document.getElementById('submit-btn');
const smallText = document.querySelector('.url-short small');
var shortLink;

//hamburger menu
console.log(navLink);
hamburger.addEventListener('click',()=>{
    menu.classList.toggle('active');
})

navLink.forEach(navItems => navItems.addEventListener('click',()=>{
    menu.classList.remove('active');
}))

// onclick of generate url button
getStarted.addEventListener('click',()=>{
    if(checkValidUrl()){
        smallText.style.visibility = 'hidden';
        url.style.outline = '2px solid green';
        const parent = document.querySelector('.generated-url');
        if(parent.getAttribute('data-visible') === "false"){
            parent.setAttribute('data-visible','true');
        }
        const enteredUrl = url.value.trim();
        const fetchUrl = `https://api.shrtco.de/v2/shorten?url=${enteredUrl}`;
        
        getData(fetchUrl);  
    }
    if(!checkValidUrl()){
        smallText.innerText = "Enter a Valid URL!";
        smallText.style.visibility = 'visible';
        url.style.outline = '3px solid var(--Red)';
    }
})
//for URL validation
function checkValidUrl(){
    const enteredUrl = url.value.trim();
    try {
        return Boolean(new URL(enteredUrl));
    } catch (error) {
        return false;
    }
}
// for creation of new div
function createDiv(insertedURL, generatedURL){
    const parentDiv = document.querySelector('.generated-url');
    const node1 = document.createElement('section');
    node1.classList.add('url-copies');
    const node2 = document.createElement('span');
    node2.classList.add('entered-url');
    node2.innerText = insertedURL;
    const node3 = document.createElement('span');
    node3.classList.add('api-url');
    node3.innerText = generatedURL;
    const node4 = document.createElement('button');
    node4.innerText = "Copy";
    node4.setAttribute('id','copy-url'); 
    parentDiv.appendChild(node1);
    node1.appendChild(node2);
    node1.appendChild(node3);
    node1.appendChild(node4);

}


// fetch data from api
function getData(url){
    return fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
        createDiv(data.result.original_link,data.result.short_link);

        // copy to clipboard
        const copyBtn = document.querySelectorAll('#copy-url');
        copyBtn.forEach(c => c.addEventListener('click',()=>{
            console.log('click');
            const cb = navigator.clipboard;
            const text = c.previousElementSibling.textContent.trim();
            cb.writeText(text);
            c.innerText = "Copied!";
            setTimeout(()=>{
                c.innerText = "Copy";
            },4000);
        }))
    }).catch(error => {
        console.log(error);
    })
}


