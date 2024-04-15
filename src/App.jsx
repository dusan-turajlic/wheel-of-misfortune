import React, { useState } from "react";
import "./styles.css";
import WheelComponent from "react-wheel-of-prizes";
import "react-wheel-of-prizes/dist/index.css";

const colors = [
  "#F0CF50",
  "#815CD1",
  "#3DA5E0",
  "#34A24F",
  "#F9AA1F",
  "#EC3F3F",
  "#FF9000",
  "#D35400",
  "#C0392B",
  "#9B59B6",
  "#3498DB",
  "#2ECC71",
  "#F1C40F",
  "#E67E22",
  "#2980B9",
  "#27AE60",
  "#F39C12",
  "#D98880",
  "#85C1E9",
  "#A9DFBF",
  "#FAD7A0",
  "#BB8FCE",
  "#76D7C4",
  "#F7DC6F",
  "#7DCEA0",
  "#EB984E"
];

export default function App() {
  const url = new URL(window.location.href);
  const mebers = [];
  url.searchParams.forEach((value, key) => {
    if (key === "p") {
      mebers.push(value.charAt(0).toUpperCase() + value.slice(1));
    }
  });

  const [segments, setSegmenents] = useState(new Set(mebers));
  const [winnerText, setWinnerText] = useState();
  const segColors = Array.from(segments).map((a, i) => colors[i]);
  const onFinished = (winner) => {
    
  };

  const onChange = (formData) => {
    const input = formData.currentTarget;
    const newSegents = new Set(segments)
    if (!input.checked) {
      newSegents.delete(input.value)
    } else {
      newSegents.add(input.value)
    }

    setSegmenents(newSegents)
  }

  return (
    <>
    <div style={{textAlign: 'center', color: 'white', width: '100%', padding: '2em'}}>
        <h1>Wheel Of Misfortune</h1>
    </div>
    <div style={{display: 'flex', 'flexDirection': 'row', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{paddingRight: '10em'}}>
        <div className="container">
            {mebers.map((meber, i) => (
              <label for={`checkbox-${i+1}`} key={meber}>
                <input 
                  type="checkbox" 
                  id={`checkbox-${i+1}`} 
                  name={`checkbox-${i+1}`}
                  checked={Array.from(segments).includes(meber)}
                  onChange={onChange}
                  value={meber} />
                {meber}
              </label>
            ))}
        </div>
      </div>
      <div className="container" style={{width: 600, height: 600}}>
        <WheelComponent
          key={Array.from(segments).join('-')}
          segments={Array.from(segments)}
          segColors={segColors}
          onFinished={(winner) => onFinished(winner)}
          primaryColor="white"
          contrastColor="black"
          buttonText="Spin"
          isOnlyOnce={true}
        />
      </div>
    </div>
    </>
  );
}
