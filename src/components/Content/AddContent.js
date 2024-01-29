import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../Alert/LoadingComponent";
import SuccessMsg from "../Alert/SuccessMsg";
import ErrorMsg from "../Alert/ErrorMsg";
import { addContentAction } from "../../redux/slices/users/contentsSlices";
import { useNavigate } from "react-router-dom";

const AddContent = () => {
  const dispatch = useDispatch();
  const { error, loading, success } = useSelector((state) => state.contents);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
    contentType: "",
    status: "",
    difficultyLevel: "",
    targetAudience: "",
    tags: [],
  });

  const [errors, setErrors] = useState({});

  const contentTypeOptions = [
    { value: "test", label: "Test" },
    { value: "worksheet", label: "Worksheet" },
  ];

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "published", label: "Published" },
  ];

  const difficultyLevelOptions = [
    { value: "easy", label: "Easy" },
    { value: "difficult", label: "Difficult" },
  ];

  const validateForm = (data) => {
    let errors = {};
    if (!data.title) errors.title = "Title is required";
    if (!data.description) errors.description = "Description is required";
    if (!data.file) errors.file = "Image is required";
    if (!data.contentType) errors.contentType = "Type is required";
    if (!data.status) errors.status = "Status is required";
    if (!data.difficultyLevel) errors.difficultyLevel = "Level is required";
    if (!data.tags) errors.tags = "Tags is required";
    return errors;
  };

  useEffect(() => {
    if (success) {
      navigate("/user-profile"); 
    }
  }, [success, navigate]);

  const handleBlur = (e) => {
    const { name } = e.target;
    const formErrors = validateForm(formData);
    setErrors({ ...errors, [name]: formErrors[name] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input name: ${name}, value: ${value}`);
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    console.log(`File selected: ${e.target.files[0].name}`);
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSelectChange = (name) => (selectedOption) => {
    setFormData({ ...formData, [name]: selectedOption.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "tags" && Array.isArray(formData[key])) {
        formData[key].forEach((tag) => dataToSend.append("tags", tag));
      } else if (key === "file") {
        formData[key] &&
          dataToSend.append(key, formData[key], formData[key].name);
      } else {
        dataToSend.append(key, formData[key] || "");
      }
    });

    console.log(
      "Form data being sent:",
      Object.fromEntries(dataToSend.entries())
    );

    dispatch(addContentAction(dataToSend));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
        <div className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 bg-white lg:max-w-xl lg:ml-auto rounded-4xl shadow-2xl">
          <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">
            Add New Content
          </h2>

          {error && <ErrorMsg message={error?.message} />}
          {success && <SuccessMsg message="Content created successfully" />}

          <h3 className="mb-7 text-base md:text-lg text-coolGray-500 font-medium text-center">
            Share your thoughts and ideas with the community
          </h3>

          {/* Title Input */}
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Title</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="text"
              placeholder="Enter the post title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
          </label>

          {/* Image Upload */}
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Image</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="file"
              name="file"
              onChange={handleFileChange}
              onBlur={handleBlur}
            />
            {errors.image && <p className="text-red-500">{errors.image}</p>}
          </label>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">
              Content Type
            </span>
            <Select
              options={contentTypeOptions}
              onChange={handleSelectChange("contentType")}
              onBlur={handleBlur}
              value={contentTypeOptions.find(
                (option) => option.value === formData.contentType
              )}
            />
          </label>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">
              Difficulty Level
            </span>
            <Select
              options={difficultyLevelOptions}
              onChange={handleSelectChange("difficultyLevel")}
              value={difficultyLevelOptions.find(
                (option) => option.value === formData.difficultyLevel
              )}
            />
          </label>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Status</span>
            <Select
              options={statusOptions}
              onChange={handleSelectChange("status")}
              onBlur={handleBlur}
              value={statusOptions.find(
                (option) => option.value === formData.status
              )}
            />
          </label>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Tags </span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="text"
              placeholder="Enter tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
            />
            {errors.tags && <p className="text-red-500">{errors.tags}</p>}
          </label>

          {/* Description Textarea */}
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">
              Description
            </span>
            <textarea
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              placeholder="Write your content description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description}</p>
            )}
          </label>

          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              className="mb-4 inline-block py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
              type="submit"
            >
              Add Content
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddContent;
