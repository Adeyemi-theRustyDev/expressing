import { Router } from "express";
import { getSingleUserOrAll, signUp } from "../controllers/userController";

const router = Router();

router.get('/user_:id', getSingleUserOrAll);
router.post('/new', signUp);
router.get('/', getSingleUserOrAll);


export default router;