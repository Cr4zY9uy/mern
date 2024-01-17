import "./../style/product_list.css";
import { Button } from "react-bootstrap";
function Product_List() {

    return (
        <div className="product_list container">
            <h1>new products</h1>
            <div className="products">
                <div className="product">
                    <img src="./data/fruits/apple1.png" alt="apple1" width={300} height={300} />
                    <h4>Apple 1</h4>
                    <p>10$<span className="discount">50$</span></p>
                  <Button variant="outline-warning"><i class="bi bi-cart-check-fill"></i>Add to cart</Button>
                </div>
                <div className="product">
                    <img src="./data/fruits/apple1.png" alt="apple1" width={300} height={300} />
                    <h4>Apple 1</h4>
                    <p>10$<span className="discount">50$</span></p>
                  <Button variant="outline-warning"><i class="bi bi-cart-check-fill"></i>Add to cart</Button>
                </div>
                <div className="product">
                    <img src="./data/fruits/apple1.png" alt="apple1" width={300} height={300} />
                    <h4>Apple 1</h4>
                    <p>10$<span className="discount">50$</span></p>
                  <Button variant="outline-warning"><i class="bi bi-cart-check-fill"></i>Add to cart</Button>
                </div>
                <div className="product">
                    <img src="./data/fruits/apple1.png" alt="apple1" width={300} height={300} />
                    <h4>Apple 1</h4>
                    <p>10$<span className="discount">50$</span></p>
                  <Button variant="outline-warning"><i class="bi bi-cart-check-fill"></i>Add to cart</Button>
                </div>
            </div>
        </div>
    );
}
export default Product_List;