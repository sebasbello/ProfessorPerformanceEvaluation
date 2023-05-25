import Router from "express-promise-router";
import {
    validateToken,
    verifyToken,
} from "../utilities/authentication/bearer.js";
import { getFaculties } from "../controllers/faculty.controllers.js";
import { message, RES_CODE, RES_MESSAGE } from "../utilities/json/message.js";

const router = Router();

router.get("/faculties",validateToken, (req,res) => {
    try{
        verifyToken(req, res, async () => {
            const [row] = await getFaculties();
            message(res, RES_CODE.OK, null, row);
        });
    }catch(err){
        message(
            res,
            RES_CODE.INTERNAL_SERVER_ERROR,
            RES_MESSAGE.INTERAL_SERVER_ERROR,
            err
        );
    }
});