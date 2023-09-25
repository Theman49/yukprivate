import React, { useState, useEffect } from "react";

const Pay = () => {
  const [token, setToken] = useState("");

  const handleChange = event => {
    setToken(event.target.value);
    console.log(token)
  }

  const handleClick = event => {
    event.preventDefault();

    console.log(token)
    snap.pay(token)
  }

  useEffect(() => {
    const script = document.createElement('script');

    script.src="https://app.sandbox.midtrans.com/snap/snap.js";
    script['data-client-key']="SB-Mid-client-uweS1oz-UmY6U1hK";

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [])
  // return <div>Register</div>;
  return (
    <div>
      <input type="text" onChange={handleChange}/>
      <p id="pay-button" onClick={handleClick}>Beli</p>

      <script>
      </script>

    </div>
  );
};

export default Pay;
