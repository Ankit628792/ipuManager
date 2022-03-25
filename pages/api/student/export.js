import { exportStudentHandler } from "../../../server/controller/student.controller";
import connectDB from "../db";

export default async function handler(req, res) {
    await connectDB()
    try {
        if (req.method == "POST") {
            const type = req.headers['request-type'];
            if (type !== 'export') throw new Error('Invalid Request')
            if (!req.body?.owner) throw new Error('Invalid Request')
            const { status, data } = await exportStudentHandler(req, res);
            res.status(status).send(data)
        }
        else
            throw new Error('Invalid Request')
    }
    catch (e) {
        console.log(e)
        res.status(400).send({ msg: 'Invalid Request' })
    }
}
