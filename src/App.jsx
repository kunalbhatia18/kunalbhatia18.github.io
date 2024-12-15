import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import HardSkills from "./components/HardSkills";
import WritingAndMore from "./components/WritingAndMore";
import Current from "./components/Current";

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <HardSkills />
      <WritingAndMore />
      <Current />
    </div>
  );
};

export default App;
