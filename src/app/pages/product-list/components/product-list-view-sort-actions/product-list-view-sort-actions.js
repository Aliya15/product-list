import {SortingTypes} from '../../models/sorting-types.js';
import './product-list-view-sort-actions.scss';

export class ProductListViewSortActions {

    createProductListAction(title, button) {
        const blockElement = document.createElement('div');

        const titleElement = this.createTitle(title);
        const buttonElement = this.createButton(title, button);

        blockElement.appendChild(titleElement);
        blockElement.appendChild(buttonElement);

        return blockElement;
    }

    createTitle(title) {
        const titleElement = document.createElement('p');

        titleElement.classList.add('action-block__item__title');

        titleElement.innerHTML = title;

        return titleElement;
    }

    createButton(title, button) {
        const buttonElement = document.createElement('button');

        buttonElement.classList.add('action-block__item__button');

        if (title.includes('Sort')) {
            buttonElement.id = 'sort-button';
        }

        buttonElement.innerHTML = `${button} <span class='arrow ${button === SortingTypes.asc || button === 'Grid' ? 'down' : 'up'}'></span>`;

        return buttonElement;
    }

}
