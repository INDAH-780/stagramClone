import { Outlet, Navigate } from "react-router-dom"

const AuthLayout = () => {
  {/*Check if user is authenticated */}
  const isAuthenticated = false;
  return (
   <>
   {isAuthenticated ? (
    <Navigate to="/" />
   ):
   (
    <>
    <section className="flex flex-1 justify-center items-center flex-col py-10">
      <Outlet />
    </section>

    <img 
    src="/assets/images/side-img.svg"
    className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat" 
    />
    </>
   )
   }
   </>
  )
}

export default AuthLayout
/*this layout routes our signin and signupform*/