"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";

const steps = [
  "Personal Information",
  "Identification",
  "Experience",
  "Training Info",
  "Emergency Contact",
  "Declaration",
];

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  gender: "",
  nin: "",
  otherIdName: "",
  idNumber: "",
  cameraExperience: "",
  equipmentUsed: "",
  learningGoal: "",
  learningReason: "",
  creativeField: "",
  preferredCohort: "",
  trainingFormat: "",
  referralSource: "",
  emergencyContactName: "",
  emergencyRelationship: "",
  emergencyPhone: "",
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function RegisterContent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [ninSlip, setNinSlip] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [agreed, setAgreed] = useState({
    accurate: false,
    consent: false,
    notGuaranteed: false,
    privacy: false,
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const phonePattern = /^\+234\d{10}$/;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = (): boolean => {
    if (currentStep === 0) {
      return !!(
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        phonePattern.test(formData.phone)
      );
    }
    if (currentStep === 1) {
      return !!(formData.nin && ninSlip);
    }
    if (currentStep === 2) {
      return !!(
        formData.cameraExperience &&
        formData.learningGoal &&
        formData.learningReason
      );
    }
    if (currentStep === 3) {
      return !!(formData.preferredCohort && formData.trainingFormat);
    }
    if (currentStep === 4) {
      return !!(
        formData.emergencyContactName &&
        formData.emergencyRelationship &&
        phonePattern.test(formData.emergencyPhone)
      );
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) {
      setErrorMessage("Please fill in all required fields before continuing.");
      return;
    }
    setErrorMessage("");
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setErrorMessage("");
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // Uploads a single file through our own API route, which forwards it to
  // the cPanel server via FTPS. Replaces the old direct-to-Supabase upload —
  // this is the piece that changes again later if the app moves to run
  // directly on the cPanel Node hosting.
  const uploadFile = async (file: File, label: string) => {
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("label", label);

    const response = await fetch("/api/upload-document", {
      method: "POST",
      body: uploadFormData,
    });

    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error || `Failed to upload ${label}`);
    return data.filename;
  };

  const handleSubmit = async () => {
    const allAgreed = Object.values(agreed).every(Boolean);
    if (!allAgreed) {
      setErrorMessage(
        "Please confirm all declaration checkboxes before submitting.",
      );
      return;
    }
    if (!ninSlip) {
      setErrorMessage("NIN slip upload is required.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const ninSlipPath = await uploadFile(ninSlip, "nin-slip");
      const idFilePath = idFile ? await uploadFile(idFile, "other-id") : null;

      const response = await fetch("/api/training-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ninSlipPath,
          idFilePath,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong.");

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="bg-paper min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md text-center"
        >
          <CheckCircle2 className="mx-auto text-primary" size={48} />
          <h1 className="mt-6 text-2xl font-semibold text-ink">
            Registration Submitted
          </h1>
          <p className="mt-3 text-ink/60">
            Thanks for registering — our team will review your submission and
            reach out shortly.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen">
      <section className="max-w-2xl mx-auto px-6 pt-32 pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-widest text-primary mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Beginner Cinematography</span>
        </div>
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">
          Registration Form
        </h1>
      </section>

      <div className="max-w-2xl mx-auto px-6 mb-10">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex-1 h-1 mx-1 rounded-full transition-colors ${
                index <= currentStep ? "bg-primary" : "bg-ink/10"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-ink/50 uppercase tracking-wide">
          Step {currentStep + 1} of {steps.length} — {steps[currentStep]}
        </p>
      </div>

      <section className="max-w-2xl mx-auto px-6 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 0 && (
              <StepPersonal formData={formData} onChange={handleChange} />
            )}
            {currentStep === 1 && (
              <StepIdentification
                formData={formData}
                onChange={handleChange}
                ninSlip={ninSlip}
                setNinSlip={setNinSlip}
                idFile={idFile}
                setIdFile={setIdFile}
              />
            )}
            {currentStep === 2 && (
              <StepExperience formData={formData} onChange={handleChange} />
            )}
            {currentStep === 3 && (
              <StepTraining formData={formData} onChange={handleChange} />
            )}
            {currentStep === 4 && (
              <StepEmergency formData={formData} onChange={handleChange} />
            )}
            {currentStep === 5 && (
              <StepDeclaration agreed={agreed} setAgreed={setAgreed} />
            )}
          </motion.div>
        </AnimatePresence>

        {errorMessage && (
          <div className="mt-6 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle size={18} />
            {errorMessage}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="inline-flex items-center gap-1 text-sm font-medium text-ink/60 hover:text-ink disabled:opacity-0 transition-opacity"
          >
            <ChevronLeft size={18} /> Back
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-paper hover:bg-primary-dark transition-colors"
            >
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === "submitting"}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-paper hover:bg-primary-dark transition-colors disabled:opacity-60"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Submitting...
                </>
              ) : (
                "Submit Registration"
              )}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

const inputClass =
  "mt-1.5 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-primary transition-colors bg-paper";
const labelClass = "text-sm font-medium text-ink";

function StepPersonal({ formData, onChange }: any) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold text-ink">Personal Information</h2>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>First Name *</label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Last Name *</label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
            className={inputClass}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Email *</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Phone *</label>
          <input
            name="phone"
            type="tel"
            placeholder="+234XXXXXXXXXX"
            value={formData.phone}
            onChange={onChange}
            className={inputClass}
          />
          <p className="text-xs text-ink/40 mt-1">
            Format: +234 followed by 10 digits
          </p>
        </div>
      </div>
      <div>
        <label className={labelClass}>Address</label>
        <input
          name="address"
          value={formData.address}
          onChange={onChange}
          className={inputClass}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>City</label>
          <input
            name="city"
            value={formData.city}
            onChange={onChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Country</label>
          <input
            name="country"
            value={formData.country}
            onChange={onChange}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className={labelClass}>Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={onChange}
          className={inputClass}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  );
}

function StepIdentification({
  formData,
  onChange,
  ninSlip,
  setNinSlip,
  idFile,
  setIdFile,
}: any) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold text-ink">
        Identification Information
      </h2>
      <p className="text-xs text-ink/50">
        Your NIN and ID documents are collected solely for identity verification
        as part of your enrollment. Stored securely, access restricted to
        authorized personnel only.
      </p>
      <div>
        <label className={labelClass}>NIN (11 digits) *</label>
        <input
          name="nin"
          value={formData.nin}
          onChange={onChange}
          maxLength={11}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Upload NIN Slip / Card *</label>
        <label className="mt-1.5 flex items-center gap-2 w-full rounded-lg border border-dashed border-ink/25 px-4 py-3 text-sm text-ink/60 cursor-pointer hover:border-primary transition-colors">
          <Upload size={16} />
          {ninSlip ? ninSlip.name : "Choose file"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            className="hidden"
            onChange={(e) => setNinSlip(e.target.files?.[0] || null)}
          />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Other ID Name</label>
          <input
            name="otherIdName"
            value={formData.otherIdName}
            onChange={onChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>ID Number</label>
          <input
            name="idNumber"
            value={formData.idNumber}
            onChange={onChange}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className={labelClass}>
          Upload Government ID (if applicable)
        </label>
        <label className="mt-1.5 flex items-center gap-2 w-full rounded-lg border border-dashed border-ink/25 px-4 py-3 text-sm text-ink/60 cursor-pointer hover:border-primary transition-colors">
          <Upload size={16} />
          {idFile ? idFile.name : "Choose file"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            className="hidden"
            onChange={(e) => setIdFile(e.target.files?.[0] || null)}
          />
        </label>
      </div>
    </div>
  );
}

function StepExperience({ formData, onChange }: any) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold text-ink">
        Cinematography Experience
      </h2>
      <div>
        <label className={labelClass}>Have you used a camera before? *</label>
        <select
          name="cameraExperience"
          value={formData.cameraExperience}
          onChange={onChange}
          className={inputClass}
        >
          <option value="">Select</option>
          <option value="new">No, completely new</option>
          <option value="occasional">Occasionally</option>
          <option value="some">Some experience</option>
          <option value="professional">I already work with cameras</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>
          What camera/equipment do you currently use?
        </label>
        <input
          name="equipmentUsed"
          value={formData.equipmentUsed}
          onChange={onChange}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>What do you want to learn? *</label>
        <select
          name="learningGoal"
          value={formData.learningGoal}
          onChange={onChange}
          className={inputClass}
        >
          <option value="">Select</option>
          <option value="camera-operation">Camera Operation</option>
          <option value="cinematography">Cinematography</option>
          <option value="lighting">Lighting</option>
          <option value="composition">Composition</option>
          <option value="storytelling">Storytelling</option>
          <option value="directing">Directing</option>
          <option value="all">All of the above</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>
          Why do you want to learn cinematography? *
        </label>
        <textarea
          name="learningReason"
          rows={3}
          value={formData.learningReason}
          onChange={onChange}
          className={inputClass + " resize-none"}
        />
      </div>
      <div>
        <label className={labelClass}>
          Do you currently work in a creative field?
        </label>
        <select
          name="creativeField"
          value={formData.creativeField}
          onChange={onChange}
          className={inputClass}
        >
          <option value="">Select</option>
          <option value="no">No</option>
          <option value="photography">Photography</option>
          <option value="videography">Videography</option>
          <option value="content-creation">Content Creation</option>
          <option value="film-tv">Film/TV</option>
        </select>
      </div>
    </div>
  );
}

function StepTraining({ formData, onChange }: any) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold text-ink">Training Information</h2>
      <div>
        <label className={labelClass}>Preferred Cohort / Start Date *</label>
        <input
          name="preferredCohort"
          type="date"
          value={formData.preferredCohort}
          onChange={onChange}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Preferred Training Format *</label>
        <select
          name="trainingFormat"
          value={formData.trainingFormat}
          onChange={onChange}
          className={inputClass}
        >
          <option value="">Select</option>
          <option value="physical">Physical</option>
          <option value="online">Online</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>How did you hear about VMedex?</label>
        <select
          name="referralSource"
          value={formData.referralSource}
          onChange={onChange}
          className={inputClass}
        >
          <option value="">Select</option>
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
          <option value="facebook">Facebook</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="referral">Friend/Referral</option>
          <option value="campus">University/Campus</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
}

function StepEmergency({ formData, onChange }: any) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold text-ink">Emergency Contact</h2>
      <div>
        <label className={labelClass}>Emergency Contact Name *</label>
        <input
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={onChange}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Relationship *</label>
        <input
          name="emergencyRelationship"
          value={formData.emergencyRelationship}
          onChange={onChange}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Emergency Contact Phone *</label>
        <input
          name="emergencyPhone"
          type="tel"
          placeholder="+234XXXXXXXXXX"
          value={formData.emergencyPhone}
          onChange={onChange}
          className={inputClass}
        />
        <p className="text-xs text-ink/40 mt-1">
          Format: +234 followed by 10 digits
        </p>
      </div>
    </div>
  );
}

function StepDeclaration({ agreed, setAgreed }: any) {
  const items = [
    {
      key: "accurate",
      label:
        "I confirm that the information provided in this registration form is accurate and complete.",
    },
    {
      key: "consent",
      label:
        "I agree that VMedex may use my information for enrollment, training administration and communication relating to this program.",
    },
    {
      key: "notGuaranteed",
      label:
        "I understand that submitting this form does not automatically guarantee admission until my registration has been reviewed and confirmed.",
    },
    {
      key: "privacy",
      label:
        "I have read and understand VMedex's privacy notice regarding the collection and handling of personal information.",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold text-ink">Declaration & Consent</h2>
      {items.map((item) => (
        <label
          key={item.key}
          className="flex items-start gap-3 text-sm text-ink/75"
        >
          <input
            type="checkbox"
            checked={agreed[item.key]}
            onChange={(e) =>
              setAgreed((prev: any) => ({
                ...prev,
                [item.key]: e.target.checked,
              }))
            }
            className="mt-1"
          />
          {item.label}
        </label>
      ))}
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Upload,
//   CheckCircle2,
//   AlertCircle,
//   Loader2,
//   Sparkles,
// } from "lucide-react";
// import { supabase } from "@/lib/supabase";

// const steps = [
//   "Personal Information",
//   "Identification",
//   "Experience",
//   "Training Info",
//   "Emergency Contact",
//   "Declaration",
// ];

// const initialFormData = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   phone: "",
//   address: "",
//   city: "",
//   country: "",
//   gender: "",
//   nin: "",
//   otherIdName: "",
//   idNumber: "",
//   cameraExperience: "",
//   equipmentUsed: "",
//   learningGoal: "",
//   learningReason: "",
//   creativeField: "",
//   preferredCohort: "",
//   trainingFormat: "",
//   referralSource: "",
//   emergencyContactName: "",
//   emergencyRelationship: "",
//   emergencyPhone: "",
// };

// type FormStatus = "idle" | "submitting" | "success" | "error";

// export default function RegisterContent() {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [formData, setFormData] = useState(initialFormData);
//   const [ninSlip, setNinSlip] = useState<File | null>(null);
//   const [idFile, setIdFile] = useState<File | null>(null);
//   const [agreed, setAgreed] = useState({
//     accurate: false,
//     consent: false,
//     notGuaranteed: false,
//     privacy: false,
//   });
//   const [status, setStatus] = useState<FormStatus>("idle");
//   const [errorMessage, setErrorMessage] = useState("");

//   const phonePattern = /^\+234\d{10}$/;

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Basic required-field check per step — prevents advancing with obviously missing data
//   const validateStep = (): boolean => {
//     if (currentStep === 0) {
//       return !!(
//         formData.firstName &&
//         formData.lastName &&
//         formData.email &&
//         phonePattern.test(formData.phone)
//       );
//     }
//     if (currentStep === 1) {
//       return !!(formData.nin && ninSlip);
//     }
//     if (currentStep === 2) {
//       return !!(
//         formData.cameraExperience &&
//         formData.learningGoal &&
//         formData.learningReason
//       );
//     }
//     if (currentStep === 3) {
//       return !!(formData.preferredCohort && formData.trainingFormat);
//     }
//     if (currentStep === 4) {
//       return !!(
//         formData.emergencyContactName &&
//         formData.emergencyRelationship &&
//         phonePattern.test(formData.emergencyPhone)
//       );
//     }
//     return true;
//   };

//   const handleNext = () => {
//     if (!validateStep()) {
//       setErrorMessage("Please fill in all required fields before continuing.");
//       return;
//     }
//     setErrorMessage("");
//     setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
//   };

//   const handleBack = () => {
//     setErrorMessage("");
//     setCurrentStep((prev) => Math.max(prev - 1, 0));
//   };

//   // Uploads a single file to Supabase Storage and returns its path
//   const uploadFile = async (file: File, label: string) => {
//     const fileExt = file.name.split(".").pop();
//     const filePath = `${Date.now()}-${label}.${fileExt}`;

//     const { error } = await supabase.storage
//       .from("training-documents")
//       .upload(filePath, file);

//     if (error) throw new Error(`Failed to upload ${label}: ${error.message}`);
//     return filePath;
//   };

//   const handleSubmit = async () => {
//     const allAgreed = Object.values(agreed).every(Boolean);
//     if (!allAgreed) {
//       setErrorMessage(
//         "Please confirm all declaration checkboxes before submitting.",
//       );
//       return;
//     }
//     if (!ninSlip) {
//       setErrorMessage("NIN slip upload is required.");
//       return;
//     }

//     setStatus("submitting");
//     setErrorMessage("");

//     try {
//       // Upload files first — we need their paths before writing the database row
//       const ninSlipPath = await uploadFile(ninSlip, "nin-slip");
//       const idFilePath = idFile ? await uploadFile(idFile, "other-id") : null;

//       const response = await fetch("/api/training-register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           ninSlipPath,
//           idFilePath,
//         }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error || "Something went wrong.");

//       setStatus("success");
//     } catch (error) {
//       setStatus("error");
//       setErrorMessage(
//         error instanceof Error ? error.message : "Something went wrong.",
//       );
//     }
//   };

//   if (status === "success") {
//     return (
//       <div className="bg-paper min-h-screen flex items-center justify-center px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="max-w-md text-center"
//         >
//           <CheckCircle2 className="mx-auto text-primary" size={48} />
//           <h1 className="mt-6 text-2xl font-semibold text-ink">
//             Registration Submitted
//           </h1>
//           <p className="mt-3 text-ink/60">
//             Thanks for registering — our team will review your submission and
//             reach out shortly.
//           </p>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-paper min-h-screen">
//       <section className="max-w-2xl mx-auto px-6 pt-32 pb-8 text-center">
//         <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-widest text-primary mb-6">
//           <Sparkles className="w-3.5 h-3.5" />
//           <span>Beginner Cinematography</span>
//         </div>
//         <h1 className="text-3xl font-bold text-ink sm:text-4xl">
//           Registration Form
//         </h1>
//       </section>

//       {/* Progress indicator */}
//       <div className="max-w-2xl mx-auto px-6 mb-10">
//         <div className="flex items-center justify-between mb-2">
//           {steps.map((step, index) => (
//             <div
//               key={step}
//               className={`flex-1 h-1 mx-1 rounded-full transition-colors ${
//                 index <= currentStep ? "bg-primary" : "bg-ink/10"
//               }`}
//             />
//           ))}
//         </div>
//         <p className="text-xs text-ink/50 uppercase tracking-wide">
//           Step {currentStep + 1} of {steps.length} — {steps[currentStep]}
//         </p>
//       </div>

//       {/* Step content */}
//       <section className="max-w-2xl mx-auto px-6 pb-32">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentStep}
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             {currentStep === 0 && (
//               <StepPersonal formData={formData} onChange={handleChange} />
//             )}
//             {currentStep === 1 && (
//               <StepIdentification
//                 formData={formData}
//                 onChange={handleChange}
//                 ninSlip={ninSlip}
//                 setNinSlip={setNinSlip}
//                 idFile={idFile}
//                 setIdFile={setIdFile}
//               />
//             )}
//             {currentStep === 2 && (
//               <StepExperience formData={formData} onChange={handleChange} />
//             )}
//             {currentStep === 3 && (
//               <StepTraining formData={formData} onChange={handleChange} />
//             )}
//             {currentStep === 4 && (
//               <StepEmergency formData={formData} onChange={handleChange} />
//             )}
//             {currentStep === 5 && (
//               <StepDeclaration agreed={agreed} setAgreed={setAgreed} />
//             )}
//           </motion.div>
//         </AnimatePresence>

//         {errorMessage && (
//           <div className="mt-6 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
//             <AlertCircle size={18} />
//             {errorMessage}
//           </div>
//         )}

//         {/* Navigation buttons */}
//         <div className="mt-8 flex items-center justify-between">
//           <button
//             type="button"
//             onClick={handleBack}
//             disabled={currentStep === 0}
//             className="inline-flex items-center gap-1 text-sm font-medium text-ink/60 hover:text-ink disabled:opacity-0 transition-opacity"
//           >
//             <ChevronLeft size={18} /> Back
//           </button>

//           {currentStep < steps.length - 1 ? (
//             <button
//               type="button"
//               onClick={handleNext}
//               className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-widest text-paper hover:bg-primary-dark transition-colors"
//             >
//               Next <ChevronRight size={16} />
//             </button>
//           ) : (
//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={status === "submitting"}
//               className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-paper hover:bg-primary-dark transition-colors disabled:opacity-60"
//             >
//               {status === "submitting" ? (
//                 <>
//                   <Loader2 size={16} className="animate-spin" /> Submitting...
//                 </>
//               ) : (
//                 "Submit Registration"
//               )}
//             </button>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }

// const inputClass =
//   "mt-1.5 w-full rounded-lg border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-primary transition-colors bg-paper";
// const labelClass = "text-sm font-medium text-ink";

// function StepPersonal({ formData, onChange }: any) {
//   return (
//     <div className="flex flex-col gap-5">
//       <h2 className="text-lg font-semibold text-ink">Personal Information</h2>
//       <div className="grid sm:grid-cols-2 gap-5">
//         <div>
//           <label className={labelClass}>First Name *</label>
//           <input
//             name="firstName"
//             value={formData.firstName}
//             onChange={onChange}
//             className={inputClass}
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Last Name *</label>
//           <input
//             name="lastName"
//             value={formData.lastName}
//             onChange={onChange}
//             className={inputClass}
//           />
//         </div>
//       </div>
//       <div className="grid sm:grid-cols-2 gap-5">
//         <div>
//           <label className={labelClass}>Email *</label>
//           <input
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={onChange}
//             className={inputClass}
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Phone *</label>
//           <input
//             name="phone"
//             type="tel"
//             placeholder="+234XXXXXXXXXX"
//             value={formData.phone}
//             onChange={onChange}
//             className={inputClass}
//           />
//           <p className="text-xs text-ink/40 mt-1">
//             Format: +234 followed by 10 digits
//           </p>
//         </div>
//       </div>
//       <div>
//         <label className={labelClass}>Address</label>
//         <input
//           name="address"
//           value={formData.address}
//           onChange={onChange}
//           className={inputClass}
//         />
//       </div>
//       <div className="grid sm:grid-cols-2 gap-5">
//         <div>
//           <label className={labelClass}>City</label>
//           <input
//             name="city"
//             value={formData.city}
//             onChange={onChange}
//             className={inputClass}
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Country</label>
//           <input
//             name="country"
//             value={formData.country}
//             onChange={onChange}
//             className={inputClass}
//           />
//         </div>
//       </div>
//       <div>
//         <label className={labelClass}>Gender</label>
//         <select
//           name="gender"
//           value={formData.gender}
//           onChange={onChange}
//           className={inputClass}
//         >
//           <option value="">Select</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//         </select>
//       </div>
//     </div>
//   );
// }

// function StepIdentification({
//   formData,
//   onChange,
//   ninSlip,
//   setNinSlip,
//   idFile,
//   setIdFile,
// }: any) {
//   return (
//     <div className="flex flex-col gap-5">
//       <h2 className="text-lg font-semibold text-ink">
//         Identification Information
//       </h2>
//       <p className="text-xs text-ink/50">
//         Your NIN and ID documents are collected solely for identity verification
//         as part of your enrollment. Stored securely, access restricted to
//         authorized personnel only.
//       </p>
//       <div>
//         <label className={labelClass}>NIN (11 digits) *</label>
//         <input
//           name="nin"
//           value={formData.nin}
//           onChange={onChange}
//           maxLength={11}
//           className={inputClass}
//         />
//       </div>
//       <div>
//         <label className={labelClass}>Upload NIN Slip / Card *</label>
//         <label className="mt-1.5 flex items-center gap-2 w-full rounded-lg border border-dashed border-ink/25 px-4 py-3 text-sm text-ink/60 cursor-pointer hover:border-primary transition-colors">
//           <Upload size={16} />
//           {ninSlip ? ninSlip.name : "Choose file"}
//           <input
//             type="file"
//             accept="image/jpeg,image/png,image/webp,application/pdf"
//             className="hidden"
//             onChange={(e) => setNinSlip(e.target.files?.[0] || null)}
//           />
//         </label>
//       </div>
//       <div className="grid sm:grid-cols-2 gap-5">
//         <div>
//           <label className={labelClass}>Other ID Name</label>
//           <input
//             name="otherIdName"
//             value={formData.otherIdName}
//             onChange={onChange}
//             className={inputClass}
//           />
//         </div>
//         <div>
//           <label className={labelClass}>ID Number</label>
//           <input
//             name="idNumber"
//             value={formData.idNumber}
//             onChange={onChange}
//             className={inputClass}
//           />
//         </div>
//       </div>
//       <div>
//         <label className={labelClass}>
//           Upload Government ID (if applicable)
//         </label>
//         <label className="mt-1.5 flex items-center gap-2 w-full rounded-lg border border-dashed border-ink/25 px-4 py-3 text-sm text-ink/60 cursor-pointer hover:border-primary transition-colors">
//           <Upload size={16} />
//           {idFile ? idFile.name : "Choose file"}
//           <input
//             type="file"
//             accept="image/jpeg,image/png,image/webp,application/pdf"
//             className="hidden"
//             onChange={(e) => setIdFile(e.target.files?.[0] || null)}
//           />
//         </label>
//       </div>
//     </div>
//   );
// }

// function StepExperience({ formData, onChange }: any) {
//   return (
//     <div className="flex flex-col gap-5">
//       <h2 className="text-lg font-semibold text-ink">
//         Cinematography Experience
//       </h2>
//       <div>
//         <label className={labelClass}>Have you used a camera before? *</label>
//         <select
//           name="cameraExperience"
//           value={formData.cameraExperience}
//           onChange={onChange}
//           className={inputClass}
//         >
//           <option value="">Select</option>
//           <option value="new">No, completely new</option>
//           <option value="occasional">Occasionally</option>
//           <option value="some">Some experience</option>
//           <option value="professional">I already work with cameras</option>
//         </select>
//       </div>
//       <div>
//         <label className={labelClass}>
//           What camera/equipment do you currently use?
//         </label>
//         <input
//           name="equipmentUsed"
//           value={formData.equipmentUsed}
//           onChange={onChange}
//           className={inputClass}
//         />
//       </div>
//       <div>
//         <label className={labelClass}>What do you want to learn? *</label>
//         <select
//           name="learningGoal"
//           value={formData.learningGoal}
//           onChange={onChange}
//           className={inputClass}
//         >
//           <option value="">Select</option>
//           <option value="camera-operation">Camera Operation</option>
//           <option value="cinematography">Cinematography</option>
//           <option value="lighting">Lighting</option>
//           <option value="composition">Composition</option>
//           <option value="storytelling">Storytelling</option>
//           <option value="directing">Directing</option>
//           <option value="all">All of the above</option>
//         </select>
//       </div>
//       <div>
//         <label className={labelClass}>
//           Why do you want to learn cinematography? *
//         </label>
//         <textarea
//           name="learningReason"
//           rows={3}
//           value={formData.learningReason}
//           onChange={onChange}
//           className={inputClass + " resize-none"}
//         />
//       </div>
//       <div>
//         <label className={labelClass}>
//           Do you currently work in a creative field?
//         </label>
//         <select
//           name="creativeField"
//           value={formData.creativeField}
//           onChange={onChange}
//           className={inputClass}
//         >
//           <option value="">Select</option>
//           <option value="no">No</option>
//           <option value="photography">Photography</option>
//           <option value="videography">Videography</option>
//           <option value="content-creation">Content Creation</option>
//           <option value="film-tv">Film/TV</option>
//         </select>
//       </div>
//     </div>
//   );
// }

// function StepTraining({ formData, onChange }: any) {
//   return (
//     <div className="flex flex-col gap-5">
//       <h2 className="text-lg font-semibold text-ink">Training Information</h2>
//       <div>
//         <label className={labelClass}>Preferred Cohort / Start Date *</label>
//         <input
//           name="preferredCohort"
//           type="date"
//           value={formData.preferredCohort}
//           onChange={onChange}
//           className={inputClass}
//         />
//       </div>
//       <div>
//         <label className={labelClass}>Preferred Training Format *</label>
//         <select
//           name="trainingFormat"
//           value={formData.trainingFormat}
//           onChange={onChange}
//           className={inputClass}
//         >
//           <option value="">Select</option>
//           <option value="physical">Physical</option>
//           <option value="online">Online</option>
//           <option value="hybrid">Hybrid</option>
//         </select>
//       </div>
//       <div>
//         <label className={labelClass}>How did you hear about VMedex?</label>
//         <select
//           name="referralSource"
//           value={formData.referralSource}
//           onChange={onChange}
//           className={inputClass}
//         >
//           <option value="">Select</option>
//           <option value="instagram">Instagram</option>
//           <option value="tiktok">TikTok</option>
//           <option value="facebook">Facebook</option>
//           <option value="whatsapp">WhatsApp</option>
//           <option value="referral">Friend/Referral</option>
//           <option value="campus">University/Campus</option>
//           <option value="other">Other</option>
//         </select>
//       </div>
//     </div>
//   );
// }

// function StepEmergency({ formData, onChange }: any) {
//   return (
//     <div className="flex flex-col gap-5">
//       <h2 className="text-lg font-semibold text-ink">Emergency Contact</h2>
//       <div>
//         <label className={labelClass}>Emergency Contact Name *</label>
//         <input
//           name="emergencyContactName"
//           value={formData.emergencyContactName}
//           onChange={onChange}
//           className={inputClass}
//         />
//       </div>
//       <div>
//         <label className={labelClass}>Relationship *</label>
//         <input
//           name="emergencyRelationship"
//           value={formData.emergencyRelationship}
//           onChange={onChange}
//           className={inputClass}
//         />
//       </div>
//       <div>
//         <label className={labelClass}>Emergency Contact Phone *</label>
//         <input
//           name="emergencyPhone"
//           type="tel"
//           placeholder="+234XXXXXXXXXX"
//           value={formData.emergencyPhone}
//           onChange={onChange}
//           className={inputClass}
//         />
//         <p className="text-xs text-ink/40 mt-1">
//           Format: +234 followed by 10 digits
//         </p>
//       </div>
//     </div>
//   );
// }

// function StepDeclaration({ agreed, setAgreed }: any) {
//   const items = [
//     {
//       key: "accurate",
//       label:
//         "I confirm that the information provided in this registration form is accurate and complete.",
//     },
//     {
//       key: "consent",
//       label:
//         "I agree that VMedex may use my information for enrollment, training administration and communication relating to this program.",
//     },
//     {
//       key: "notGuaranteed",
//       label:
//         "I understand that submitting this form does not automatically guarantee admission until my registration has been reviewed and confirmed.",
//     },
//     {
//       key: "privacy",
//       label:
//         "I have read and understand VMedex's privacy notice regarding the collection and handling of personal information.",
//     },
//   ];

//   return (
//     <div className="flex flex-col gap-5">
//       <h2 className="text-lg font-semibold text-ink">Declaration & Consent</h2>
//       {items.map((item) => (
//         <label
//           key={item.key}
//           className="flex items-start gap-3 text-sm text-ink/75"
//         >
//           <input
//             type="checkbox"
//             checked={agreed[item.key]}
//             onChange={(e) =>
//               setAgreed((prev: any) => ({
//                 ...prev,
//                 [item.key]: e.target.checked,
//               }))
//             }
//             className="mt-1"
//           />
//           {item.label}
//         </label>
//       ))}
//     </div>
//   );
// }
