import {ProductListViewSortActions} from '../product-list-view-sort-actions/product-list-view-sort-actions.js';
import './product-list-header.scss';
import {SortingTypes} from '../../models/sorting-types.js';

export class ProductListHeader {
    productListViewSortActions = new ProductListViewSortActions();

    createProductListHeader(number) {
        const headerElement = document.createElement('div');
        const headerInformationElement = document.createElement('p');
        const headerGridElement = this.productListViewSortActions.createProductListAction('View', 'Grid');
        const productListSortingElement = this.productListViewSortActions.createProductListAction('Sort by', SortingTypes.asc);

        headerElement.classList.add('product-list__header');
        headerInformationElement.classList.add('product-list__header__title');
        headerGridElement.classList.add('product-list__header__item');
        productListSortingElement.classList.add('product-list__header__item');

        const headerText = `${number} product`;
        headerInformationElement.innerHTML = number > 1 ? `${headerText}s` : headerText;

        headerElement.appendChild(headerInformationElement);
        headerElement.appendChild(headerGridElement);
        headerElement.appendChild(productListSortingElement);

        return headerElement;
    }

}
