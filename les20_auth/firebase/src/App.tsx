import { auth, googleProvider, db } from "./firebase.ts";
import { signInWithPopup, signOut, onAuthStateChanged, type User } from "firebase/auth";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";

import { useState, useEffect } from 'react'

import './App.css'

interface Todo {
  id: string;
  text: string;
  userId: string;
  createdAt: Timestamp | Date;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const todosArray: Todo[] = [];

      querySnapshot.forEach((doc) => {
        todosArray.push({ id: doc.id, ...doc.data() } as Todo);
      });

      setTodos(todosArray);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchTodos();
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const saveTodo = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!todo || !user) return;

    try { 
      await addDoc(collection(db, "todos"), {
        text: todo,
        userId: user.uid,
        createdAt: new Date(),
      });
      setTodo("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Firebase + React (TypeScript Edition)</h1>

      {user ? (
        <div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {/* TS might complain if photoURL is null, so we use a fallback */}
            <img 
              src={user.photoURL || ""} 
              alt="avatar" 
              style={{ borderRadius: "50%", width: "40px" }} 
            />
            <p>Welcome, {user.displayName}!</p>
            <button onClick={handleLogout}>Log Out</button>
          </div>

          <hr />

          <h3>Your Todo List</h3>
          <form onSubmit={saveTodo}>
            <input 
              type="text" 
              placeholder="Add a new task..." 
              value={todo} 
              onChange={(e) => setTodo(e.target.value)} 
            />
            <button type="submit">Save to Firebase</button>
          </form>

          <ul>
            {todos.map((item) => (
              <li key={item.id}>{item.text}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <p>Please log in to manage your tasks.</p>
          <button onClick={handleLogin}>Sign In with Google</button>
        </div>
      )}
    </div>
  );
}

export default App
