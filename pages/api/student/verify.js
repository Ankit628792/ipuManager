import { verifyStudentHandler } from "../../../server/controller/student.controller";

export default async function handler(req, res) {
    if (req.method == 'PATCH') {
        const { status, msg } = await verifyStudentHandler(req, res);
        res.status(status).send({ msg: msg })
    }
}