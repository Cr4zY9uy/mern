import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./../style/product_grid.css";
function Product_Grid() {

    return (
        <div className="text-center">
            <div className="searchResult row">
                <div className="search_item col-4">
                    <img src="./data/fruits/pineapple1.png" alt="pineapple" />
                    <h4>Apple 1</h4>
                    <p>10$<span className="discount">50$</span></p>
                    <Button variant="outline-warning"><i class="bi bi-cart-check-fill"></i>Add to cart</Button>
                </div>
                <div className="search_item col-4">
                    <img src="./data/fruits/pineapple1.png" alt="pineapple" />
                    <h4>Apple 2</h4>
                    <p>10$<span className="discount">50$</span></p>
                    <Button variant="outline-warning"><i class="bi bi-cart-check-fill"></i>Add to cart</Button>
                </div>
                <div className="search_item col-4">
                    <img src="./data/fruits/pineapple1.png" alt="pineapple" />
                    <h4>Apple 2</h4>
                    <p>10$<span className="discount">50$</span></p>
                    <Button variant="outline-warning"><i class="bi bi-cart-check-fill"></i>Add to cart</Button>
                </div>
            </div>
        </div>
    );
}
export default Product_Grid;