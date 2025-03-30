import { Route, Routes, useLocation } from "react-router-dom";
import Signup from "./Pages/Signup";
import VerificationFailed from "./Pages/VerificationFailed";
import VerificationSuccess from "./Pages/VerificationSuccess";
import { ToastContainer } from "react-toastify";
import Login from "./Pages/Login";
import Forgot from "./Components/Forgot";
import Verify from "./Pages/Verify";
import ResetPassword from "./Components/ResetPassword";
import { EmailProvider } from "./Components/Context";
import Role from "./Pages/Role";
import Applied from "./Components/Applied";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Employee from "./Dashboard/Employee";
import EmployeeRight from "./Dashboard/EmployeeRight";
import JobMaker from "./JobMaker/JobMaker";
import JobMakerRight from "./JobMaker/JobMakerRight";
import CreateJobs from "./JobMaker/CreateJobs";
import JobMakerProfile from "./JobMaker/JobMakerProfile";
import ProfileSettings from "./Dashboard/Profile";

const App = () => {
  const location = useLocation();

  // Check if the current path starts with '/dashboard' to hide Navbar
  const admin = location.pathname.startsWith("/employer");
  const dashboard = location.pathname.startsWith("/employee");
  return (
    <EmailProvider>
      <div className="bg-white w-full min-h-screen">
        {!admin && !dashboard && <Navbar />}
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/mail-verified-successfully"
            element={<VerificationSuccess />}
          />
          <Route
            path="/mail-verified-failed"
            element={<VerificationFailed />}
          />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/reset" element={<ResetPassword />} />
          {/* Dashboard route with nested routes */}
          <Route path="/employee" element={<Employee />}>
            {/* Default child route */}
            <Route index element={<EmployeeRight />} />
            {/* Other nested routes */}
            <Route path="explore" element={<EmployeeRight />} />
            <Route path="applied" element={<Applied />} />
            <Route path="profile" element={<ProfileSettings />} />
          </Route>
          <Route path="/role" element={<Role />} />
          <Route path="/employer" element={<JobMaker />}>
            {/* Default child route */}
            <Route index element={<JobMakerRight />} />
            {/* Other nested routes */}
            <Route path="created-jobs" element={<JobMakerRight />} />
            <Route path="create-jobs" element={<CreateJobs />} />
            <Route path="employer-profile" element={<JobMakerProfile />} />
          </Route>
        </Routes>
      </div>
    </EmailProvider>
  );
};

export default App;
