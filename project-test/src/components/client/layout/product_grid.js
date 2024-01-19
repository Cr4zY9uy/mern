import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage } from '@cloudinary/react';
import "./../style/product_grid.css";
function Product_Grid() {
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dv7ni8uod'
        }
    });
    const myImage = cld.image('shop/xpnsepyssnwwueukiq6x');
    myImage.resize(fill().width(250).height(250));
    return (
        <div className="text-center">
            <div className="searchResult row">
                <div className="search_item col-4">
                    <AdvancedImage cldImg={myImage} />

                    <h4>Apple 1</h4>
                    <p>10$<span className="discount">50$</span></p>
                    <Button variant="outline-warning"><i class="bi bi-cart-check-fill"></i>Add to cart</Button>
                </div>
                <div className="search_item col-4">
                    <img src="/data/fruits/pineapple1.png" alt="pineapple" />
                    <h4>Apple 2</h4>
                    <p>10$<span className="discount">50$</span></p>
                    <Button variant="outline-warning"><i class="bi bi-cart-check-fill"></i>Add to cart</Button>
                </div>
                <div className="search_item col-4">
                    <img src="/data/fruits/pineapple1.png" alt="pineapple" />
                    <h4>Apple 2</h4>
                    <p>10$<span className="discount">50$</span></p>
                    <Button variant="outline-warning"><i class="bi bi-cart-check-fill"></i>Add to cart</Button>
                </div>
            </div>
        </div>
    );
}
export default Product_Grid;