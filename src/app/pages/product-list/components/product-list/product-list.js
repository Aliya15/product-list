import {getProductList} from '../../services/product-list.service.js';
import {ProductListItem} from '../product-list-item/product-list-item.js';
import {ProductListHeader} from '../product-list-header/product-list-header.js';
import {SortingTypes} from '../../models/sorting-types.js';
import './product-list.scss';

export class ProductList {
    productListHeader = new ProductListHeader();
    productListItem = new ProductListItem();
    productListElement;
    productList;
    filteredProductList;

    async getProductList() {
        this.productList = await getProductList();
        return this.productList;
    }


    createProductList() {
        this.createProductListElement();
        this.createHeaderElement(this.productList);
        this.createProductListBlockElement(this.productList);

        return this.productListElement;
    }

    createHeaderElement(productList) {
        const productHeaderElement = this.productListHeader.createProductListHeader(productList.length);
        this.productListElement.appendChild(productHeaderElement);
    }

    createProductListBlockElement(productList) {
        if (!productList.length) {
            const messageElement = document.createElement('h2');

            messageElement.innerText = 'No products to show';

            this.productListElement.appendChild(messageElement);
        } else {
            const productListBlockElement = document.createElement('div');
            productListBlockElement.classList.add('product-list__block');
            productListBlockElement.id = 'product-list-block';
            productList.map((product) => {
                const productElement = this.productListItem.createProductListItem(product);
                productListBlockElement.appendChild(productElement);
            });
            this.productListElement.appendChild(productListBlockElement);
        }
    }


    createProductListElement() {
        this.productListElement = document.createElement('div');
        this.productListElement.classList.add('product-list');
        this.productListElement.id = 'product-list';
    }

    removeProductList() {
        const productListElement = [...document.getElementsByClassName('product')];
        const productListBlockElement = document.getElementById('product-list-block');
        productListElement.forEach((item) => item.remove());
        productListBlockElement.remove();
    }

    filterProductList(category) {
        this.removeProductList();

        this.filteredProductList = this.productList.filter((product) => {
            return product.category === category.toLowerCase();
        });
        this.createProductListBlockElement(this.filteredProductList);
        return this.productListElement;
    }

    sortProductList(sortingType) {
        this.removeProductList();

        let productList = this.productList;
        if (this.filteredProductList?.length) {
            productList = this.filteredProductList;
        }
        productList.sort((a, b) => sortingType === SortingTypes.asc ? a.price - b.price : b.price - a.price);

        this.createProductListBlockElement(productList);

        return this.productListElement;
    }
}
