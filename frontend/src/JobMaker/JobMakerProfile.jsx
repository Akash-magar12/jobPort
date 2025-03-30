import { useContext, useState, useEffect } from "react";
import { Camera, Mail, Phone, MapPin, Upload, X } from "lucide-react";
import Modal from "../Components/Modal";
import { EmailContext } from "../Components/Context";
import axios from "axios";
import { toast } from "react-toastify";

const JobMakerProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { data, setData } = useContext(EmailContext);

  const [formData, setFormData] = useState({
    companyName: "",
    companyPhone: "",
    companyLocation: "",
    companyDescription: "",
    companySize: "",
    industry: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        companyName: data.companyName || "",
        companyPhone: data.companyPhone || data.phone || "",
        companyLocation: data.companyLocation || data.location || "",
        companyDescription: data.companyDescription || "",
        companySize: data.companySize || "",
        industry: data.industry || "",
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setNewProfilePic(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append("companyName", formData.companyName);
      formDataObj.append("companyPhone", formData.companyPhone);
      formDataObj.append("companyLocation", formData.companyLocation);
      formDataObj.append("companyDescription", formData.companyDescription);
      formDataObj.append("companySize", formData.companySize);
      formDataObj.append("industry", formData.industry);

      if (newProfilePic) {
        formDataObj.append("file", newProfilePic); // Matches multer's expected key
      }

      const token = localStorage.getItem("token"); // Add this if using auth
      const response = await axios.put(
        `http://localhost:5000/api/profileChange/${data._id}`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Add this if auth is required
          },
        }
      );

      setData(response.data.user);
      setNewProfilePic(null);
      setUploading(false);
      setIsModalOpen(false);
      toast.success("Employer profile updated successfully!");
    } catch (error) {
      setUploading(false);
      toast.error(error.response?.data?.message || "Error updating profile");
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
                      data?.companyLogo ||
                      "https://via.placeholder.com/150?text=Company+Logo"
                    }
                    alt="Company Logo"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                  />
                  <button
                    className="absolute bottom-0 right-0 rounded-full p-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                {data?.companyName && (
                  <h2 className="mt-4 text-2xl font-bold text-center">
                    {data.companyName}
                  </h2>
                )}
                {data?.industry && (
                  <p className="text-blue-600 font-medium">{data.industry}</p>
                )}
              </div>

              {(data?.email || data?.companyPhone || data?.companyLocation) && (
                <div className="p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    {data?.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{data.email}</span>
                      </div>
                    )}
                    {data?.companyPhone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{data.companyPhone}</span>
                      </div>
                    )}
                    {data?.companyLocation && (
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{data.companyLocation}</span>
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
                  <h3 className="text-xl font-semibold">Company Profile</h3>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
                  >
                    Edit Profile
                  </button>
                </div>

                {data?.companyDescription && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-medium mb-2">Company Description</h4>
                    <p className="text-gray-600">{data.companyDescription}</p>
                  </div>
                )}

                {(data?.companySize || data?.industry) && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Company Details</h4>
                    <div className="space-y-2">
                      {data?.companySize && (
                        <p className="text-gray-600">Size: {data.companySize}</p>
                      )}
                      {data?.industry && (
                        <p className="text-gray-600">Industry: {data.industry}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Employer Profile</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            <div className="relative">
              <img
                src={
                  newProfilePic
                    ? URL.createObjectURL(newProfilePic)
                    : data?.companyLogo ||
                      "https://via.placeholder.com/150?text=Company+Logo"
                }
                alt="Company Logo Preview"
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
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">Company Phone</label>
              <input
                type="tel"
                name="companyPhone"
                value={formData.companyPhone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">Company Location</label>
              <input
                type="text"
                name="companyLocation"
                value={formData.companyLocation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">Company Size</label>
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501+">501+ employees</option>
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium mb-1">Industry</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Technology, Healthcare, Finance"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Company Description</label>
              <textarea
                name="companyDescription"
                value={formData.companyDescription}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Describe your company..."
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
    </div>
  );
};

export default JobMakerProfile;