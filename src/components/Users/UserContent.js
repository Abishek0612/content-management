import React from "react";
import { Link } from "react-router-dom";

const UserContent = ({ contents }) => {
  const defaultImageUrl =
    "https://th.bing.com/th/id/OIP.-PDu3vIBdOBlbNLhJo22PwHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7";

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-2 py-1 text-xs font-medium text-green-500 bg-green-100 rounded-full shadow-sm">
            Your Contents
          </span>
          <h3 className="mb-4 text-3xl font-bold leading-tight tracking-tighter md:text-5xl text-black-500">
            {" "}
            Top Contents [{contents?.length}]
          </h3>
          <p className="text-lg font-medium md:text-xl text-coolGray-500">
            Elevating tutoring operations, Evallo integrates advanced academic
            content marketplace features with CRM, project management, and
            invoicing for a unified, secure platform experience.
          </p>
        </div>

        <div className="flex flex-wrap -mx-4">
          {contents?.map((content, index) => (
            <div key={index} className="p-4 md:w-1/2 lg:w-1/3">
              <div className="h-full flex flex-col rounded-lg shadow-lg overflow-hidden">
                <Link to={`/contents/${content?._id}`}>
                  <img
                    className="object-cover h-64 w-full" // Adjusted for responsive height
                    src={content?.image || defaultImageUrl}
                    alt={content?.title}
                  />
                  <div className="p-6">
                    <span className="inline-block py-1 px-2 mb-4 text-xs leading-5 text-white bg-green-500 font-medium uppercase rounded">
                      {content?.tags?.join(", ") || "Not specified"}
                    </span>
                    <p className="text-xl font-semibold text-blue-500 mb-2">
                      {content?.title || "Not specified"}
                    </p>
                    <p className="text-base text-gray-500 mb-1">
                      Target: {content?.targetAudience || "Not specified"}
                    </p>
                    <p className="text-base text-gray-500 mb-1">
                      Desc: {content?.description || "Not specified"}
                    </p>
                    <p className="text-base text-gray-500 mb-1">
                      Status: {content?.status || "Not specified"}
                    </p>
                    <p className="text-base text-gray-500 mb-1">
                      Type: {content?.contentType || "Not specified"}
                    </p>
                    <p className="text-base text-gray-500 mb-1">
                      Level: {content?.difficultyLevel || "Not specified"}
                    </p>
                    <p className="text-base text-gray-500">
                      Posted on: {new Date(content?.createdAt).toDateString()}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserContent;
