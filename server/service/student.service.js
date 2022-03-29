import Student from "../model/student.model";

export async function createStudent(input) {
    try {
        const student = new Student(input);
        return await student.save()
    } catch (error) {
        throw new Error(error)
    }
}

export async function findStudent(query) {
    try {
        return Student.findOne(query, { ipuPassword: 0 }).lean();
    } catch (error) {
        throw new Error(error)
    }
}

export async function findAllStudent(query) {
    try {
        return Student.find(query, { _id: 1, profileImage: 1, firstName: 1, lastName: 1, programme: 1, enrollNo: 1, isVerified: 1, createdAt: 1 })
    } catch (error) {
        throw new Error(error)
    }
}

export async function updateStudent(_id, input) {
    try {
        return await Student.findByIdAndUpdate({ _id: _id }, input, { new: true })
    } catch (error) {
        throw new Error(error)
    }
}

export async function verifyStudent(filter, query) {
    try {
        return await Student.updateMany(filter, query, { new: true })
    } catch (error) {
        throw new Error(error)
    }
}
export async function closeStudent(filter, query) {
    try {
        return await Student.findByIdAndUpdate(filter, query, { new: true })
    } catch (error) {
        throw new Error(error)
    }
}

export async function deleteStudent(_id) {
    try {
        return await Student.findByIdAndDelete({ _id: _id })
    } catch (error) {
        throw new Error(error)
    }
}

export async function exportStudent(query) {
    try {
        return await Student.find(query)
    } catch (error) {
        throw new Error(error)
    }
}