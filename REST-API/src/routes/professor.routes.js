import Router from "express-promise-router";
import {
  deleteProfessor,
  patchProfessor,
  postProfessor,
  getProfessors,
  getProfessorsByEducationalExperience,
  getProfessorsByFaculty,
  getProfessorById
} from "../controllers/professor.controllers.js";
import {
  validateToken
} from "../utilities/authentication/bearer/bearer.js";
import {
  message,
  RESPONSE_CODE,
  RESPONSE_MESSAGE
} from "../tools/message.js";

const router = Router();

router.delete("/professors", validateToken, async (request, response) => {
  try {
      const [row] = await deleteProfessor(request);
      row.affectedRows > 0
        ? message(response, RESPONSE_CODE.OK, RESPONSE_MESSAGE.PROFESSOR_DELETE)
        : message(response, RESPONSE_CODE.NOT_FOUND, RESPONSE_MESSAGE.PROFESSOR_NOT_FOUND);
  } catch (exception) {
    message(
      response,
      RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      exception
    );
  }
});

router.get("/professors/id", validateToken, async (request, response) => {
  try {
      const [row] = await getProfessorById(request);
      row.length > 0
        ? message(response, RESPONSE_CODE.OK, null, row)
        : message(response, RESPONSE_CODE.NOT_FOUND, RESPONSE_MESSAGE.PROFESSOR_NOT_FOUND);
  } catch (exception) {
    message(
      response,
      RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      exception
    );
  }
});

router.get("/professors", validateToken, async (request, response) => {
  try {
      const [row] = await getProfessors();
      message(response, RESPONSE_CODE.OK, null, row);
  } catch (exception) {
    message(
      response,
      RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      exception
    );
  }
});

router.get("/professors/educationalexperience", validateToken, async (request, response) => {
  try {
      const [row] = await getProfessorsByEducationalExperience(request);
      message(response, RESPONSE_CODE.OK, null, row);
  } catch (exception) {
    message(
      response,
      RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      exception
    );
  }
});

router.get("/professors/faculty", validateToken, async (request, response) => {
  try {
      const [row] = await getProfessorsByFaculty(request);
      message(response, RESPONSE_CODE.OK, null, row);
  } catch (exception) {
    message(
      response,
      RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      exception
    );
  }
});

router.patch("/professors", validateToken, async (request, response) => {
  try {
      const [row] = await patchProfessor(request);
      row.affectedRows > 0
        ? message(response, RESPONSE_CODE.OK, RESPONSE_MESSAGE.PROFESSOR_PUT)
        : message(response, RESPONSE_CODE.NOT_FOUND, RESPONSE_MESSAGE.PROFESSOR_NOT_FOUND);
  } catch (exception) {
    message(
      response,
      RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      exception
    );
  }
});

router.post("/professors", validateToken, async (request, response) => {
  try {
      await postProfessor(request);
      message(response, RESPONSE_CODE.CREATED, RESPONSE_MESSAGE.PROFESSOR_POST);
  } catch (exception) {
    message(
      response,
      RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      exception
    );
  }
});

export default router;