import { SignedIn, SignedOut, SignIn, UserProfile } from '@clerk/clerk-react'
import './App.css'

function App() {
  return (
    <>
      <header>
        <h1>My Awesome App</h1>

        <SignedOut>
          <div>
            <SignIn />
          </div>
        </SignedOut>

        <SignedIn>
          <div>
            <UserProfile />
          </div>
        </SignedIn>
      </header>
      <main>
        <SignedIn>
          <p>Welcome to the homepage!</p>
        </SignedIn>
      </main>
    </>
  )
}

export default App
