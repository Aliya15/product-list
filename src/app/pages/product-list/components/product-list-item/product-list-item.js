export class ProductListItem {

    createProductListItem(itemData) {
        const productListElement = document.createElement('div');
        productListElement.classList.add('product');

        const image = this.createItemImage(itemData);
        const content = this.createItemContent(itemData);
        const actions = this.createItemActions(itemData);

        productListElement.appendChild(image);
        productListElement.appendChild(content);
        productListElement.appendChild(actions);

        return productListElement;
    }

    createItemImage(itemData) {
        const imgElement = document.createElement('img');

        imgElement.classList.add('product__image');
        imgElement.src = itemData.image;
        imgElement.alt = itemData.title;

        return imgElement;
    }

    createItemContent(itemData) {
        const contentElement = document.createElement('div');
        const contentTitleElement = document.createElement('h3');
        const contentDescriptionElement = document.createElement('p');

        contentElement.classList.add('product__information');
        contentTitleElement.classList.add('product__information__title');
        contentDescriptionElement.classList.add('product__information__description');

        contentTitleElement.innerHTML = itemData.title;
        contentDescriptionElement.innerHTML = itemData.description;

        contentElement.appendChild(contentTitleElement);
        contentElement.appendChild(contentDescriptionElement);

        return contentElement;
    }

    createItemActions(itemData) {
        const actionsElement = document.createElement('div');
        const actionsTitleElement = document.createElement('h4');
        const actionsButtonElement = document.createElement('button');
        const actionsButtonArrow = document.createElement('img');

        actionsElement.classList.add('product__actions');
        actionsTitleElement.classList.add('product__actions__title');
        actionsButtonElement.classList.add('product__actions__button');
        actionsButtonElement.id = 'product-item-button';

        actionsButtonArrow.src = 'assets/images/arrow.svg';
        actionsButtonArrow.alt = 'arrow';

        actionsTitleElement.innerText = `€ ${itemData.price.toFixed(2)}`;

        actionsButtonElement.appendChild(actionsButtonArrow);
        actionsElement.appendChild(actionsTitleElement);
        actionsElement.appendChild(actionsButtonElement);

        return actionsElement;
    }

}
