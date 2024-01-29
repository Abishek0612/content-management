import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../Alert/LoadingComponent";
import { Link } from "react-router-dom";
import { fetchPublicContentAction } from "../../redux/slices/users/contentsSlices";

const PublicContents = () => {
  const dispatch = useDispatch();
  const { contents, error, loading } = useSelector((state) => state.contents);
  //   console.log("contents", contents);
  const defaultImageUrl =
    "https://th.bing.com/th/id/OIP.-PDu3vIBdOBlbNLhJo22PwHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7";

  useEffect(() => {
    dispatch(fetchPublicContentAction());
  }, [dispatch]);

  return (
    <>
      <div>
        <section className="relative py-24 bg-white">
          <div className="container relative z-10 px-4 mx-auto">
            <div className="md:max-w-5xl mx-auto mb-8 md:mb-16 text-center">
              <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm">
                CONTENT
              </span>
              <h3 className="mb-4 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
                Read our Trending Articles
              </h3>
            </div>

            <div className="flex flex-wrap -mx-4 mb-12 md:mb-20">
              {loading ? (
                <div className="flex justify-center items-center h-full w-full">
                  <LoadingComponent />
                </div>
              ) : error ? (
                <h3 className="text-red-500 text-center">{error?.message}</h3>
              ) : !contents.content || contents.content.length <= 0 ? (
                <h1>No Content found</h1>
              ) : (
                contents.content.map((content) => (
                  <div className="w-full md:w-1/2 px-4 mb-8" key={content._id}>
                    <button
                      className="block mb-6 overflow-hidden rounded-md"
                    >
                      <div className="flex-shrink-0">
                        <img
                          className="object-cover"
                          style={{ width: "500px", height: "500px" }}
                          src={content?.image || defaultImageUrl}
                          alt={content?.title}
                        />
                      </div>
                    </button>
                    <p className="mb-2 text-coolGray-500 font-medium">
                      {new Date(content.createdAt).toDateString()}
                    </p>
                    <p
                      className="inline-block mb-4 text-2xl md:text-3xl leading-tight text-coolGray-800 hover:text-coolGray-900 font-bold hover:underline"
                    >
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

export default PublicContents;
