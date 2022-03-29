import nodemailer from 'nodemailer';

const sendEMail = async (data) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.in',
            secure: true,
            port: 465,
            auth: {
                user: 'ggsipu@zohomail.in',
                pass: 'joebiden', //pass UWCHGfx8sRFN
            },
        })
        const mailData = {
            from: process.env.MAIL_USER,
            to: `${data.email}`,
            subject: `${data.subject}`,
            text: `${data.text}`,
            html: `${data.html}`
        }

        const info = await transporter.sendMail(mailData);
        console.log("result : ", info);
        return 'mail sent'

    }
    catch (error) {
        console.log(error)
    }
}

export default sendEMail