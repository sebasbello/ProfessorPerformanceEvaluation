import Router from "express-promise-router";
import {
  deleteFaculty,
  getFacultyByName,
  getFaculties,
  patchFaculty,
  postFaculty,
} from "../controllers/faculty.controllers.js";
import { validateToken } from "../utilities/authentication/bearer/bearer.js";
import { message, RESPONSE_CODE, RESPONSE_MESSAGE } from "../tools/message.js";

const router = Router();

router.delete("/faculties", validateToken, async (request, response) => {
  try {
    const [row] = await deleteFaculty(request);
    if (row.affectedRows > 0) {
      message(response, RESPONSE_CODE.OK, RESPONSE_MESSAGE.FACULTY_DELETE);
    } else {
      message(
        response,
        RESPONSE_CODE.NOT_FOUND,
        RESPONSE_MESSAGE.FACULTY_NOT_FOUND
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

router.get("/faculties", validateToken, async (request, response) => {
  try {
    const [row] = await getFaculties();
    message(response, RESPONSE_CODE.OK, null, { faculties: row });
  } catch (exception) {
    message(
      response,
      RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
    );
  }
});

router.post("/faculties", validateToken, async (request, response) => {
  try {
    const [row] = await getFacultyByName(request);
    if (row.length > 0) {
      message(
        response,
        RESPONSE_CODE.BAD_REQUEST,
        RESPONSE_MESSAGE.FACULTY_ALREADY_REGISTERED
      );
    } else {
      await postFaculty(request);
      message(response, RESPONSE_CODE.CREATED, RESPONSE_MESSAGE.FACULTY_POST);
    }
  } catch (exception) {
    message(
      response,
      RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
    );
  }
});

router.patch("/faculties", validateToken, async (request, response) => {
  try {
    const [row] = await getFacultyByName(request);
    if (row.length > 0) {
      message(
        response,
        RESPONSE_CODE.BAD_REQUEST,
        RESPONSE_MESSAGE.FACULTY_ALREADY_REGISTERED
      );
    } else {
      await patchFaculty(request);
      message(response, RESPONSE_CODE.CREATED, RESPONSE_MESSAGE.FACULTY_PUT);
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
