window.onload = function () {
    generateBanner();
    cardEffect();
    showBonusCard();
};

function generateBanner() {
    const bannerHTML = `
        <div id="welcome-banner" class="welcome-banner">
            <h3>Welcome to our page!</h3>
            <p>We are glad to have you here. Enjoy your visit!</p>
        </div>
    `;
    document.getElementById('banner-container').innerHTML = bannerHTML;

    setTimeout(function () {
        const banner = document.getElementById('welcome-banner');
        if (banner) {
            banner.remove();
        }
    }, 3000);
}

function cardEffect() {
    let cards = document.getElementsByClassName('product-card');
    for (i = 0; i < cards.length; i++) {
        cards[i].addEventListener('mouseover', function () {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        cards[i].addEventListener('mouseout', function () {
            this.style.transform = 'scale(1)';
        });
    }
};


const DATA = [
    {
        parts: 'Windows and doors, Lifting sliding systems',
        models: 'Models',
        functionality: 'Functionality',
        colorPallete: 'Color Pallete',
    },
    {
        description: 'Description',
        models: 'Models',
        types: 'Types',
        colorPallete: 'Color Pallete'
    },
    {
        description: 'Description',
        making: 'Making',
        models: 'Models',
        panels: 'Panels'
    },
    {
        description: 'Description',
        blinds: 'Blinds',
        mosquitoNets: 'Mosquito nets',
    }
]

function generateFirstBonusCard(container) {
    container.innerHTML = `
        <p>${DATA[0].parts}</p>
        <p>${DATA[0].models}</p>
        <p>${DATA[0].functionality}</p>
        <p>${DATA[0].colorPallete}</p>
    `;
}

function generateSecondBonusCard(container) {
    container.innerHTML = `
        <p>${DATA[1].description}</p>
        <p>${DATA[1].models}</p>
        <p>${DATA[1].types}</p>
        <p>${DATA[1].colorPallete}</p>
    `;
}

function generateThirdBonusCard(container) {
    container.innerHTML = `
        <p>${DATA[2].description}</p>
        <p>${DATA[2].making}</p>
        <p>${DATA[2].models}</p>
        <p>${DATA[2].panels}</p>
    `;
}

function generateFourthBonusCard(container) {
    container.innerHTML = `
        <p>${DATA[3].description}</p>
        <p>${DATA[3].blinds}</p>
        <p>${DATA[3].mosquitoNets}</p>
    `;
}


function showBonusCard() {
    const productCards = document.getElementsByClassName('product-card');
    for (let i = 0; i < productCards.length; i++) {
        productCards[i].addEventListener('mouseover', function () {
            const bonusDetailsContainers = document.getElementsByClassName('bonus-details');
            const bonusDetailsContainer = bonusDetailsContainers[i];
            if (i === 0) {
                generateFirstBonusCard(bonusDetailsContainer);
            } else if (i === 1) {
                generateSecondBonusCard(bonusDetailsContainer);
            } else if (i === 2) {
                generateThirdBonusCard(bonusDetailsContainer);
            }
            else {
                generateFourthBonusCard(bonusDetailsContainer);
            }

            bonusDetailsContainer.style.display = 'block';
        });
        productCards[i].addEventListener('mouseout', function () {
            const bonusDetailsContainers = document.getElementsByClassName('bonus-details');
            const bonusDetailsContainer = bonusDetailsContainers[i];
            bonusDetailsContainer.style.display = 'none';
        });
    };
}

