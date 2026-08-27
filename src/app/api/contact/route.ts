import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function POST(request: NextRequest){
    try{
        const body = await request.json();
        const {name, email, phone, service, message} = body;

        // Server-side validation
        if(!name || !email || !message) {
            return NextResponse.json(
                {error: "Name, email, and message are required."},
                {status: 400}
            )
        }


        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailPattern.test(email)){
            return NextResponse.json(
                {error: "Please provide a valid email address."},
                {status: 400}
            )
        }

        // Setup the mail transporter using our SMTP credentials
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_PORT === "465",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }

        })

        // SEnd the enquiry as an email
        await transporter.sendMail ({
            from: process.env.SMTP_USER,
      to: process.env.CONTACT_RECEIVING_EMAIL,
      replyTo: email,
      subject: `New enquiry from ${name}${service ? ` — ${service}` : ""}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Service of interest: ${service || "Not specified"}

Message:
${message}
      `.trim(),
        });

        return NextResponse.json({success:true});
    } catch(error){
        console.error("Contact form error: ", error);
        return NextResponse.json(
            {error: "Something went wrong. Please try again."},
            {status: 500}
    )

    }
}