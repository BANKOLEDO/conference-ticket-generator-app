import { useRef, useState } from "react";

const FormSection = ({ onGenerate }) => {
  const [avatar, setAvatar] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");

  const fileInputRef = useRef(null);
  const uploadedImageURL = avatar ? URL.createObjectURL(avatar) : null;

  const isGithubValid = (gh) => /^@[a-zA-Z0-9-]+$/.test(gh);
  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      alert("Upload must be PNG or JPG.");
      return;
    }

    if (file.size > 512000) {
      alert("Max size is 500KB.");
      return;
    }

    setAvatar(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !email || !github || !avatar) {
      alert("Fill in all fields and upload an image.");
      return;
    }

    if (!isEmailValid(email)) {
      alert("Invalid email.");
      return;
    }

    if (!isGithubValid(github)) {
      alert("GitHub must start with '@'.");
      return;
    }

    onGenerate({ fullName, email, github, avatar });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container relative text-white z-6 space-y-6 mx-auto">
      {/* Upload Avatar */}
      <div>
        <label className="upload-avatar-label block font-bold text-[--neutral-300] mb-5">
          Upload Avatar
        </label>

        <div
          className="upload-box relative"
          onClick={(e) => {
            if (!e.target.closest(".upload-btn")) fileInputRef.current.click();
          }}
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
      </div>

      {/* Full Name */}
      <div className="input-column">
        <label htmlFor="full-name" className="input-label">
          Full Name
        </label>
        <input
          id="full-name"
          type="text"
          className="input-box"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
          className="input-box"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
          className="input-box"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          required
        />
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
