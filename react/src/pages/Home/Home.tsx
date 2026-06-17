import { useTheme } from '../../context/ThemeContext.tsx';

function Home() {
  const { theme, switchTheme } = useTheme();

  return <div className={theme === "dark" ? "dark" : "light"}>
    <h1 className="text">
      Hello and Welcome Back to Another React App
    </h1>
    <button onClick={switchTheme}>switch</button>
  </div>;
}

export default Home;