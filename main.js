document.addEventListener('DOMContentLoaded', function () {

    // create the heading for the document
    const firstSection = document.querySelector('.opening')
    const title = document.createElement('h1');
    title.innerHTML = "Amazon Leadership Principles";
    firstSection.appendChild(title)

    // 
    const amazonPrinciples = document.getElementById("principles");
    const buttonContainer = document.getElementsByClassName("buttonContainer")[0];

    // create a "show" button 
    const showButton = document.createElement('button');
    showButton.textContent = "Show";
    buttonContainer.appendChild(showButton)

    // create a next button for toggling through the leadership principles
    const nextButton = document.createElement('button');

    // initially we don't want to display the button... create a state of false for the button
    let nextButtonCreated = false;
    let contentRecieved = false;
    let page = 0

    // function for creating a next button
    function makeNextButton(buttonContainer) {
        nextButton.textContent = "Next"
        nextButton.style.display = "inline";
        buttonContainer.appendChild(nextButton)
        nextButtonCreated = true;
    }

    // function to call for hiding the next button (when the index is less than 0, no principle will display, so the next button should disappear)
    function hideNextButton() {
        nextButton.style.display = "none";
        nextButtonCreated = false;
    }

    // our "get request" to the json file containing the scraped data that we are working with
    function getContent() {
        fetch('scraped_data.json')
            // put the response in JSON
            .then(response => response.json())
            .then(data => {

                // for each of the principles
                for (const name in data[0]) {
                    // create a "hr" element
                    const hr = document.createElement('hr')
                    // define a class to the hr elements called beautiful
                    hr.classList.add('beautiful')
                    // put the description of the leadership values in a variable called description
                    const description = data[0][name];
                    // create an unordered list to later display the data to the screen
                    const output = document.createElement('ul');
                    // create a paragraph element
                    const titleName = document.createElement('p')
                    // attach the leadership principle name to be the "title"
                    titleName.textContent = name;
                    // add class of bold-name
                    titleName.classList.add('bold-name');
                    // append the child element to it's parent. titleName being child, output being parent
                    output.appendChild(titleName)
                    // apply the description, easiest to use template literals
                    output.innerHTML += ` ${description}`;
                    // append the unordered list to the Amazon principles div
                    amazonPrinciples.appendChild(output)
                    // after each principle, make sure the hr element shows for separation purposes
                    amazonPrinciples.appendChild(hr)

           }
       })
    }

    // function that displays the content
    function showContent() {
        amazonPrinciples.style.display = "block"
    }

    // function that hides the content
    function hideContent() {
        amazonPrinciples.style.display = "none"
    }

    // when the show button is clicked
    showButton.addEventListener('click', () => {
        // if the state of the content is set to false, get the content
        if(!contentRecieved){
            getContent()
            // change the state of the variable to true
            contentRecieved = true;
        }
        
        // if the button still says show and the variable has been updated to true...
        if (showButton.innerHTML === "Show" && contentRecieved === true) {
            // change the text of the button to say "hide"
            showButton.innerHTML = "Hide"
            // show the content to the screen
            showContent()
            // change the state of content being shown to true.
            contentShow = true;
        } else {
            
            // otherwise if the information is already there, then hide the content
                hideContent()
                // change the state back to false
                contentShow = false;
                // change the button text back to "show"
                showButton.innerHTML = "Show"
            
        }
    })
})