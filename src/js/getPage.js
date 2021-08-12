import { getRandomAvatar } from "@fractalsoftware/random-avatar-generator"


export default class getPage {
    constructor(container) {
        this.container = container;
    }

    async fetchData(url) {
        const response = await fetch(url);
        const data = await response.json();
        this.render(data, 'blank')
    }

    render(data, blank) {
        if (data === 'error') {
            this.renderError();
            return;
        };
        this.container.innerHTML = '';
        const widget = document.createElement('div');
        widget.setAttribute('class', 'widget');
        
        data.forEach((i) => {
            const filmBox = document.createElement('div');
            filmBox.setAttribute('class', 'film-box');
            const avatar = getRandomAvatar();
            let elem = undefined;
            if (blank) {
               elem = `<div class = "blank-img"></div>`
            } else {
                elem = `
                <img src= data:image/svg+xml;base64,${btoa(avatar)} alt='avatar'/>
                `
            }

            filmBox.innerHTML = `
            <div class = 'film-name ${blank}'>${i.name}</div>
            <div class = 'film-body'>
                ${elem}
                <div class = 'film-text'>
                    <div class = 'text ${blank}'><span class = 'genre ${blank}'>Genre:</span> ${i.genre}</div>
                    <div class = 'text ${blank}'><span class = 'description ${blank}'>description:</span> ${i.description}</div>
                </div>
            </div>
            `
            widget.append(filmBox);
        })
        this.container.append(widget)
    }

    renderError() {
        const popUp = document.createElement('div');
        popUp.setAttribute('class', 'pop-up');
        popUp.innerHTML = `
        <div class = 'pop-up-text>Data is not eveleble</div>
        `;
        this.container.append(popUp);
    }

}