/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../Alert/LoadingComponent";
import SuccessMsg from "../Alert/SuccessMsg";
import ErrorMsg from "../Alert/ErrorMsg";
import {
  getSingleContentAction,
  updateContentAction,
} from "../../redux/slices/users/contentsSlices";

const EditContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contentId } = useParams();
  const { singleContent, error, loading, success } = useSelector(
    (state) => state.contents
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
    contentType: { value: "", label: "" },
    status: { value: "", label: "" },
    difficultyLevel: { value: "", label: "" },
    targetAudience: "",
    tags: "",
  });

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

  useEffect(() => {
    if (contentId) {
      dispatch(getSingleContentAction(contentId));
    }
  }, [dispatch, contentId]);

  useEffect(() => {
    if (singleContent && Object.keys(singleContent).length) {
      setFormData({
        title: singleContent.title || "",
        description: singleContent.description || "",
        contentType: contentTypeOptions.find(
          (option) => option.value === singleContent.contentType
        ) || { value: "", label: "" },
        status: statusOptions.find(
          (option) => option.value === singleContent.status
        ) || { value: "", label: "" },
        difficultyLevel: difficultyLevelOptions.find(
          (option) => option.value === singleContent.difficultyLevel
        ) || { value: "", label: "" },
        targetAudience: singleContent.targetAudience || "",
        tags: singleContent.tags ? singleContent.tags.join(", ") : "",
      });
    }
  }, [singleContent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSelectChange = (name) => (selectedOption) => {
    setFormData({
      ...formData,
      [name]: selectedOption || { value: "", label: "" },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "tags" && formData[key]) {
        formData[key]
          .split(",")
          .forEach((tag) => dataToSend.append("tags", tag.trim()));
      } else if (key === "file") {
        formData[key] &&
          dataToSend.append(key, formData[key], formData[key].name);
      } else {
        dataToSend.append(key, formData[key]?.value || formData[key] || "");
      }
    });

    dispatch(updateContentAction({ id: contentId, data: dataToSend }));
  };

  useEffect(() => {
    if (success) {
      navigate("/user-profile");
    }
  }, [success, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
        <div className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 bg-white lg:max-w-xl lg:ml-auto rounded-4xl shadow-2xl">
          <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">
            Edit Content
          </h2>

          {error && <ErrorMsg message={error?.message} />}
          {success && <SuccessMsg message="Content updated successfully" />}
          {loading && <LoadingComponent />}

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Title</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="text"
              placeholder="Enter the content title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Image</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="file"
              name="file"
              onChange={handleFileChange}
            />
          </label>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">
              Content Type
            </span>
            <Select
              options={contentTypeOptions}
              onChange={handleSelectChange("contentType")}
              value={formData.contentType}
            />
          </label>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">
              Difficulty Level
            </span>
            <Select
              options={difficultyLevelOptions}
              onChange={handleSelectChange("difficultyLevel")}
              value={formData.difficultyLevel}
            />
          </label>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Status</span>
            <Select
              options={statusOptions}
              onChange={handleSelectChange("status")}
              value={formData.status}
            />
          </label>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Tags</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="text"
              placeholder="Enter tags, separated by commas"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
            />
          </label>

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
            />
          </label>

          <button
            className="mb-4 inline-block py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
            type="submit"
          >
            Update Content
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContent;
