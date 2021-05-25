import {getResources} from '../services/services';

function cards() {
        // Используем классы для карточек

        class MenuCard {
            constructor(imgSrc, altText, title, desc, price, parentSelector, ...classes) {
                this.imgSrc = imgSrc;
                this.altText = altText;
                this.title = title;
                this.desc = desc;
                this.price = price;
                this.parent = document.querySelector(parentSelector);
                this.transfer = 27;
                this.classes = classes;
                this.changeToUAH();
            }
    
            changeToUAH() {
                this.price = this.price * this.transfer;
            }
    
            render() {
                const element = document.createElement('div');
    
                if (this.classes.lenght === 0) {
                    element.classList.add('menu__item');
                } else {
                    this.classes.forEach(className => element.classList.add(className));
                }
    
                element.innerHTML = `
                    <img src=${this.imgSrc} alt=${this.altText}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.desc}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `;
    
                this.parent.append(element);
    
            }
        }
    
        axios.get('http://localhost:3000/menu')
            .then(data => {
                data.data.forEach(({
                    img,
                    altimg,
                    title,
                    descr,
                    price
                }) => {
                    new MenuCard(img, altimg, title, descr, price, ".menu .container", 'menu__item')
                        .render();
                });
            });
    
    
}

export default cards;