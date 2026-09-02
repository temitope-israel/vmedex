import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";

// Database connection pool for MySQL
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      country,
      gender,
      nin,
      ninSlipPath,
      otherIdName,
      idNumber,
      idFilePath,
      cameraExperience,
      equipmentUsed,
      learningGoal,
      learningReason,
      creativeField,
      preferredCohort,
      trainingFormat,
      referralSource,
      emergencyContactName,
      emergencyRelationship,
      emergencyPhone,
    } = body;

    // Server-side validation
    if (!firstName || !lastName || !email || !phone || !nin || !ninSlipPath) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Insert registration record into MySQL
    const insertQuery = `
      INSERT INTO training_registrations (
        first_name, last_name, email, phone, address, city, country, gender,
        nin, nin_slip_path, other_id_name, id_number, id_file_path,
        camera_experience, equipment_used, learning_goal, learning_reason,
        creative_field, preferred_cohort, training_format, referral_source,
        emergency_contact_name, emergency_relationship, emergency_phone, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      firstName,
      lastName,
      email,
      phone,
      address || null,
      city || null,
      country || null,
      gender || null,
      nin,
      ninSlipPath,
      otherIdName || null,
      idNumber || null,
      idFilePath || null,
      cameraExperience || null,
      equipmentUsed || null,
      learningGoal || null,
      learningReason || null,
      creativeField || null,
      preferredCohort || null,
      trainingFormat || null,
      referralSource || null,
      emergencyContactName || null,
      emergencyRelationship || null,
      emergencyPhone || null,
      "pending",
    ];

    await pool.execute(insertQuery, values);

    // Build public/secure file URLs for the email notification
    // Set NEXT_PUBLIC_STORAGE_BASE_URL in your .env (e.g., https://yourdomain.com/uploads)
    const baseUrl = process.env.NEXT_PUBLIC_STORAGE_BASE_URL || "";
    const ninSlipUrl = `${baseUrl}/${ninSlipPath}`;
    const idFileUrl = idFilePath ? `${baseUrl}/${idFilePath}` : null;

    // Send the notification email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });


await transporter.sendMail({
  to: "omoniyitemitopeisrael@gmail.com, hotistechng@gmail.com",
  from: process.env.SMTP_USER,
  replyTo: email,
  subject: `New Training Registration — ${firstName} ${lastName}`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Training Registration</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #FAFAF9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F1115;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FAFAF9; padding: 40px 10px;">
        <tr>
          <td align="center">
            <!-- Main Card Container -->
            <table role="presentation" width="100%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; border: 1px solid rgba(15, 17, 21, 0.08); box-shadow: 0 4px 12px rgba(15, 17, 21, 0.03); overflow: hidden;" cellspacing="0" cellpadding="0">

              <!-- Header -->
              <tr>
                <td style="padding: 36px 32px 28px 32px; background-color: #FFFFFF; border-bottom: 1px solid rgba(15, 17, 21, 0.06);">
                  <div style="display: inline-block; padding: 4px 12px; border-radius: 9999px; background-color: rgba(31, 86, 132, 0.08); border: 1px solid rgba(31, 86, 132, 0.15); color: #1F5684; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 12px;">
                    Pending Review
                  </div>
                  <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #0F1115; letter-spacing: -0.02em;">
                    New Training Registration
                  </h1>
                  <p style="margin: 6px 0 0 0; font-size: 14px; color: rgba(15, 17, 21, 0.6);">
                    Submitted by <strong style="color: #0F1115;">${firstName} ${lastName}</strong>
                  </p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 32px;">

                  <!-- Section: Personal Information -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
                    <tr>
                      <td style="padding-bottom: 8px; border-bottom: 1px solid rgba(15, 17, 21, 0.08); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #1F5684;">
                        Personal Information
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 14px; font-size: 14px; line-height: 1.6; color: #0F1115;">
                        <strong style="color: rgba(15, 17, 21, 0.65);">Full Name:</strong> ${firstName} ${lastName}<br>
                        <strong style="color: rgba(15, 17, 21, 0.65);">Email:</strong> <a href="mailto:${email}" style="color: #1F5684; font-weight: 600; text-decoration: none;">${email}</a><br>
                        <strong style="color: rgba(15, 17, 21, 0.65);">Phone:</strong> ${phone}<br>
                        <strong style="color: rgba(15, 17, 21, 0.65);">Gender:</strong> ${gender || "Not specified"}<br>
                        <strong style="color: rgba(15, 17, 21, 0.65);">Address:</strong> ${address || "Not provided"}${city ? `, ${city}` : ""}${country ? `, ${country}` : ""}
                      </td>
                    </tr>
                  </table>

                  <!-- Section: Identification Documents -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
                    <tr>
                      <td style="padding-bottom: 8px; border-bottom: 1px solid rgba(15, 17, 21, 0.08); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #1F5684;">
                        Identity Verification
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 14px; font-size: 14px; line-height: 1.6; color: #0F1115;">
                        <div style="margin-bottom: 14px;">
                          <strong style="color: rgba(15, 17, 21, 0.65);">NIN Number:</strong> ${nin}
                        </div>

                        <!-- CTA Buttons -->
                        <table role="presentation" cellspacing="0" cellpadding="0">
                          <tr>
                            <td style="padding-right: 12px;">
                              <a href="${ninSlipUrl}" target="_blank" style="display: inline-block; padding: 11px 20px; background-color: #1F5684; color: #FAFAF9; text-decoration: none; font-size: 12px; font-weight: 700; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.8px;">
                                View NIN Slip
                              </a>
                            </td>
                            ${idFileUrl ? `
                            <td>
                              <a href="${idFileUrl}" target="_blank" style="display: inline-block; padding: 11px 20px; background-color: rgba(142, 157, 225, 0.15); color: #163f63; text-decoration: none; font-size: 12px; font-weight: 700; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.8px; border: 1px solid rgba(142, 157, 225, 0.3);">
                                View ${otherIdName || "Other ID"}
                              </a>
                            </td>
                            ` : ""}
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Section: Training & Experience -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
                    <tr>
                      <td style="padding-bottom: 8px; border-bottom: 1px solid rgba(15, 17, 21, 0.08); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #1F5684;">
                        Training & Experience
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 14px; font-size: 14px; line-height: 1.6; color: #0F1115;">
                        <strong style="color: rgba(15, 17, 21, 0.65);">Preferred Cohort:</strong> ${preferredCohort || "Not specified"}<br>
                        <strong style="color: rgba(15, 17, 21, 0.65);">Training Format:</strong> ${trainingFormat || "Not specified"}<br>
                        <strong style="color: rgba(15, 17, 21, 0.65);">Camera Experience:</strong> ${cameraExperience || "Not specified"}<br>
                        <strong style="color: rgba(15, 17, 21, 0.65);">Current Equipment:</strong> ${equipmentUsed || "None specified"}<br>
                        <strong style="color: rgba(15, 17, 21, 0.65);">Learning Goal:</strong> ${learningGoal || "Not specified"}<br>
                        <strong style="color: rgba(15, 17, 21, 0.65);">Creative Field:</strong> ${creativeField || "Not specified"}<br>
                        <strong style="color: rgba(15, 17, 21, 0.65);">Referral Source:</strong> ${referralSource || "Not specified"}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 14px;">
                        <div style="padding: 14px 18px; background-color: #FAFAF9; border-radius: 10px; border-left: 3px solid #8E9DE1; font-size: 13px; color: rgba(15, 17, 21, 0.8); line-height: 1.5;">
                          <strong style="color: #0F1115;">Motivation / Goal:</strong><br>
                          "${learningReason || "No reason provided."}"
                        </div>
                      </td>
                    </tr>
                  </table>

                  <!-- Section: Emergency Contact -->
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="padding-bottom: 8px; border-bottom: 1px solid rgba(15, 17, 21, 0.08); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #1F5684;">
                        Emergency Contact
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top: 14px; font-size: 14px; line-height: 1.6; color: #0F1115;">
                        <strong style="color: rgba(15, 17, 21, 0.65);">Contact Name:</strong> ${emergencyContactName}<br>
                        <strong style="color: rgba(15, 17, 21, 0.65);">Relationship:</strong> ${emergencyRelationship}<br>
                        <strong style="color: rgba(15, 17, 21, 0.65);">Phone:</strong> ${emergencyPhone}
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 24px 32px; background-color: #FAFAF9; border-top: 1px solid rgba(15, 17, 21, 0.06); text-align: center; font-size: 12px; color: rgba(15, 17, 21, 0.45);">
                  VMedex Digital Ltd • Training Registration System
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
});
    // await transporter.sendMail({
    //   to: "omoniyitemitopeisrael@gmail.com, hotistechng@gmail.com",
    //   from: process.env.SMTP_USER,
    //   replyTo: email,
    //   subject: `New Training Registration — ${firstName} ${lastName}`,
    //   html: `
    //     <h2>New Training Registration</h2>
    //     <p><strong>Status:</strong> Pending review</p>

    //     <h3>Personal Information</h3>
    //     <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone}</p>
    //     <p><strong>Address:</strong> ${address || "Not provided"}, ${city || ""}, ${country || ""}</p>
    //     <p><strong>Gender:</strong> ${gender || "Not specified"}</p>

    //     <h3>Identification</h3>
    //     <p><strong>NIN:</strong> ${nin}</p>
    //     <p><strong>NIN Slip:</strong> <a href="${ninSlipUrl}">View Document</a></p>
    //     ${idFileUrl ? `<p><strong>Other ID (${otherIdName || "Document"}):</strong> <a href="${idFileUrl}">View Document</a></p>` : ""}

    //     <h3>Experience</h3>
    //     <p><strong>Camera experience:</strong> ${cameraExperience}</p>
    //     <p><strong>Equipment used:</strong> ${equipmentUsed || "Not specified"}</p>
    //     <p><strong>Wants to learn:</strong> ${learningGoal}</p>
    //     <p><strong>Reason:</strong> ${learningReason}</p>
    //     <p><strong>Creative field:</strong> ${creativeField || "Not specified"}</p>

    //     <h3>Training Info</h3>
    //     <p><strong>Preferred cohort:</strong> ${preferredCohort}</p>
    //     <p><strong>Format:</strong> ${trainingFormat}</p>
    //     <p><strong>Heard about VMedex via:</strong> ${referralSource || "Not specified"}</p>

    //     <h3>Emergency Contact</h3>
    //     <p><strong>Name:</strong> ${emergencyContactName}</p>
    //     <p><strong>Relationship:</strong> ${emergencyRelationship}</p>
    //     <p><strong>Phone:</strong> ${emergencyPhone}</p>
    //   `,
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Training registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}


// import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@supabase/supabase-js";
// import nodemailer from "nodemailer";

// // Server-side Supabase client — uses the anon key, same as the browser client,
// // since RLS policies (not the key itself) control what this role can do
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     const {
//       firstName,
//       lastName,
//       email,
//       phone,
//       address,
//       city,
//       country,
//       gender,
//       nin,
//       ninSlipPath,
//       otherIdName,
//       idNumber,
//       idFilePath,
//       cameraExperience,
//       equipmentUsed,
//       learningGoal,
//       learningReason,
//       creativeField,
//       preferredCohort,
//       trainingFormat,
//       referralSource,
//       emergencyContactName,
//       emergencyRelationship,
//       emergencyPhone,
//     } = body;

//     // Server-side validation — the same required fields we checked client-side,
//     // verified again since the client can never be fully trusted
//     if (!firstName || !lastName || !email || !phone || !nin || !ninSlipPath) {
//       return NextResponse.json(
//         { error: "Missing required fields." },
//         { status: 400 }
//       );
//     }

//     // Insert the registration into the database.
//     // Note: no .select() here — anon only has INSERT access, not SELECT,
//     // by design (only authenticated staff can read registrations back).
//     // Requesting the row back after insert would require SELECT too,
//     // which is exactly what caused today's RLS errors.
//     const { error: dbError } = await supabase
//       .from("training_registrations")
//       .insert({
//         first_name: firstName,
//         last_name: lastName,
//         email,
//         phone,
//         address,
//         city,
//         country,
//         gender,
//         nin,
//         nin_slip_path: ninSlipPath,
//         other_id_name: otherIdName,
//         id_number: idNumber,
//         camera_experience: cameraExperience,
//         equipment_used: equipmentUsed,
//         learning_goal: learningGoal,
//         learning_reason: learningReason,
//         creative_field: creativeField,
//         preferred_cohort: preferredCohort,
//         training_format: trainingFormat,
//         referral_source: referralSource,
//         emergency_contact_name: emergencyContactName,
//         emergency_relationship: emergencyRelationship,
//         emergency_phone: emergencyPhone,
//         status: "pending",
//       });

//     if (dbError) {
//       console.error("Database insert error:", dbError);
//       return NextResponse.json(
//         { error: "Failed to save registration. Please try again." },
//         { status: 500 }
//       );
//     }

//     // Generate a temporary secure link to the uploaded NIN slip, valid for 7 days —
//     // long enough for staff to review, without leaving the document permanently linkable
//     const { data: signedUrlData } = await supabase.storage
//       .from("training-documents")
//       .createSignedUrl(ninSlipPath, 60 * 60 * 24 * 7);

//     const idSignedUrl = idFilePath
//       ? (
//           await supabase.storage
//             .from("training-documents")
//             .createSignedUrl(idFilePath, 60 * 60 * 24 * 7)
//         ).data?.signedUrl
//       : null;

//     // Send the notification email
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: Number(process.env.SMTP_PORT),
//       secure: process.env.SMTP_PORT === "465",
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASSWORD,
//       },
//     });

//     await transporter.sendMail({
//       // TODO: replace with real recipient(s) once confirmed —
//       // currently two placeholder addresses for testing
//       to: "omoniyitemitopeisrael@gmail.com, hotistechng@gmail.com",
//       from: process.env.SMTP_USER,
//       replyTo: email,
//       subject: `New Training Registration — ${firstName} ${lastName}`,
//       html: `
//         <h2>New Training Registration</h2>
//         <p><strong>Status:</strong> Pending review</p>

//         <h3>Personal Information</h3>
//         <p><strong>Name:</strong> ${firstName} ${lastName}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${phone}</p>
//         <p><strong>Address:</strong> ${address || "Not provided"}, ${city || ""}, ${country || ""}</p>
//         <p><strong>Gender:</strong> ${gender || "Not specified"}</p>

//         <h3>Identification</h3>
//         <p><strong>NIN:</strong> ${nin}</p>
//         <p><strong>NIN Slip:</strong> <a href="${signedUrlData?.signedUrl}">View Document</a> (link expires in 7 days)</p>
//         ${idSignedUrl ? `<p><strong>Other ID (${otherIdName}):</strong> <a href="${idSignedUrl}">View Document</a></p>` : ""}

//         <h3>Experience</h3>
//         <p><strong>Camera experience:</strong> ${cameraExperience}</p>
//         <p><strong>Equipment used:</strong> ${equipmentUsed || "Not specified"}</p>
//         <p><strong>Wants to learn:</strong> ${learningGoal}</p>
//         <p><strong>Reason:</strong> ${learningReason}</p>
//         <p><strong>Creative field:</strong> ${creativeField || "Not specified"}</p>

//         <h3>Training Info</h3>
//         <p><strong>Preferred cohort:</strong> ${preferredCohort}</p>
//         <p><strong>Format:</strong> ${trainingFormat}</p>
//         <p><strong>Heard about VMedex via:</strong> ${referralSource || "Not specified"}</p>

//         <h3>Emergency Contact</h3>
//         <p><strong>Name:</strong> ${emergencyContactName}</p>
//         <p><strong>Relationship:</strong> ${emergencyRelationship}</p>
//         <p><strong>Phone:</strong> ${emergencyPhone}</p>
//       `,
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Training registration error:", error);
//     return NextResponse.json(
//       { error: "Something went wrong. Please try again." },
//       { status: 500 }
//     );
//   }
// }


