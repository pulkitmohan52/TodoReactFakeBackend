import { useState } from "react";
import InputForm from "./components/InputForm/InputForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>this is react app</h1>
      <InputForm />
    </>
  );
}

export default App;
