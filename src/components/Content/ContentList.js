/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../Alert/LoadingComponent";
import { Link } from "react-router-dom";
import { fetchPrivateContentsAction } from "../../redux/slices/users/contentsSlices";

const ContentList = () => {
  const defaultImageUrl =
    "https://th.bing.com/th/id/OIP.-PDu3vIBdOBlbNLhJo22PwHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7";
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const { contents, error, loading } = useSelector(
    (state) => state?.contents
  );

  useEffect(() => {
    dispatch(fetchPrivateContentsAction({ searchTerm }));
  }, [dispatch, searchTerm]);

  return (
    <>
      <div>
        <section className="relative py-24 bg-white">
          <div className="container relative z-10 px-4 mx-auto">
            <div className="md:max-w-5xl mx-auto mb-8 md:mb-16 text-center">
              <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm">
                Content
              </span>
              <h3 className="mb-4 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
                Read our Trending Articles
              </h3>
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="flex flex-wrap -mx-4 mb-12 md:mb-20">
              {loading ? (
                <div className="flex justify-center items-center h-full w-full">
                  <LoadingComponent />
                </div>
              ) : error ? (
                <h3 className="text-red-500 text-center">{error?.message}</h3>
              ) : contents?.length <= 0 ? (
                <h1>No Content found</h1>
              ) : (
                contents?.content?.map((content) => (
                  <div key={content._id} className="w-full md:w-1/2 px-4 mb-8">
                    <div className="flex-shrink-0">
                      <img
                        className="object-cover"
                        style={{ width: "500px", height: "500px" }}
                        src={content?.image || defaultImageUrl}
                        alt={content?.title}
                      />
                    </div>
                    <div className="mb-4">
                      <h1 className="inline-block py-1 px-3 text-xs leading-5 text-green-500 hover:text-green-600 font-medium uppercase bg-green-100 hover:bg-green-200 rounded-full shadow-sm">
                        {content.tags}
                      </h1>
                    </div>
                    <p className="mb-2 text-coolGray-500 font-medium">
                      {new Date(content.createdAt).toDateString()}
                    </p>
                    <p className="inline-block mb-4 text-2xl md:text-3xl leading-tight text-coolGray-800 hover:text-coolGray-900 font-bold hover:underline">
                      {content.title}
                    </p>
                    <p className="mb-4 text-coolGray-500">
                      {content.description}
                    </p>

                    <Link
                      className="inline-flex items-center text-base md:text-lg text-green-500 hover:text-green-600 font-semibold"
                      to={`/contents/${content?._id}`}
                    >
                      <span className="mr-3">Read Content</span>
                      <svg
                        width={8}
                        height={10}
                        viewBox="0 0 8 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.94667 4.74665C7.91494 4.66481 7.86736 4.59005 7.80666 4.52665L4.47333 1.19331C4.41117 1.13116 4.33738 1.08185 4.25617 1.04821C4.17495 1.01457 4.08791 0.997253 4 0.997253C3.82246 0.997253 3.6522 1.06778 3.52667 1.19331C3.46451 1.25547 3.4152 1.32927 3.38156 1.41048C3.34792 1.4917 3.33061 1.57874 3.33061 1.66665C3.33061 1.84418 3.40113 2.01445 3.52667 2.13998L5.72667 4.33331H0.666667C0.489856 4.33331 0.320286 4.40355 0.195262 4.52858C0.070238 4.6536 0 4.82317 0 4.99998C0 5.17679 0.070238 5.34636 0.195262 5.47138C0.320286 5.59641 0.489856 5.66665 0.666667 5.66665H5.72667L3.52667 7.85998C3.46418 7.92196 3.41458 7.99569 3.38074 8.07693C3.34689 8.15817 3.32947 8.24531 3.32947 8.33331C3.32947 8.42132 3.34689 8.50846 3.38074 8.5897C3.41458 8.67094 3.46418 8.74467 3.52667 8.80665C3.58864 8.86913 3.66238 8.91873 3.74361 8.95257C3.82485 8.98642 3.91199 9.00385 4 9.00385C4.08801 9.00385 4.17514 8.98642 4.25638 8.95257C4.33762 8.91873 4.41136 8.86913 4.47333 8.80665L7.80666 5.47331C7.86736 5.40991 7.91494 5.33515 7.94667 5.25331C8.01334 5.09101 8.01334 4.90895 7.94667 4.74665Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContentList;
