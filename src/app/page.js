"use client";
import Footer from "./inlcude/footer";
import Header from "./inlcude/header";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./homserve.module.css";
import Echo from "./registerPlugin";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem("collection_id");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      
      const result = await Echo.getConfig();
      const API_URL = result.value;
      const SITE = result.site;

      const formData = new FormData(e.target);
      const jsonObject1 = {};
      const jsonObject = {};
  
      formData.forEach((value, key) => {
        jsonObject[key] = value;  
      });
  
      jsonObject1["data"] = jsonObject;
      jsonObject1["site"] = SITE;

      const response = await fetch(`${API_URL}/form/add`, {
        method: "POST",
        body: JSON.stringify(jsonObject1),
      });
  
      const responseData = await response.json();

      if (responseData.status === 200) {
        localStorage.setItem("collection_id", responseData.data);
        router.push("/2");
      } else {
        alert(responseData.msg); 
        setLoading(false);  
      }
    } catch (error) {
      console.error("Error calling Echo plugin or API:", error);
      alert("An error occurred, please try again."+error);
    } finally {
      setLoading(false);  
    }
  };

  return (
    <>
      <Header />
      <main>
        <img src="help/step1.jpeg" className="w-100" alt="" />
        <h3 className={`mx-2 ${styles.textCenter}`}>
          CUSTOMER CARE SUPPORT INSTANT SOLUTION
        </h3>
        <div className="form-container m-2">
          <form onSubmit={handleSubmit} id="submitForm">
            <div className={`form-floating mb-3 ${styles.formFloatingLabel} `}>
              <input
                type="text"
                className={`form-control ${styles.markCenter}`}
                name="customname"
                id="floatingInput"
                placeholder="Ex. Jhon"
                required
              />
              <label htmlFor="floatingInput">Full Name*</label>
            </div>
            <div className={`form-floating mb-3 ${styles.formFloatingLabel} `}>
              <input
                type="text"
                inputMode="numeric"
                minLength={10}
                maxLength={10}
                name="customphonn"
                className={`form-control ${styles.markCenter}`}
                id="floatingInput2"
                placeholder="Ex. 7891729791"
                required
              />
              <label htmlFor="floatingInput2">Mobile Number*</label>
            </div>
            <div className="form-floating">
              <textarea
                className={`form-control ${styles.markCenter}`}
                style={{ height: 120 }}
                name="comment"
                placeholder="Leave a Complain here"
                id="floatingTextarea"
                required
                defaultValue={""}
              />
              <label htmlFor="floatingTextarea">Complain*</label>
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn px-4 btn-success  mt-3 text-center"
                id="submit-button"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Next"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
