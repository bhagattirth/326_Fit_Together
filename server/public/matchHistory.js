

const startup = async ()=> {
    console.log("checking");
    const res = await fetch("http://localhost:5000/getPast/2");
    const json = await res.json();

    
    for(let i = 1; i<=json.length; i++){
       addProfileInfo(json[i-1],i);
       createCarousel(json[i-1].pastWorkout,i);
    }



}

function addProfileInfo(userData, i){
    
    let profileInfo = document.getElementById("profile"+i);
    let profilePic = document.getElementById("profilePic"+i);
    let name = document.createElement("SPAN");

    name.classList.add("prev-matches-name");
    name.innerHTML = userData.name;
    profileInfo.appendChild(name);
    profileInfo.innerHTML+= "</br>"
    profileInfo.innerHTML+= userData.contact;
    profilePic.src= userData.imgURL;
}


function createCarousel(workouts, i){

    let carousel = document.getElementById("carousel"+i);
    let carouselBody = document.createElement("div");
    carouselBody.classList.add("carousel-inner", "border-2");

    let isFirst = true;
    workouts.forEach(function(e){
        createWorkoutCard(e, carouselBody, isFirst);
        isFirst = false;
    });


    //Buttons
    let leftButton = document.createElement("button");
    leftButton.classList.add("carousel-control-prev", "carousel-arrow-color");
    setAttributes(leftButton, {"type":"button", "data-bs-target":"#carousel"+ i, "data-bs-slide":"prev"});

    let spanIcon = document.createElement("SPAN");
    spanIcon.classList.add("carousel-control-prev-icon");
    spanIcon.setAttribute("aria-hidden","true");
    
    let spanIcon2 = document.createElement("SPAN");
    spanIcon2.classList.add("visually-hidden");
    spanIcon2.innerText = "Previous";

    leftButton.appendChild(spanIcon);
    leftButton.appendChild(spanIcon2);
    

    let rightButton = document.createElement("button");
    rightButton.classList.add("carousel-control-next");
    setAttributes(rightButton, {"type":"button", "data-bs-target":"#carousel"+ i, "data-bs-slide":"next"});

    let spanIconR = document.createElement("SPAN");
    spanIconR.classList.add("carousel-control-next-icon");
    spanIconR.setAttribute("aria-hidden","true");
    
    let spanIcon2R = document.createElement("SPAN");
    spanIcon2R.classList.add("visually-hidden");
    spanIcon2.innerText = "Next";

    rightButton.appendChild(spanIconR);
    rightButton.appendChild(spanIcon2R);

    carouselBody.appendChild(leftButton);
    carouselBody.appendChild(rightButton);
    carousel.appendChild(carouselBody);

}


function createWorkoutCard(exercises, cBody, isFirst){
    
    let carouselItem = document.createElement("div");
    isFirst? carouselItem.classList.add("carousel-item", "active") : carouselItem.classList.add("carousel-item");
    
    let card = document.createElement("div");
    card.classList.add("card");
    
    let cardBody = document.createElement("div");
    card.classList.add("card-body");

 
    let cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML=exercises[0];
    cardBody.appendChild(cardTitle);


    let boldText = document.createElement("strong");
    boldText.innerHTML = exercises[1] + ":";
    cardBody.appendChild(boldText);
    
    let exerciseText = document.createElement("p");
    exerciseText.classList.add("card-text");

    for(let i = 2; i<exercises.length; i++){
        exerciseText.innerHTML += exercises[i] + "</br>"
    }

    cardBody.appendChild(exerciseText);
    card.appendChild(cardBody);
    carouselItem.appendChild(card);
    cBody.appendChild(carouselItem);

}

function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

window.onload = startup;