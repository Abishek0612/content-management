import { AiFillCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { userPrivateProfileAction } from "../../redux/slices/users/usersSlicess";
import UserContent from "./UserContent";

export default function PrivateUserProfile() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userPrivateProfileAction());
  }, [dispatch]);

  //   console.log("userPrivateProfileAction,", userPrivateProfileAction);
  const { user, profile } = useSelector((state) => state?.users);
  console.log("profile,", profile);

  console.log(profile);

  return (
    <>
      {/* success msg */}
      <div className="flex h-full">
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              <article>
                {/* Profile header */}
                <div>
                  <div>
                    <div>
                      <img
                        className="object-cover w-full h-32 lg:h-48"
                        src={
                          profile?.user?.coverImage ||
                          "https://cdn.pixabay.com/photo/2020/02/06/15/59/forest-4824759_1280.png"
                        }
                        alt={profile?.user?.username}
                      />

                      <label
                        htmlFor="coverImageInput"
                        className="cursor-pointer"
                      >
                        <Link to="/upload-cover-image">
                          <AiFillCamera className="absolute top-0  right-0 w-6 h-6 m-4 text-black-200" />
                        </Link>
                      </label>
                    </div>
                  </div>

                  <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                      {/*  CameraIcon for profile image upload */}
                      <div className="relative flex items-center justify-center">
                        <img
                          className="w-24 h-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                          src={
                            profile?.user?.profilePicture ||
                            "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"
                          }
                          alt={profile?.user?.username}
                        />

                        <label
                          htmlFor="profileImageInput"
                          className="absolute bottom-0 right-0 cursor-pointer"
                        >
                          <Link to="/upload-profile-image">
                            <AiFillCamera className="w-6 h-6 m-1 text-black-500" />
                          </Link>
                        </label>
                      </div>

                      <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="flex-1 min-w-0 mt-6 sm:hidden 2xl:block">
                          <h1 className="text-2xl font-bold text-gray-900 truncate">
                            {user?.username}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 hidden min-w-0 mt-6 sm:block 2xl:hidden">
                      <h1 className="text-2xl font-bold text-gray-900 truncate">
                        {profile.user?.username}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Profile details */}
                <div className="max-w-5xl px-4 mx-auto mt-6 sm:px-6 lg:px-8">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-xl font-semi-bold leading-tight tracking-tighter md:text-5xl text-black-500">
                        Welcome {profile?.user?.username}
                      </dt>
                    </div>

                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Email: {profile?.user?.email}
                      </dt>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Date Joined:{" "}
                        {new Date(profile?.user?.createdAt).toDateString()}
                      </dt>
                    </div>
                  </dl>
                </div>
                {/* Content Lists */}
                <UserContent contents={profile?.user?.content} />
              </article>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
