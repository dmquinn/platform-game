import React, { useEffect, useRef, useState } from "react";
import One from "./One";
import Two from "./Two";
const App = () => {
  const [level, setLevel] = useState(0);
  const [route, setRoute] = useState(0);
  const [jump, setJump] = useState(false);
  useEffect(() => {
    setRoute(level);
  }, [level, setRoute]);
  return (
    <>
      {route === 0 ? (
        <One setLevel={setLevel} setJump={setJump} jump={jump} />
      ) : (
        route === 1 && <Two setLevel={setLevel} setJump={setJump} jump={jump} />
      )}
    </>
  );
};

export default App;
