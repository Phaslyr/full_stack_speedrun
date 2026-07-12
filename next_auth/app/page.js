// app/page.js - This is a SERVER component (no "use client")
import AuthStatus from './components/AuthStatus'  // Client component

export default function HomePage() {
// This part renders on the server (FAST!)
  return (
    <div>
 <h1>Welcome to AuthVitamin</h1>
 <p>This text was rendered on the server instantly.</p>
 
 {/* This interactive part is a client component */}
 <AuthStatus />
    </div>
)
}