import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

// Server-side Supabase client — uses the anon key, same as the browser client,
// since RLS policies (not the key itself) control what this role can do
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

    // Server-side validation — the same required fields we checked client-side,
    // verified again since the client can never be fully trusted
    if (!firstName || !lastName || !email || !phone || !nin || !ninSlipPath) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Insert the registration into the database.
    // Note: no .select() here — anon only has INSERT access, not SELECT,
    // by design (only authenticated staff can read registrations back).
    // Requesting the row back after insert would require SELECT too,
    // which is exactly what caused today's RLS errors.
    const { error: dbError } = await supabase
      .from("training_registrations")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address,
        city,
        country,
        gender,
        nin,
        nin_slip_path: ninSlipPath,
        other_id_name: otherIdName,
        id_number: idNumber,
        camera_experience: cameraExperience,
        equipment_used: equipmentUsed,
        learning_goal: learningGoal,
        learning_reason: learningReason,
        creative_field: creativeField,
        preferred_cohort: preferredCohort,
        training_format: trainingFormat,
        referral_source: referralSource,
        emergency_contact_name: emergencyContactName,
        emergency_relationship: emergencyRelationship,
        emergency_phone: emergencyPhone,
        status: "pending",
      });

    if (dbError) {
      console.error("Database insert error:", dbError);
      return NextResponse.json(
        { error: "Failed to save registration. Please try again." },
        { status: 500 }
      );
    }

    // Generate a temporary secure link to the uploaded NIN slip, valid for 7 days —
    // long enough for staff to review, without leaving the document permanently linkable
    const { data: signedUrlData } = await supabase.storage
      .from("training-documents")
      .createSignedUrl(ninSlipPath, 60 * 60 * 24 * 7);

    const idSignedUrl = idFilePath
      ? (
          await supabase.storage
            .from("training-documents")
            .createSignedUrl(idFilePath, 60 * 60 * 24 * 7)
        ).data?.signedUrl
      : null;

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
      // TODO: replace with real recipient(s) once confirmed —
      // currently two placeholder addresses for testing
      to: "omoniyitemitopeisrael@gmail.com, hotistechng@gmail.com",
      from: process.env.SMTP_USER,
      replyTo: email,
      subject: `New Training Registration — ${firstName} ${lastName}`,
      html: `
        <h2>New Training Registration</h2>
        <p><strong>Status:</strong> Pending review</p>

        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address || "Not provided"}, ${city || ""}, ${country || ""}</p>
        <p><strong>Gender:</strong> ${gender || "Not specified"}</p>

        <h3>Identification</h3>
        <p><strong>NIN:</strong> ${nin}</p>
        <p><strong>NIN Slip:</strong> <a href="${signedUrlData?.signedUrl}">View Document</a> (link expires in 7 days)</p>
        ${idSignedUrl ? `<p><strong>Other ID (${otherIdName}):</strong> <a href="${idSignedUrl}">View Document</a></p>` : ""}

        <h3>Experience</h3>
        <p><strong>Camera experience:</strong> ${cameraExperience}</p>
        <p><strong>Equipment used:</strong> ${equipmentUsed || "Not specified"}</p>
        <p><strong>Wants to learn:</strong> ${learningGoal}</p>
        <p><strong>Reason:</strong> ${learningReason}</p>
        <p><strong>Creative field:</strong> ${creativeField || "Not specified"}</p>

        <h3>Training Info</h3>
        <p><strong>Preferred cohort:</strong> ${preferredCohort}</p>
        <p><strong>Format:</strong> ${trainingFormat}</p>
        <p><strong>Heard about VMedex via:</strong> ${referralSource || "Not specified"}</p>

        <h3>Emergency Contact</h3>
        <p><strong>Name:</strong> ${emergencyContactName}</p>
        <p><strong>Relationship:</strong> ${emergencyRelationship}</p>
        <p><strong>Phone:</strong> ${emergencyPhone}</p>
      `,
    });

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

// // Server-side Supabase client — separate from the browser client in lib/supabase.ts,
// // since this runs on the server and can safely use the same anon key
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
//   // process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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

//     console.log("Using Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
// console.log("Using anon key (first 20 chars):", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 20));
//     // Insert the registration into the database
//     const { data: registration, error: dbError } = await
//     supabase
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
//       })
//       .select()
//       .single();



//       console.log("Got here before Error!!!!!")
//     if (dbError) {
//       console.error("Database insert error:", dbError);
//       return NextResponse.json(
//         { error: "Failed to save registration. Please try again. This error!" },
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
//       from: process.env.SMTP_USER,
//       to: "omoniyitemitopeisrael@gmail.com, omoniyitemitopeisrael@gmail.com",
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

//     return NextResponse.json({ success: true, id: registration.id });
//   } catch (error) {
//     console.error("Training registration error:", error);
//     return NextResponse.json(
//       { error: "Something went wrong. Please try again." },
//       { status: 500 }
//     );
//   }
// }