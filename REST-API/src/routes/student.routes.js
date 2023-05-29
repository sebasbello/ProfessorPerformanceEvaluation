import Router from "express-promise-router";
import {
  deleteStudent,
  getStudents,
  getStudentsByFaculty,
  getStudentByRegistrationNumber,
  patchStudent,
  postStudent
} from "../controllers/student.controllers.js";
import { validateToken, verifyToken } from "../utilities/authentication/bearer.js";
import { message, RESPONSE_CODE, RESPONSE_MESSAGE } from "../utilities/json/message.js";

const router = Router();

router.delete("/students", validateToken, (request, response) => {
  try {
    verifyToken(request, response, async () => {
      const [row] = await deleteStudent(request);
      row.affectedRows > 0
        ? message(response, RESPONSE_CODE.OK, RESPONSE_MESSAGE.STUDENT_DELETE)
        : message(response, RESPONSE_CODE.NOT_FOUND, RESPONSE_MESSAGE.STUDENT_NOT_FOUND);
    });
  } catch (exception) {
    message(
      response,
      RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      exception
    );
  }
});

router.get("/students/registrationnumber", validateToken, (request, response) => {
  try {
    verifyToken(request, response, async () => {
      const [row] = await getStudentByRegistrationNumber(request);
      row.length > 0
        ? message(response, RESPONSE_CODE.OK, null, row)
        : message(response, RESPONSE_CODE.NOT_FOUND, RESPONSE_MESSAGE.STUDENT_NOT_FOUND);
    });
  } catch (exception) {
    message(
      response,
      RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      exception
    );
  }
});

router.get("/students", validateToken, (request, response) => {
  try {
    verifyToken(request, response, async () => {
      const [row] = await getStudents();
      message(response, RESPONSE_CODE.OK, null, row);
    });
  } catch (exception) {
    message(
      response,
      RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      exception
    );
  }
});

router.get("/students/faculty", validateToken, (request, response) => {
  try {
    verifyToken(request, response, async () => {
      const [row] = await getStudentsByFaculty(request);
      message(response, RESPONSE_CODE.OK, null, row);
    });
  } catch (exception) {
    message(
      response,
      RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      exception
    );
  }
});

router.patch("/students", validateToken, (request, response) => {
  try {
    verifyToken(request, response, async () => {
      const [row] = await patchStudent(request);
      row.affectedRows > 0
        ? message(response, RESPONSE_CODE.OK, RESPONSE_MESSAGE.STUDENT_PUT)
        : message(response, RESPONSE_CODE.NOT_FOUND, RESPONSE_MESSAGE.STUDENT_NOT_FOUND);
    });
  } catch (exception) {
    message(
      response,
      RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR,
      exception
    );
  }
});

router.post("/students", async (request, response) => {
  try {
    await postStudent(request);
    message(response, RESPONSE_CODE.CREATED, RESPONSE_MESSAGE.STUDENT_POST);
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