import Router from "express-promise-router";
import {
  validateToken,
  verifyToken,
} from "../utilities/authentication/bearer.js";
import { message, RES_CODE, RES_MESSAGE } from "../utilities/json/message.js";
import {
  checkReview,
  logReview,
  updateReview,
} from "../controllers/review.controllers.js";

const router = Router();

router.post("/reviews", validateToken, (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const [row] = await checkReview(req);
      row.length > 0
        ? message(res, RES_CODE.DATA_ALREDY, RES_MESSAGE.DATA_ALREDY_LOG)
        : async () => {
            await logReview(req);
            message(res, RES_CODE.OK, RES_MESSAGE.DATA_POST);
          };
    });
  } catch (err) {
    message(
      res,
      RES_CODE.INTERNAL_SERVER_ERROR,
      RES_MESSAGE.INTERAL_SERVER_ERROR,
      err
    );
  }
});

router.patch("/reviews", validateToken, (req, res) => {
  try {
    verifyToken(req, res, async () => {
      const [row] = await checkReview(req);
      row.length > 0
        ? message(res, RES_CODE.DATA_ALREDY, RES_MESSAGE.DATA_ALREDY_LOG)
        : async () => {
            await updateReview(req);
            message(res, RES_CODE.OK, RES_MESSAGE.DATA_POST);
          };
    });
  } catch (err) {
    message(
      res,
      RES_CODE.INTERNAL_SERVER_ERROR,
      RES_MESSAGE.INTERAL_SERVER_ERROR,
      err
    );
  }
});

export default router;
