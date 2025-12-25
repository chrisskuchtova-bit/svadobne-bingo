import { useState } from "react";
import { CLOUD_NAME, UPLOAD_PRESET } from "./cloudinary";
import './App.css';

// Hostia
const HOSTIA = ["Anna", "Peter", "Jana", "Martin"];

// 25 úloh
const TASKS = [
  "Odfot sa s nevestou",
  "Zatancuj si",
  "Pripij si s mladomanželmi",
  "Odfot sa pri výzdobe",
  "Urob selfie s kamarátmi",
  "Nájdite niečo modré a odfoťte sa",
  "Pochváľ sa svojím tancom",
  "Odfot sa s dortom",
  "Objav tajnú pozvánku",
  "Spievaj s kamarátmi",
  "Urob srandovnú pózu",
  "Odfot sa s kvietkom",
  "Nájdite najlepšiu fotku",
  "Odfot sa pri stoloch",
  "Urob vtipnú grimasu",
  "Spolu tancujte",
  "Odfot sa s rodinou",
  "Zatancuj na stole",
  "Urob selfie s fotografom",
  "Odfot sa pri strome",
  "Pochváľ sa svadobným outfitom",
  "Urob vtipnú pózu so svokrou",
  "Odfot sa s darčekom",
  "Urob tanečný duel",
  "Zatancuj s nevestou"
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
      { method: "POST", body: formData }
    );

    const data = await res.json();
    setPhoto(data.secure_url);
  };

  return (
    <div className="bingo-cell">
      <p className="task-text">{task}</p>

      {!photo && (
        <label className="upload-icon">
          📷
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUpload(e.target.files[0])}
            style={{ display: "none" }}
          />
        </label>
      )}

      {photo && (
        <div className="photo-menu">
          <img
            src={photo}
            alt="Fotka úlohy"
            className="bingo-photo"
            onClick={() => setMenuVisible(!menuVisible)}
          />
          {menuVisible && (
            <div className="photo-buttons">
              <button onClick={() => window.open(photo, "_blank")}>Zobraziť fotku</button>
              <button onClick={() => setPhoto(null)}>Zmeniť fotku</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// BingoBoard
function BingoBoard({ tasks }) {
  return (
    <div className="bingo-grid">
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
      <div className="guest-wrapper">
        <h1>Vyber si svoje meno</h1>
        <select
          className="guest-select"
          value={host}
          onChange={(e) => setHost(e.target.value)}
        >
          <option value="">Vyber si svoje meno</option>
          {HOSTIA.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
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
