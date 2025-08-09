import { useState } from "react";
import "./Notes.css";
import image from "../../Images/notes.png";
const Notes = ({
  groupName,
  notes,
  onAddNote,
  groupColor,
  onBack,
  isMobileView,
}) => {
  const [noteText, setNoteText] = useState("");

  const handleAddNote = () => {
    if (noteText.trim()) {
      onAddNote(noteText.trim());
      setNoteText("");
    }
  };
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  return (
    <>
      {" "}
      <div className="notes-section">
        {!groupName ? (
          <div className="empty-display">
            <img src={image} alt="Image not found" />
            <h1>Pocket Notes</h1>
            <p>
              Send and receive messages without keeping your phone online.{" "}
              <br />
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
          </div>
        ) : (
          <div className="notes-display">
            <div className="heading">
              {isMobileView && (
                <button onClick={onBack} className="back-button">
                  ←
                </button>
              )}

              <span
                style={{
                  backgroundColor: groupColor,
                }}
              >
                {groupName
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")}
              </span>
              <p>{groupName}</p>
            </div>
            <div className="notes-list">
              <ul>
                {notes.map((note, index) => (
                  <li key={index}>
                    <div className="content">{note.text}</div>
                    <div className="id">
                      <strong>{formatDateTime(note.timestamp)}</strong>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-area">
              <input
                rows="3"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddNote();
                  }
                }}
                placeholder="Enter your text here..........."
              ></input>
              <button
                onClick={handleAddNote}
                disabled={!noteText.trim()}
                style={{
                  color: noteText.trim() ? "#001f8b" : "#ababab",
                  cursor: noteText.trim() ? "pointer" : "not-allowed",
                }}
              >
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Notes;
