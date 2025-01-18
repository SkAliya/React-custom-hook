import { useState } from "react";
import { useGeolocation } from "./useGeolocation.js";

export default function App() {
  const [countClicks, setCountClicks] = useState(0);
  // let isLoading, position, error;
  // const { lat, lng } = position ?? "";
  const [isLoading, position, error, getPosition] = useGeolocation();
  const { lat, lng } = position;

  function getPos() {
    getPosition();
    setCountClicks((count) => count + 1);
  }
  return (
    <div>
      <button disabled={isLoading} onClick={() => getPos()}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  );
}
