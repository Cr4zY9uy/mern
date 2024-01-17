import { Link } from "react-router-dom";
import "./../style/product_LSView.css";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Button } from "react-bootstrap";
function Product_LSView() {

    return (
        <div className="product_relate-list ">
            <h2>You may like</h2>
            <OwlCarousel className='owl-theme' loop margin={10} autoPlay nav items={4} rewind dots={false} lazyLoad={true}>
                <div className='item'>
                    <img src="./data/fruits/apple2.png" alt="apple" />
                    <h4>Apple 1</h4>
                    <p>10$<span className="discount">50$</span></p>
                    <Button variant="outline-warning"><i className="bi bi-cart-check-fill"></i>Add to cart</Button>
                </div>
                <div className='item'>
                    <img src="./data/fruits/apple1.png" alt="apple" />
                    <h4>Apple 4</h4>
                    <p>10$<span className="discount">50$</span></p>
                    <Button variant="outline-warning"><i className="bi bi-cart-check-fill"></i>Add to cart</Button>
                </div>
                <div className='item'>
                    <img src="./data/fruits/apple3.png" alt="apple" />
                    <h4>Apple 4</h4>
                    <p>10$<span className="discount">50$</span></p>
                    <Button variant="outline-warning"><i className="bi bi-cart-check-fill"></i>Add to cart</Button>
                </div>
                <div className='item'>
                    <img src="./data/fruits/apple4.png" alt="apple" />
                    <h4>Apple 4</h4>
                    <p>10$<span className="discount">50$</span></p>
                    <Button variant="outline-warning"><i className="bi bi-cart-check-fill"></i>Add to cart</Button>
                </div>
                <div className='item'>
                    <img src="./data/fruits/apple5.png" alt="apple" />
                    <h4>Apple 5</h4>
                    <p>10$<span className="discount">50$</span></p>
                    <Button variant="outline-warning"><i className="bi bi-cart-check-fill"></i>Add to cart</Button>                </div>
            </OwlCarousel>
        </div>
    );
}
export default Product_LSView;