import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"

import FloatingShape from "./components/FloatingShape"

import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import EmailVerificationPage from "./pages/EmailVerificationPage"
import DashBoardPage from "./pages/DashBoardPage"
import ForgetPasswordPage from "./pages/ForgetPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx"

import  {useAuthStore}  from "./store/authStore.js"
import Homepage from "./pages/Homepage.jsx"
import Bill from "./pages/Mechanic/Bill.jsx"
import BookingForm from "./pages/Customer/BookForm.jsx"
import CustomerDashboard from "./pages/Customer/Dashboard.jsx"
import MechanicDashboard from "./pages/Mechanic/Dashboard.jsx"
import Invoice from "./pages/Customer/Invoice.jsx"
import MechanicRegistration from "./pages/Mechanic/MechanicRegister.jsx"
import ShopDetails from "./pages/Customer/ShopDetails.jsx"
import ServiceFeedback from "./pages/Customer/ServiceFeedback.jsx"
import MechanicFeedback from "./pages/Mechanic/MechanicFeedback.jsx"

//protecting routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (!user.isverified) {
    return <Navigate to="/verify-email" replace />
  }

  return children
}


//redirecting the authenticated user to home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()

  if (isAuthenticated && user.isverified) {
    return <Navigate to="/dashboardcustomer" replace />
  }

  return children
}


function App() {


  const { checkAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // console.log("Authentication value : " + isAuthenticated);
  // console.log("User : ", user);




  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-700 to-slate-700 flex items-center justify-center relative overflow-hidden">
        <FloatingShape
          color="bg-zinc-900"
          size="w-64 h-64"
          top='-5%'
          left="10%"
          delay={0}
        />
        <FloatingShape
          color="bg-zinc-700"
          size="w-48 h-48"
          top='70%'
          left="80%"
          delay={5}
        />
        <FloatingShape
          color="bg-zinc-500"
          size="w-32 h-32"
          top='40%'
          left="-10%"
          delay={2}
        />

        <Routes>
          {/* <Route path="/" element={
            <ProtectedRoute>
              <DashBoardPage/>
            </ProtectedRoute>
          } /> */}
          <Route path="/welcome" element={
              <Homepage/>
          } />
          <Route path="/bookform/:mechanicId" element={
            <ProtectedRoute>
              <BookingForm/>
            </ProtectedRoute>
          } />
          <Route path="/dashboardcustomer" element={
            <ProtectedRoute>
                <CustomerDashboard/>
            </ProtectedRoute>
          } />
          <Route path="/invoice/:invoiceId" element={
            <ProtectedRoute>
              <Invoice/>
            </ProtectedRoute>
          } />
          <Route path="/shopdetails/:mechanicId" element={
            <ProtectedRoute>
              <ShopDetails/>
            </ProtectedRoute>
          } />
          <Route path="/servicefeedback/:mechanicId" element={
              <ServiceFeedback/>
          } />

          <Route path="/billmechanic" element={
              <Bill/>
          } />
          <Route path="/dashboardmechanic" element={
              <MechanicDashboard/>
          } />          
          <Route path="/mechanicregestration" element={
              <MechanicRegistration/>
          } />
          <Route path="/mechanicfeedback" element={
              <MechanicFeedback/>
          } />
          <Route path="/signup" element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/login" element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/verify-email" element={
            <RedirectAuthenticatedUser>
              <EmailVerificationPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/forgot-password" element={
            <RedirectAuthenticatedUser>
              <ForgetPasswordPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path="/reset-password/:token" element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          } />
          <Route path = "*" element={<Navigate to ='/' replace />} />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
