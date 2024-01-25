import { Router } from "express";
import {
    delete_category_all,
    delete_category_one,
    delete_category_list,
    add_category,
    paginate_category,
    all_category,
    edit_category,
    detail_category
} from "../controllers/category_controller.js";
import { checkAuth } from "../middleware/check_auth.js";
import { add_category_validator, edit_category_validator } from "../validator/category_validator.js";
const router = Router();


router.post("/category/add", checkAuth, add_category_validator, add_category);

router.put("/category/edit/:id", checkAuth, edit_category_validator, edit_category);

router.get("/category", all_category);
router.get("/category", paginate_category);
router.get("/category/delete/:id", checkAuth, delete_category_one);
router.get("/category/delete", checkAuth, delete_category_list);
router.get("/category/delete", checkAuth, delete_category_all);
router.get("/category/:id", detail_category);


export default router;