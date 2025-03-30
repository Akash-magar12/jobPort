import { useContext, useState, useEffect } from "react";
import { Camera, Mail, Phone, MapPin, Upload, X, FileText } from "lucide-react";
import Modal from "../Components/Modal";
import { EmailContext } from "../Components/Context";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Profile edit modal
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false); // Resume upload modal
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [newResume, setNewResume] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { data, setData } = useContext(EmailContext);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    position: "",
    location: "",
    experience: "",
    skills: [],
  });

  useEffect(() => {
    if (data) {
      setFormData({
        fname: data.fname || "",
        lname: data.lname || "",
        phone: data.phone || "",
        position: data.position || "",
        location: data.location || "",
        experience: data.experience || "",
        skills: data.skills || [],
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillsChange = (e) => {
    const skillsInput = e.target.value;
    const skillsArray = skillsInput.split(",").map((skill) => skill.trim());
    setFormData({ ...formData, skills: skillsArray });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setNewProfilePic(selectedFile);
  };

  const handleResumeChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("Resume file size exceeds 5MB limit");
        return;
      }
      setNewResume(selectedFile);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append("fname", formData.fname);
      formDataObj.append("lname", formData.lname);
      formDataObj.append("phone", formData.phone);
      formDataObj.append("position", formData.position);
      formDataObj.append("location", formData.location);
      formDataObj.append("experience", formData.experience);
      formDataObj.append("skills", formData.skills.join(","));

      if (newProfilePic) {
        formDataObj.append("file", newProfilePic); // Matches backend multer field
      }

      const response = await axios.put(
        `http://localhost:5000/api/profileChange/${data._id}`,
        formDataObj,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setData(response.data.user);
      setNewProfilePic(null); // Clear file input
      setUploading(false);
      setIsModalOpen(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      setUploading(false);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    if (!newResume) {
      toast.error("Please select a resume to upload");
      return;
    }

    setUploading(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append("resume", newResume); // Matches backend multer field

      const response = await axios.put(
        `http://localhost:5000/api/uploadResume/${data._id}`,
        formDataObj,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setData(response.data.user);
      setNewResume(null); // Clear file input
      setUploading(false);
      setIsResumeModalOpen(false);
      toast.success("Resume uploaded successfully!");
    } catch (error) {
      setUploading(false);
      toast.error(error.response?.data?.message || "Failed to upload resume");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={
                      data?.profilePic ||
                      "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1742232869~exp=1742236469~hmac=88fc273d87c0af75de9bb5d99b7bd507ad0b38fcb2c0aa8f4fa5ebea222f7b6d&w=826"
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                  />
                  <button
                    className="absolute bottom-0 right-0 rounded-full p-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                {(data?.fname || data?.lname) && (
                  <h2 className="mt-4 text-2xl font-bold text-center">
                    {data?.fname} {data?.lname}
                  </h2>
                )}
                {data?.position && (
                  <p className="text-blue-600 font-medium">{data.position}</p>
                )}
              </div>

              {(data?.email || data?.phone || data?.location) && (
                <div className="p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    {data?.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{data.email}</span>
                      </div>
                    )}
                    {data?.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{data.phone}</span>
                      </div>
                    )}
                    {data?.location && (
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{data.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">
                    Professional Profile
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>

                {data?.experience && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-medium mb-2">Experience</h4>
                    <p className="text-gray-600">{data.experience}</p>
                  </div>
                )}

                {data?.skills && data.skills.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-medium">Skills</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {data.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-1.5 bg-white border border-blue-200 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resume Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Resume</h4>
                    {data?.resume && (
                      <a
                        href={data.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={data.resume.split("/").pop()}
                        className="text-blue-600 hover:underline flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        View Resume
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => setIsResumeModalOpen(true)}
                    className="mt-2 w-full px-4 py-2 border border-blue-300 rounded-lg hover:bg-blue-50 flex items-center justify-center gap-2 text-blue-600 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    {data?.resume ? "Update Resume" : "Add a Resume"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            <div className="relative">
              <img
                src={
                  newProfilePic
                    ? URL.createObjectURL(newProfilePic)
                    : data?.profilePic ||
                      "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1742232869~exp=1742236469~hmac=88fc273d87c0af75de9bb5d99b7bd507ad0b38fcb2c0aa8f4fa5ebea222f7b6d&w=826"
                }
                alt="Profile Preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
              />
              <label className="absolute bottom-0 right-0 cursor-pointer">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                  <Upload className="h-4 w-4" />
                </div>
              </label>
            </div>
            {uploading && (
              <div className="mt-2 text-sm text-blue-600">Uploading...</div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">
                Experience
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Skills (comma-separated)
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills.join(", ")}
                onChange={handleSkillsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="React, Node.js, TypeScript, etc."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={uploading}
            >
              {uploading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Resume Upload Modal */}
      <Modal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {data?.resume ? "Update Resume" : "Add Resume"}
          </h2>
          <button
            onClick={() => setIsResumeModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleResumeSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            {data?.resume && (
              <div className="mb-4">
                <a
                  href={data.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={data.resume.split("/").pop()}
                  className="text-blue-600 hover:underline flex items-center gap-2"
                >
                  <FileText className="h-5 w-5" />
                  View Current Resume
                </a>
              </div>
            )}
            <label className="w-full">
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleResumeChange}
              />
              <div className="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-center">
                {newResume ? newResume.name : "Select Resume (PDF, max 5MB)"}
              </div>
            </label>
            {newResume && (
              <button
                type="button"
                onClick={() => setNewResume(null)}
                className="mt-2 text-red-500 hover:text-red-700"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            zz
            {uploading && (
              <div className="mt-2 text-sm text-blue-600">Uploading...</div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsResumeModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={uploading}
            >
              {uploading ? "Saving..." : "Save Resume"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
