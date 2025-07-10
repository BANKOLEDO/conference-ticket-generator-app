import { useRef, useState } from "react";

const FormSection = ({ onGenerate }) => {
  const [avatar, setAvatar] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const [formErrors, setFormErrors] = useState({
    avatar: "",
    fullName: "",
    email: "",
    github: "",
  });

  const fileInputRef = useRef(null);
  const uploadedImageURL = avatar ? URL.createObjectURL(avatar) : null;

  const isGithubValid = (gh) => /^@[a-zA-Z0-9-]+$/.test(gh);
  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateAndSetFile = (file) => {
    if (!file) return;

    let error = "";

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      error = "Upload must be JPG or PNG.";
    } else if (file.size > 512000) {
      error = "File too large. Please upload a photo under 500KB.";
    }

    if (error) {
      setFormErrors((prev) => ({ ...prev, avatar: error }));
      return;
    }

    setAvatar(file);
    setFormErrors((prev) => ({ ...prev, avatar: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validateAndSetFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const file = e.dataTransfer.files[0];
    validateAndSetFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {
      avatar: avatar ? "" : "Please upload an avatar.",
      fullName: fullName ? "" : "Full name is required.",
      email: isEmailValid(email) ? "" : "Please enter a valid email address.",
      github: isGithubValid(github) ? "" : "GitHub username must start with '@'.",
    };

    setFormErrors(errors);

    const hasErrors = Object.values(errors).some((msg) => msg !== "");
    if (hasErrors) return;

    onGenerate({ fullName, email, github, avatar });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-container relative text-white z-6 space-y-6 mx-auto"
    >
      {/* Upload Avatar */}
      <div>
        <label className="upload-avatar-label block font-bold text-[--neutral-300] mb-5">
          Upload Avatar
        </label>

        <div
          className={`upload-box relative border-2 border-dashed rounded-md p-4 ${
            dragOver ? "border-[--orange-500]" : "border-white"
          }`}
          onClick={(e) => {
            if (!e.target.closest(".upload-btn")) fileInputRef.current.click();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >

          <div className="upload-preview h-20 flex justify-center items-center relative z-10">
            {!avatar ? (
              <img
                src="/assets/images/icon-upload.svg"
                alt="upload-icon"
                className="icon-upload w-12 h-12 bg-[--neutral-700] rounded-lg p-2"
              />
            ) : (
              <img
                src={uploadedImageURL}
                alt="Uploaded avatar"
                className="uploaded-image w-12 h-12 object-cover rounded-md"
              />
            )}
          </div>

          <input
            type="file"
            accept="image/png, image/jpeg"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="file-input hidden"
          />

          <label className="custom-file-label block mt-4 text-lg font-bold pointer-events-none z-10">
            {avatar ? "Image Uploaded" : "Drag and drop or click to upload"}
          </label>

          {avatar && (
            <div className="upload-actions flex justify-between gap-4 mt-4 z-10">
              <div
                className="upload-btn bg-[--neutral-700] hover:bg-[--orange-500] text-white font-semibold px-3 py-2 rounded text-sm cursor-pointer"
                onClick={() => setAvatar(null)}
              >
                Remove Image
              </div>
              <div
                className="upload-btn bg-[--neutral-700] hover:bg-[--orange-500] text-white font-semibold px-3 py-2 rounded text-sm cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              >
                Change Image
              </div>
            </div>
          )}
        </div>

        <div className="upload-notice-box flex items-center mt-2 text-[--neutral-500] text-sm font-bold">
          <img
            src="/assets/images/icon-info.svg"
            alt="info"
            className="w-4 h-4 mr-2"
          />
          <small>Upload JPG or PNG under 500KB.</small>
        </div>

        {formErrors.avatar && (
          <p className="text-red-500 text-sm mt-2 font-medium">
            {formErrors.avatar}
          </p>
        )}
      </div>

      {/* Full Name */}
      <div className="input-column">
        <label htmlFor="full-name" className="input-label">
          Full Name
        </label>
        <input
          id="full-name"
          type="text"
          className={`input-box ${formErrors.fullName ? "border-red-500" : ""}`}
          value={fullName}
          onChange={(e) => {
            const value = e.target.value;
            setFullName(value);
            if (value.trim() !== "") {
              setFormErrors((prev) => ({ ...prev, fullName: "" }));
            }
          }}
        />
        {formErrors.fullName && (
          <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div className="input-column">
        <label htmlFor="email" className="input-label">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="example@email.com"
          className={`input-box ${formErrors.email ? "border-red-500" : ""}`}
          value={email}
          onChange={(e) => {
            const value = e.target.value;
            setEmail(value);
            if (isEmailValid(value)) {
              setFormErrors((prev) => ({ ...prev, email: "" }));
            }
          }}
        />
        {formErrors.email && (
          <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
        )}
      </div>

      {/* GitHub */}
      <div className="input-column">
        <label htmlFor="github" className="input-label">
          GitHub Username
        </label>
        <input
          id="github"
          type="text"
          placeholder="@yourusername"
          className={`input-box ${formErrors.github ? "border-red-500" : ""}`}
          value={github}
          onChange={(e) => {
            const value = e.target.value;
            setGithub(value);
            if (isGithubValid(value)) {
              setFormErrors((prev) => ({ ...prev, github: "" }));
            }
          }}
        />
        {formErrors.github && (
          <p className="text-red-500 text-sm mt-1">{formErrors.github}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="btn-container">
        <button type="submit" className="btn-primary">
          Generate My Ticket
        </button>
      </div>
    </form>
  );
};

export default FormSection;
