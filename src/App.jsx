import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [qrValue, setQrValue] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const generateQR = () => {
    setError("");
    setSuccess("");

    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    try {
      const validUrl = new URL(url);

      if (validUrl.protocol !== "http:" && validUrl.protocol !== "https:") {
        setError("Please enter a valid HTTP or HTTPS URL.");
        return;
      }

      setQrValue(url.trim());
      setSuccess("QR Code generated successfully!");
    } catch {
      setError("Please enter a valid URL.");
    }
  };

  const downloadQR = () => {
    const canvas = document.getElementById("qr-code");

    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const clearAll = () => {
    setUrl("");
    setQrValue("");
    setError("");
    setSuccess("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      generateQR();
    }
  };

  return (
    <div className="app">
      <div className="card">
        <div className="header">
          <h1>QR Code Generator</h1>
          <p>Enter a link and generate your QR code instantly.</p>
        </div>

        <div className="input-section">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="https://example.com"
          />

          <button className="generate-btn" onClick={generateQR}>
            Generate QR Code
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {success && <p className="success">{success}</p>}

        {qrValue && (
          <div className="qr-section">
            <div className="qr-container">
              <QRCodeCanvas
                id="qr-code"
                value={qrValue}
                size={220}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={true}
              />
            </div>

            <p className="url-text">{qrValue}</p>

            <div className="action-buttons">
              <button className="download-btn" onClick={downloadQR}>
                Download QR Code
              </button>

              <button className="clear-btn" onClick={clearAll}>
                Clear
              </button>
            </div>
          </div>
        )}

        {!qrValue && !error && (
          <div className="empty-state">
            <div className="qr-placeholder">QR</div>
            <p>Your QR code will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;