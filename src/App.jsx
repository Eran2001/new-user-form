import UserForm from "./pages/UserForm";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <main>
        {" "}
        <UserForm />
      </main>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={true}
        theme="colored"
      />
    </>
  );
}

export default App;
