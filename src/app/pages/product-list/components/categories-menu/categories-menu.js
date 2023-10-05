import './categories-menu.scss';

export class CategoriesMenu {

    createCategoriesMenu(categoriesList, categoriesListTitle) {
        const navElement = document.createElement('nav');

        navElement.classList.add('menu');

        const categoriesMenuTitle = this.createCategoriesMenuTitle(categoriesListTitle);
        const categoriesMenu = this.createCategoriesMenuElement(categoriesList);

        navElement.appendChild(categoriesMenuTitle);
        navElement.appendChild(categoriesMenu);

        return navElement;
    }

    createCategoriesMenuTitle(categoriesListTitle) {
        const menuTitleElement = document.createElement('h4');

        menuTitleElement.innerText = categoriesListTitle;
        menuTitleElement.classList.add('menu__title');

        return menuTitleElement;
    }

    createCategoriesMenuElement(categoriesList) {
        const categoriesListBlockElement = document.createElement('div');

        categoriesListBlockElement.classList.add('menu__list');

        categoriesList.forEach((category) => {
            const categoriesListItemElement = document.createElement('a');

            categoriesListItemElement.innerHTML = category;
            categoriesListItemElement.classList.add('menu__list__item');

            categoriesListBlockElement.appendChild(categoriesListItemElement);
        });

        return categoriesListBlockElement;
    }

}
