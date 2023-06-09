import Router from "express-promise-router";
import {
  getSchoolPeriodById,
  getSchoolPeriods,
} from "../controllers/schoolPeriod.controllers.js";
import { validateToken } from "../utilities/authentication/bearer/bearer.js";
import { message, RESPONSE_CODE, RESPONSE_MESSAGE } from "../tools/message.js";

const router = Router();

router.get("/schoolperiods", validateToken, async (request, response) => {
  try {
    const [row] = await getSchoolPeriods();
    message(response, RESPONSE_CODE.OK, null, { schoolPeriods: row });
  } catch (exception) {
    message(
      response,
      RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
    );
  }
});

router.post("/schoolperiods/id", validateToken, async (request, response) => {
  try {
    const [row] = await getSchoolPeriodById(request);
    if (row.length > 0) {
      message(response, RESPONSE_CODE.OK, null, { schoolPeriods: row });
    } else {
      message(
        response,
        RESPONSE_CODE.NOT_FOUND,
        RESPONSE_MESSAGE.SCHOOL_PERIOD_NOT_FOUND
      );
    }
  } catch (exception) {
    message(
      response,
      RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
    );
  }
});

export default router;
