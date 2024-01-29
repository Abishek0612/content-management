import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMsg from "../Alert/ErrorMsg";
import {
  deleteContentAction,
  getSingleContentAction,
} from "../../redux/slices/users/contentsSlices";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import LoadingComponent from "../Alert/LoadingComponent";

const ContentDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { content, error } = useSelector((state) => state?.contents);
  const { contentId } = useParams();

  const { userAuth, success } = useSelector((state) => state?.users);

  useEffect(() => {
    if (contentId) {
      dispatch(getSingleContentAction(contentId));
    }
  }, [dispatch, contentId]);

  const defaultImageUrl =
    "https://th.bing.com/th/id/OIP.-PDu3vIBdOBlbNLhJo22PwHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7";

  if (error) {
    return <ErrorMsg message={error?.message} />;
  }

  if (!content?.singleContent) {
    return <LoadingComponent />;
  }

  const { singleContent } = content;
  const formattedDate = new Date(singleContent?.createdAt).toDateString();

  const creator = content?.singleContent?.author?._id?.toString();
  //!get the login user
  const loginUser = userAuth?.userInfo?._id?.toString();
  const isCreator = creator === loginUser;

  //?Delete Content handler
  const deleteContentHandler = () => {
    dispatch(deleteContentAction(contentId));
    if (success) {
      navigate("/user-profile");
    }
  };

  const navigateToEditContent = () => {
    navigate(`/edit-content/${singleContent._id}`);
  };

  return (
    <section className="bg-gray-50 py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 md:mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            {singleContent.title}
          </h2>
          <p className="text-md font-medium text-gray-500 mb-2">
            Created by {singleContent.author.username} on {formattedDate}
          </p>
          <p className="text-lg font-light text-gray-600 mb-4 max-w-3xl mx-auto">
            {singleContent.description}
          </p>
          <img
            src={singleContent.image || defaultImageUrl}
            alt="Content detailed view"
            className="rounded-lg shadow-lg mb-4 mx-auto"
            style={{ maxWidth: "500px" }}
          />
        </div>
        <div className="text-left space-y-4">
          <p>
            <strong>Content Type:</strong> {singleContent.contentType}
          </p>
          <p>
            <strong>Difficulty Level:</strong> {singleContent.difficultyLevel}
          </p>
          <p>
            <strong>Target Audience:</strong> {singleContent.targetAudience}
          </p>
          <p>
            <strong>Status:</strong> {singleContent.status}
          </p>
          <p>
            <strong>Tags:</strong> {singleContent.tags.join(", ")}
          </p>
        </div>
        {isCreator && (
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={navigateToEditContent}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              <PencilSquareIcon className="h-5 w-5 mr-2" /> Edit
            </button>
            <button
              onClick={deleteContentHandler}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
            >
              <TrashIcon className="h-5 w-5 mr-2" /> Delete
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentDetails;
