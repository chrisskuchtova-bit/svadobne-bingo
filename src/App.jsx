import { useState } from "react";
import { CLOUD_NAME, UPLOAD_PRESET } from "./cloudinary";

// Hostia
const HOSTIA = ["Anna", "Peter", "Jana", "Martin"];

// Úlohy pre bingo
const TASKS = [
  "Odfot sa s nevestou",
  "Zatancuj si",
  "Pripij si s mladomanželmi",
  "Odfot sa pri výzdobe",
  "Urob selfie s kamarátmi",
  "Nájdite niečo modré a odfoťte sa",
  "Pochváľ sa svojím tancom",
  "Odfot sa s dortom"
];

// Jedno políčko bingo
function BingoCell({ task }) {
  const [photo, setPhoto] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();
    setPhoto(data.secure_url);
  };

  return (
    <div style={{
      border: "1px solid black",
      padding: 10,
      textAlign: "center",
      minHeight: 100
    }}>
      <p>{task}</p>
      {!photo && (
        <input
          type="file"
          accept="image/*"
          onChange={e => handleUpload(e.target.files[0])}
        />
      )}
      {photo && (
        <div>
          <img
            src={photo}
            alt="Fotka úlohy"
            style={{ width: "100%", marginTop: 5, cursor: "pointer" }}
            onClick={() => setMenuVisible(!menuVisible)}
          />
          {menuVisible && (
            <div style={{ border: "1px solid gray", padding: 5, marginTop: 5 }}>
              <button onClick={() => window.open(photo, "_blank")}>Zobraziť fotku</button>
              <button onClick={() => setPhoto(null)}>Zmeniť fotku</button>
              <button onClick={() => alert(task)}>Zobraziť úlohu</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Bingo mriežka
function BingoBoard({ tasks }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 10,
      marginTop: 20
    }}>
      {tasks.map((task, index) => (
        <BingoCell key={index} task={task} />
      ))}
    </div>
  );
}

// Hlavná App komponenta
function App() {
  const [host, setHost] = useState("");

  if (!host) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Vyber si svoje meno</h1>
        <div className="guest-select-wrapper">
          <select
            className="guest-select"
            value={host}
            onChange={(e) => setHost(e.target.value)}
          >
            <option value="">Vyber si svoje meno</option>
            {HOSTIA.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Ahoj {host} 👋</h2>
      <p>Tvoja bingo kartička:</p>
      <BingoBoard tasks={TASKS} />
    </div>
  );
}

export default App;
