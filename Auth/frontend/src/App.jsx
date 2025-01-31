import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"

import FloatingShape from "./components/FloatingShape"

import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import EmailVerificationPage from "./pages/EmailVerificationPage"
import DashBoardPage from "./pages/DashBoardPage"
import ForgetPasswordPage from "./pages/ForgetPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"

import  {useAuthStore}  from "./store/authStore.js"



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
    return <Navigate to="/" replace />
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
      <div className="min-h-screen bg-gradient-to-br from-neutral-700 to-slate-700 flex items-center justify-center relative overflow-hidden">
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
          <Route path="/" element={
            <ProtectedRoute>
              <DashBoardPage/>
            </ProtectedRoute>
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
