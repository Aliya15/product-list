
export async function getProductList() {
    try {
        const fetchData = await fetch('https://fakestoreapi.com/products');
        return await fetchData.json();
    } catch (e) {
        console.error(e);
        return [];
    }
}
