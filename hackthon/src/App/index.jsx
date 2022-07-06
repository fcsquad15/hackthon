import "./styles.css";

import { ToastContainer } from "react-toastify";
import Header from "../components/Header";

import Index from "../routes";
// import { UserProvider } from ;

export default function Main() {
  return (
    <>
      {/* <UserProvider> */}
      <main>
        <ToastContainer theme="light" style={{ width: "36rem", fontSize: "1.6rem" }} />
        <Header />
        <section className="contentPage">
          <Index />
        </section>
      </main>
      {/* </UserProvider> */}
    </>
  );
}
