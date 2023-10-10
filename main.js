document.addEventListener('DOMContentLoaded', function () {

    const firstSection = document.querySelector('.opening')
    const title = document.createElement('h1');
    title.innerHTML = "Amazon Leadership Principles";
    firstSection.appendChild(title)

    const amazonPrinciples = document.getElementById("principles");
    const buttonContainer = document.getElementsByClassName("buttonContainer")[0];

    const startButton = document.createElement('button');
    startButton.textContent = "Show";
    buttonContainer.appendChild(startButton)

    const nextButton = document.createElement('button');
    let nextButtonCreated = false;

    let contentRecieved = false;
    let contentShow = false
    let page = 0

    function makeButton(buttonContainer) {
        nextButton.textContent = "Next"
        nextButton.style.display = "inline";
        buttonContainer.appendChild(nextButton)
        nextButtonCreated = true;
    }

    function hideNextButton() {
        nextButton.style.display = "none";
        nextButtonCreated = false;
    }

    function getContent() {
        fetch('scraped_data.json')
            .then(response => response.json())
            .then(data => {

                for (const name in data[0]) {
                    const hr = document.createElement('hr')
                    hr.classList.add('beautiful')
                    const description = data[0][name];
                    const output = document.createElement('ul');
                    const titleName = document.createElement('p')
                    titleName.textContent = name;
                    titleName.classList.add('bold-name');
                    output.appendChild(titleName)
                    output.innerHTML += ` ${description}`;
                    amazonPrinciples.appendChild(output)
                    amazonPrinciples.appendChild(hr)

           }
       })
    }

    function showContent() {
        amazonPrinciples.style.display = "block"
    }

    function hideContent() {
        amazonPrinciples.style.display = "none"
    }
    startButton.addEventListener('click', () => {
        if (!contentRecieved) {
            getContent()
            contentRecieved = true;
        }
        if (startButton.innerHTML === "Show" && contentShow === false) {
            startButton.innerHTML = "Hide"
            page++
            showContent()
            contentShow = true;
        } else {
            page--
            if (page === 0 && contentShow === true) {
                startButton.innerHTML = "Show"
                hideNextButton()
                hideContent()
                contentShow = false;
            }
        }

        if (page !== 0 && nextButtonCreated === false) {
            makeButton(buttonContainer)
        }
    })
})