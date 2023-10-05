import {CategoriesMenu} from './components/categories-menu/categories-menu';
import {ProductList} from './components/product-list/product-list';
import './product-list-page.scss';
import './components/product-list-item/product-list-item.scss';
import {SortingTypes} from './models/sorting-types';

export class ProductListPage {
    mainElement;
    categoriesMenu = new CategoriesMenu();
    productList = new ProductList();
    currentCategory;

    async init() {
        this.mainElement = document.getElementById('app-main');
        await this.createCategoriesMenu();
        this.createProductList();
    }

    async createCategoriesMenu() {
        const productList = await this.productList.getProductList();
        const manuCategories = [... new Set(productList.map((product) => product.category))];
        const categoriesMenuElement = this.categoriesMenu.createCategoriesMenu(manuCategories, 'Categories');
        this.mainElement.appendChild(categoriesMenuElement);

        categoriesMenuElement.addEventListener('click', (event) => {
            if (event.target.className === 'menu__list__item' && this.currentCategory !== event.target.innerText) {
                this.currentCategory = event.target.innerText;
                const filteredProductList = this.productList.filterProductList(this.currentCategory);
                this.mainElement.appendChild(filteredProductList);
            }
        });
    }

    createProductList() {
        const productListElement = this.productList.createProductList();
        this.mainElement.appendChild(productListElement);

        const productListHeader = document.getElementById('sort-button');
        productListHeader.addEventListener('click', ((event) => {
            const sortingType = event.target.innerText;
            this.productList.sortProductList(sortingType);

            const buttonText = sortingType === SortingTypes.asc ? SortingTypes.dsc : SortingTypes.asc;
            productListHeader.innerHTML = `${buttonText} <span class='arrow ${buttonText === SortingTypes.asc ? 'down' : 'up'}'></span>`;
        }));
    }

}
