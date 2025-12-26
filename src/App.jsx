import { useState } from "react";
import { CLOUD_NAME, UPLOAD_PRESET } from "./cloudinary";
import "./App.css";

const HOSTIA = ["Anna", "Peter", "Jana", "Martin"];

const TASKS = [
  "Odfot sa s nevestou","Zatancuj si","Pripij si s mladomanželmi",
  "Odfot sa pri výzdobe","Urob selfie s kamarátmi",
  "Nájdite niečo modré a odfoťte sa","Pochváľ sa svojím tancom",
  "Odfot sa s dortom","Objav tajnú pozvánku","Spievaj s kamarátmi",
  "Urob srandovnú pózu","Odfot sa s kvietkom","Nájdite najlepšiu fotku",
  "Odfot sa pri stoloch","Urob vtipnú grimasu","Spolu tancujte",
  "Odfot sa s rodinou","Zatancuj na stole","Urob selfie s fotografom",
  "Odfot sa pri strome","Pochváľ sa svadobným outfitom",
  "Urob vtipnú pózu so svokrou","Odfot sa s darčekom",
  "Urob tanečný duel","Zatancuj s nevestou"
];

function BingoCell({ task }) {
  const [photo, setPhoto] = useState(null);

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
      
      {/* NÁZOV ÚLOHY */}
      <div className="task-text">
        {task}
      </div>

      {/* STRED */}
      <div className="cell-center">
        {!photo ? (
          <label className="upload-icon">
            📷
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUpload(e.target.files[0])}
              hidden
            />
          </label>
        ) : (
          <img
            src={photo}
            alt="Fotka úlohy"
            className="bingo-photo"
          />
        )}
      </div>

      {/* SPODNÉ IKONY */}
      <div className="cell-footer">
        {photo && (
          <>
            <button onClick={() => window.open(photo, "_blank")}>👁️</button>

            <label>
              🔄
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload(e.target.files[0])}
                hidden
              />
            </label>

            <span className="done">✅</span>
          </>
        )}
      </div>

    </div>
  );
}



function BingoBoard({ tasks }) {
  return (
    <div className="bingo-grid">
      {tasks.map((task, i) => (
        <BingoCell key={i} task={task} />
      ))}
    </div>
  );
}

export default function App() {
  const [host, setHost] = useState("");

  if (!host) {
    return (
      <div className="guest-screen">
        <h1 className="guest-title">Vyber si svoje meno</h1>

        <select
          className="guest-select"
          value={host}
          onChange={(e) => setHost(e.target.value)}
        >
          <option value="">Vyber</option>
          {HOSTIA.map(h => <option key={h}>{h}</option>)}
        </select>
      </div>
    );
  }




  return (
    <div>
      <h2>Ahoj {host} 👋</h2>
      <BingoBoard tasks={TASKS} />
    </div>
  );
}
