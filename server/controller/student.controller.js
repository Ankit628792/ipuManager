import { createStudent, deleteStudent, exportStudent, findAllStudent, findStudent, updateStudent } from "../service/student.service"
import sendEMail from "../util/sendEMail";

export async function createStudentHandler(req, res) {
    const { email, enrollNo } = req.body;
    try {
        if (!(await findStudent({ email: email, enrollNo: enrollNo }))) {
            const newStudent = await createStudent(req.body)
            if (newStudent) {
                const link = `${process.env.HOST}`
                const data = { subject: `Confirmation for your Credentials Request`, text: link, email: newStudent?.email, html: `<p>Your Request of getting {IPU Internet} is submmited. </p> <p>Click <a href="${link}" target="_blank">Here</a> to check the status for your request</p> ` };
                const result = await sendEMail(data);
                console.log(result);
            }
            return { status: 201, msg: 'Request Submitted Successfully!' };
        } else {
            return { status: 403, msg: 'Student has already requested for email id' }
        }
    } catch (error) {
        console.error(error)
        return { status: 400, msg: "Couldn't make a request" }
    }
}

export async function searchStudentHandler(req, res) {
    const { enrollNo, email } = req.body
    const query = email ? { enrollNo: enrollNo, email: email } : { enrollNo: enrollNo }
    if (!enrollNo) return { status: 404, msg: "Student not found!" }
    try {
        const student = await findStudent(query);
        if (!student) { return { status: 400, msg: "Can't get student data" } }
        if (student?.ipuEmail) return { status: 200, msg: 'Student has provided Requested Credentials' }
        if (!student?.isVerified) return { status: 200, msg: 'Your Request is not verified yet' }
        return { status: 200, msg: 'Your application is waiting to assign credentials' }
    } catch (error) {
        console.error(error)
        return { status: 400, msg: "Couldn't make a request" }
    }
}

export async function getAllStudentHandler(req, res) {
    const { verified } = req.query
    const query = { isVerified: verified == 'undefined' ? true : verified, ipuEmail: undefined, ipuPassword: undefined }
    try {
        const student = await findAllStudent(query);
        if (!student) { return { status: 400, msg: "Can't get student data" } }
        return { status: 200, data: student }
    } catch (error) {
        console.error(error)
        return { status: 400, msg: "Couldn't make a request" }
    }
}
export async function getStudentHandler(req, res) {
    const { _id } = req.query
    if (!_id) return { status: 404, msg: "Student data not found" }
    try {
        const student = await findStudent({ _id: _id });
        if (!student) { return { status: 400, msg: "Can't get student data" } }
        return { status: 200, data: student }
    } catch (error) {
        console.error(error)
        return { status: 400, msg: "Couldn't make a request" }
    }
}

export async function updateStudentHandler(req, res) {
    const { _id, owner, ipuEmail, internetId } = req.body;
    if (!_id || !owner) return { status: 401, msg: "You don't have authorization!" };
    try {
        if (await findStudent({ _id: _id })) {
            if (ipuEmail && await findStudent({ _id: _id, ipuEmail: { $ne: null } })) { return { status: 403, msg: 'Student has already provided email id' } }
            if (internetId && await findStudent({ _id: _id, internetId: { $ne: null } })) { return { status: 403, msg: 'Student has already provided internet id' } }
            const student = await updateStudent(_id, req.body)
            if (ipuEmail) {
                const data = { subject: `Confirmation of IPU Email Access`, email: student?.email, html: `<p>Your Request of getting IPU Email Access is completed. </p> <p>Here is your credentials</p> <p>Mail id: ${student?.ipuEmail} <br /> Password: ${student?.ipuPassword}</p> <p>Follow the university rules and do not share my Password / Credential to anyone</p>` };
                const result = await sendEMail(data);
                console.log(result);
            }
            if (internetId) {
                const data = { subject: `Confirmation of IPU Internet Access`, email: student?.email, html: `<p>Your Request of getting IPU Internet Access is completed. </p> <p>Here is your credentials</p> <p>Internet id: ${student?.ipuEmail} <br /> Password: ${student?.ipuPassword}</p> <p>Follow the university rules and do not share my Password / Credential to anyone</p>` };
                const result = await sendEMail(data);
                console.log(result);
            }
            return { status: 200, msg: 'Student Updated Successfully!' };
        } else {
            return { status: 404, msg: "Couldn't update student currently" }
        }
    } catch (error) {
        console.error(error)
        return { status: 400, msg: "Couldn't make a request" }
    }
}

export async function removeStudentHandler(req, res) {
    const { _id } = req.query;
    if (!_id) return { status: 404, msg: "Couldn't get Student" }
    try {
        if (await findStudent({ _id: _id })) {
            await deleteStudent(_id)
            return { status: 200, msg: 'Student removed Successfully!' };
        } else {
            return { status: 404, msg: "Couldn't get Student" }
        }
    } catch (error) {
        console.error(error)
        return { status: 400, msg: "Couldn't make a request" }
    }
}

export async function exportStudentHandler(req, res) {
    const { initialDate, finalDate } = req.body;
    try {
        const query = {
            updatedAt: { $gte: new Date(initialDate), $lte: new Date(finalDate) },
            isVerified: true
        }
        const data = await exportStudent(query);
        if (!data) { return { status: 400, msg: "Can't get student data" } }
        return { status: 200, data: data }
    } catch (error) {
        console.error(error)
        return { status: 400, msg: "Couldn't make a request" }
    }

}