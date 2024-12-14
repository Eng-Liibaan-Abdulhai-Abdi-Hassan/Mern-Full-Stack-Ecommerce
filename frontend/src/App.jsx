import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { AllApiDataHooks } from "./hooks/AllApiData";
import { useusercontext } from "./context/Context";

function App() {
  const { total, GetProductCount: load } = AllApiDataHooks()

  const {authlogin}=useusercontext()



  return (
    <>
      <Header total={total} load={load} authlogin={authlogin} />
      <div className="pt-16   min-h-[calc(100vh-120px)] ">
        <Outlet context={{ load }} />
      </div>

    </>
  )
}

export default App
