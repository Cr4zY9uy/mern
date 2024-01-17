import Banner from "../layout/banner";
import Blog from "../layout/blog_list";
import Product_Hot from "../layout/product_hot";
import Product_List from "../layout/product_list";

function Home() {
    return (
        <>
            <Banner />
            <Product_Hot />
            <Product_List />
            <Blog />
        </>
    );
}
export default Home;