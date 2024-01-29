import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/HomePage/HomePage";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import Login from "./components/Users/Login";
import AddContent from "./components/Content/AddContent";
import ProtectedRoute from "./components/AuthRoute/ProtectedRoute";
import PrivateUserProfile from "./components/Users/PrivateUserProfile";
import UploadProfileImage from "./components/Users/UploadProfileImage";
import ContentList from "./components/Content/ContentList";
import ContentDetails from "./components/Content/ContentDetails";
import EditContent from "./components/Content/EditContent";
import Footer from "./components/Footer/Footer";

function App() {
  const { userAuth } = useSelector((state) => state?.users);
  const isLogin = userAuth?.userInfo?.token;

  return (
    <BrowserRouter>
      {isLogin ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/add-content"
          element={
            <ProtectedRoute>
              <AddContent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <PrivateUserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="upload-profile-image"
          element={
            <ProtectedRoute>
              <UploadProfileImage />
            </ProtectedRoute>
          }
        />

        {/* Content Lists */}
        <Route
          path="/contents"
          element={
            <ProtectedRoute>
              <ContentList />
            </ProtectedRoute>
          }
        />

        {/* //?Content  Details */}
        <Route
          path="/contents/:contentId"
          element={
            <ProtectedRoute>
              <ContentDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-content/:contentId"
          element={
            <ProtectedRoute>
              <EditContent />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
