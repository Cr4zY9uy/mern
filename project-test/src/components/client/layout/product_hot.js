import "./../style/product_hot.css";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
function Product_Hot() {
    const nav = useNavigate();

    return (
        <div className="product_hot container text-center">
            <h1>Hot sales</h1>
            <OwlCarousel className='owl-theme' loop margin={10} nav items={2} rewind dots={false} lazyLoad={true} mergeFit autoplay={true}>
                <div className='item d-flex'>
                    <img src="./data/fruits/apple2.png" alt="apple" />
                    <div className="pt-4">
                        <h4>Apple 1</h4>
                        <p>10$<span className="discount">50$</span></p>
                        <div className="d-flex qty"><div>Already sold: <span>293 </span></div>&nbsp;<div> Available: <span>999</span></div></div>
                        <ProgressBar variant="danger" now={80} />
                    </div>
                </div>
                <div className='item d-flex'>
                    <img src="./data/fruits/apple4.png" alt="apple" />
                    <div className="pt-4">
                        <h4>Apple 3</h4>
                        <p>10$<span className="discount">50$</span></p>
                        <div className="d-flex qty"><div>Already sold: <span>293 </span></div> &nbsp;<div> Available: <span>999</span></div></div>
                        <ProgressBar variant="danger" now={80} />
                    </div>
                </div>
                <div className='item  d-flex'>
                    <img src="./data/fruits/apple5.png" alt="apple" />
                    <div className="pt-4">
                        <h4>Apple 1</h4>
                        <p>10$<span className="discount">50$</span></p>
                        <div className="d-flex qty"><div>Already sold: <span>293 </span></div> &nbsp;<div> Available: <span>999</span></div></div>
                        <ProgressBar variant="danger" now={80} />
                    </div>
                </div>
            </OwlCarousel>
        </div>
    );
}
export default Product_Hot;