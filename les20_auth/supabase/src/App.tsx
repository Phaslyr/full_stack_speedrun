import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { type User } from "@supabase/supabase-js";

import './App.css';

interface Todo {
  id: number;
  createdAt: string;
  task: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // New state for our Magic Link form
  const [email, setEmail] = useState<string>("");
  const [linkSent, setLinkSent] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchTodos();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchTodos();
      } else {
        setTodos([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) return;

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        // Optional: Where to send them after they click the link in their email
        emailRedirectTo: window.location.origin, 
      }
    });

    if (error) {
      console.error("Login failed:", error.message);
      alert(error.message);
    } else {
      setLinkSent(true);
      alert('Check your email for the login link!');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setEmail("");
    setLinkSent(false);
  };

  const saveTodo = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task) return;

    const { error } = await supabase.from('todos').insert([{ task: task}]);

    if (error) {
      console.error("Error saving task:", error.message);
    } else {
      setTask("");
      fetchTodos();
    }
  };

  async function fetchTodos() {
    const { data, error } = await supabase.from('todos').select<string, Todo>('*').order('id', { ascending: false });

    if (error) {
      console.error("Error fetching tasks:", error.message);
    } else if (data) {
      setTodos(data);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Supabase + React (TypeScript Edition)</h1>

      {user ? (
        <div>
          {/* Using optional chaining since user metadata can technically be undefined */}
          <p>Welcome, <strong>{user.email}</strong>!</p>
          <button onClick={handleLogout}>Log Out</button>

          <hr style={{ margin: "20px 0"}} />

          <h3>Your Todo List</h3>
          <form onSubmit={saveTodo} style={{ marginBottom: "20px" }}>
            <input 
              type="text" 
              placeholder="Add a new task..." 
              value={task} 
              onChange={(e) => setTask(e.target.value)}
              style={{ marginRight: "10px", padding: "5px" }}
            />
            <button type="submit">Save to Supabase</button>
          </form>

          <ul style={{ paddingLeft: "20px" }}>
            {todos.map((item) => (
              <li key={item.id} style={{ marginBottom: "5px" }}>{item.task}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
          <h2>Sign In</h2>
          {linkSent ? (
            <p style={{ color: "green", fontWeight: "bold" }}>
              ✨ Success! Check your email ({email}) for the secure login link. You can close this tab.
            </p>
          ) : (
            <form onSubmit={handleLogin}>
              <p>Enter your email to receive a magic login link.</p>
              <input 
                type="email" 
                placeholder="your.email@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                style={{ width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box" }}
              />
              <button type="submit" style={{ width: "100%", padding: "10px" }}>
                Send Magic Link
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export default App
