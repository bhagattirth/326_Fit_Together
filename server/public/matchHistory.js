class showMatchHistory{
    //number of entries that you want to display
    constructor(number){

        this.matchId = [];

        for(let i = 1; i<=number; i++){
            this.matchId.push("MH"+i);
            let temp = this.createElement("div", {"id":"MH"+i}, ["accordion", "w-75", "mx-auto"]);
            document.body.appendChild(temp);
        }
    }

    //creates a match history entry that will be be displayed **currently the accordian button is broken**
    createPastEntry(workouts, id, number, imgURL){
        //The carosel div
        let element = document.getElementById(id);
        //The carosel item
        let accordItem = this.createElement("div", {}, ["accordion-item"]);
        //The carosel header
        let accordHeader = this.createElement("h2", {"id": "match" + number}, ["accordion-header"]);
        //The opening and closing button
        let accordButtonAttributes = 
        {
            "type":"button", "data-bs-toggle" : "collapse", "data-bs-target" : "#collapse"+number,  
            "aria-expanded" :"true", "aria-controls": "collapse"+number
        }
        let accordButton = this.createElement("button",accordButtonAttributes, ["accordion-button"]);

        //create header text
        let accordHeaderTXT = this.createElement("span", {}, ["prev-matches-header"]);
        //Adds the member's profile picture
        let profilePic = this.createElement("img", {"src":"https://fitnessvolt.com/wp-content/uploads/2022/07/becoming-a-bodybuilder-750x422.jpg", "alt": "profile picture"}, ["card-img-top", "prev-match-img"]);


        //Create span date
        let prevDate = this.createElement("span", {}, ["prev-matches-info"]);
        
        let prevName = this.createElement("span", {}, ["prev-matches-name"]);
        prevName.innerHTML = "Chris Bumstead";
    
        //combining phase 1
        prevDate.appendChild(prevName);
        prevDate.appendChild(document.createElement("br"));
        prevDate.innerHTML += "Last Matched on 1/1/2020";
        prevDate.appendChild(document.createElement("br"));
        prevDate.innerHTML+= "Contact: XXX - XXX - XXXX";

        accordHeaderTXT.appendChild(profilePic);
        accordHeaderTXT.appendChild(prevDate);
        accordHeaderTXT.appendChild(document.createElement("br"));
        accordButton.appendChild(accordHeaderTXT); 
        accordHeader.appendChild(accordButton);    

        let expansion = this.createElement("div", {"id":"collapse"+number, "aria-labelledby":"match"+number, "data-bs-parent":"#"+id}, ["accordion-collapse", "collapse", "show"]);
        expansion.appendChild(this.createAccordianBody(workouts,number));
        accordItem.appendChild(accordHeader);
        accordItem.appendChild(expansion);
        element.appendChild(accordItem);

    }

    //helper function - creates the accordion body for match history
    createAccordianBody(workouts, number){

        //Div and container stuff
        let body = this.createElement("div", {}, ["accordion-body"]);
        let container = this.createElement("div", {}, ["container-fluid"]);
        let row = this.createElement("div", {}, ["row"]);
        let col1 = this.createElement("div", {}, ["col-2", "text-center"]);
        let cardBody = this.createElement("div", {}, ["card-body"]);

        //Creates the buttons and drop down menu
        let reportButton = this.createElement("button", {"type":"button", "id":"report"+number}, ["btn", "btn-danger"]);
        reportButton.innerHTML = "Report Partner"
        cardBody.appendChild(reportButton);
        cardBody.appendChild(document.createElement("br"));
        cardBody.appendChild(document.createElement("br"));

        let removeButton = this.createElement("button", {"type":"button", "id":"remove"+number}, ["btn", "btn-danger"]);
        removeButton.innerHTML= "Remove Match";
        cardBody.appendChild(removeButton);
        cardBody.appendChild(document.createElement("br"));
        cardBody.appendChild(document.createElement("br"));

        let preferenceButton = this.createElement("button", {"type":"button", "id":"availability"+number}, ["btn", "btn-success"]);
        preferenceButton.innerHTML = "View Availability Preferences";
        cardBody.appendChild(preferenceButton);
        cardBody.appendChild(document.createElement("br"));
        cardBody.appendChild(document.createElement("br"));

        let ratingLabel = this.createElement("label", {"for": "selectRating"+ number}, null);
        ratingLabel.innerHTML = "Rate This Workout Partner:";

        let select = this.createElement("select", {"id":"selectRating"+number}, ["form-select"]);
        let temp = this.createElement;
        ["1/5","2/5", "3/5", "4/5", "5/5"].forEach(function(e){
            let element = temp("option", {"value": e.substring(0,1)}, []);
            element.innerHTML = e;
            select.appendChild(element);
        });

        cardBody.appendChild(ratingLabel);
        cardBody.appendChild(select);
        col1.appendChild(cardBody);

        //Creates the carousel and other stuff
        let col2 = this.createElement("div", {}, ["col", "text-center"]);
        let container2 = this.createElement("div", {}, ["container-fluid"]);
        let header2 = this.createElement("h2", {}, []);

        header2.innerHTML = "Past Workouts";
        container2.appendChild(header2);

        let row2 = this.createElement("div", {}, ["row"]);
        row2.appendChild(this.createCarousel(workouts,number));

        //creates the add card
        let addCardCol = this.createElement("div", {}, ["col-4"]);
        let card = this.createElement("div",{}, ["card"]);
        let cardBody2 = this.createElement("div", {}, ["card-body"]);

        let header3 = this.createElement("h3", {}, ["card-title"]);
        header3.innerHTML="Add Workout";

        cardBody2.appendChild(header3);
        cardBody2.appendChild(this.createElement("img", {"src":"https://www.freepnglogos.com/uploads/plus-icon/plus-icon-plus-sign-icon-vector-graphic-pixabay-7.png"}, ["card-img-top", "add-workout-icon"]));
        card.appendChild(cardBody2);
        addCardCol.appendChild(card);
        row2.appendChild(addCardCol);
        container2.appendChild(row2);
        col2.appendChild(container2);
        row.appendChild(col1);
        row.appendChild(col2);
        container.appendChild(row);
        body.appendChild(container);

        return body;
    }

    //helper function - creates the carousel for createAccordionBody
    createCarousel(workouts, number){

        let container = this.createElement("div", {}, ["col-8"]);
        let carousel = this.createElement("div", {"id":"carousel"+number, "data-bs-ride":"false"}, ["carousel", "slide"]);
        let inner = this.createElement("div", {}, ["carousel-inner", "border-2"]);
        
        let isFirst = true;
        
        for (let workout of workouts){
            let card = this.createWorkoutCard(workout);
            if(isFirst){
                isFirst = !isFirst;
                card.classList.add("active");
            }
            inner.appendChild(card);
        }

        carousel.appendChild(inner);
        container.appendChild(carousel);
        return container;
    }

    //helper function - used by createCarousel to create the cards for the carousel
    createWorkoutCard(workout){

        let carouselItem = this.createElement("div", {}, ["carousel-item"]);
        let card = this.createElement("div",{},["card"]);
        let cardBody = this.createElement("div",{}, ["card-body"]);
    
        let cardTitle = this.createElement("h3", {}, ["card-title"]);
        cardTitle.innerHTML = "10/2/2010";
        cardBody.appendChild(cardTitle);

        let boldText = this.createElement("strong", {}, null);
        boldText.innerHTML= "Leg:";
        cardBody.appendChild(boldText);

        let para = this.createElement("p",{},["card-text"]);

        let str = "";
        workout.forEach((e)=> str += e + "<br/>");
        para.innerHTML = str;

        cardBody.appendChild(para);
        card.appendChild(cardBody);
        carouselItem.appendChild(card);

        return carouselItem;
    }

    //helper function
    createElement(elementType,attributes, classNames){
        let element = document.createElement(elementType);
        if (classNames != null){
            element.classList.add(...classNames);
        }

        for(const [key,value] of Object.entries(attributes)){
            element.setAttribute(key, value);
        }
        return element;
    }
}

const l = new showMatchHistory(3);
l.createPastEntry([["legs"]], "MH1", 1, null);
