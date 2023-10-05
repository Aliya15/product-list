import {ProductListPage} from './app/pages/product-list/product-list-page.js';
import './styles.scss';

document.addEventListener('DOMContentLoaded', async function () {
    const productListPage = new ProductListPage();
    await productListPage.init();
});
