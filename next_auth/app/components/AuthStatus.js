"use client"

import { useState } from 'react'

export default function AuthStatus() {
  const [status, setStatus] = useState(null)  // null = not checked yet
  
  const checkStatus = async () => {
    const response = await fetch("/api/auth/user");

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    if (data.data?.user) {
        setStatus(data.data.user.email);
    } else {
        setStatus("Not Logged In");
    }
    // TODO: 
    // 1. Use fetch() to call GET /api/auth/user
    // 2. Parse the response with .json()
    // 3. If data.data?.user exists, setStatus to the user's email
    // 4. Otherwise, setStatus to "Not Logged In"
  }

       return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px' }}>
      <h3>Auth Status</h3>
      <button onClick={checkStatus} style={{ padding: '10px 20px', marginBottom: '10px' }}>
        Check Login Status
      </button>
      <p>
        { status ? status : "Click button to Check" }
      </p>
         </div>
  )
}