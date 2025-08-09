import { useState,useRef,useEffect } from "react";
import "./Groups.css";

const COLORS = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
];

const Groups = ({ groups, onSelectGroup, onAddGroup }) => {
  const [showModal, setShowModal] = useState(!true);
  const [inputValue, setInputValue] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [error, setError] = useState("");


  const modalRef = useRef();

useEffect(() => {
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false); // or your close modal function
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

// State for error message
const handleAdd = () => {
  const trimmedName = inputValue.trim();

  // 1. Empty check
  if (!trimmedName) {
    setError("Group name cannot be empty.");
    return;
  }

  // 2. Max two words allowed
  if (trimmedName.split(/\s+/).length > 2) {
    setError("Group name cannot have more than two words.");
    return;
  }

  // 3. Duplicate name check (case-insensitive)
  const isDuplicate = Object.keys(groups).some(
    (name) => name.toLowerCase() === trimmedName.toLowerCase()
  );

  if (isDuplicate) {
    setError("A group with this name already exists.");
    return;
  }

  // ✅ Passed all checks → Add group
  onAddGroup(trimmedName, selectedColor || "#ccc");

  // Reset everything
  setInputValue("");
  setError("");
  setShowModal(false);
};


  const getInitials = (name) => {
    if (!name) return "";

    // Split and keep the first two non-empty words
    const words = name.trim().split(/\s+/).filter(Boolean);

    // If there are at least two words, get the first char of each
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }

    // If only one word, take first two **alphabet characters**
    const lettersOnly = words[0]?.replace(/[^a-zA-Z]/g, "").toUpperCase();
    return lettersOnly?.slice(0, 1) || name.slice(0, 1).toUpperCase();
  };
  return (
    <>
      <div className="group-section">
        <div className="heading">
          <p>Pocket Notes</p>
        </div>
        <div className="groups">
          <ul>
            {Object.keys(groups).map((group) => (
              <li
                key={group}
                onClick={() => onSelectGroup(group)}
                className="group-item"
              >
                <span
                  className="group-circle"
                  style={{ backgroundColor: groups[group].color }}
                >
                  {getInitials(group)}
                </span>
                {group}
              </li>
            ))}
          </ul>
        </div>
        <button onClick={() => setShowModal(true)}>+</button>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal" ref={modalRef}>
              <h3>Create New Group</h3>
              <label htmlFor="">Group Name</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) =>{ setInputValue(e.target.value);
                    if (error) setError(""); 
                }}
                
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAdd();
                  }
                }}
                placeholder="Enter group name"
                
              />
               {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
              <div className="color-options">
                <label htmlFor="">Choose colour</label>
                {COLORS.map((color) => (
                  <span
                    key={color}
                    className={`color-dot ${
                      selectedColor === color ? "selected" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  ></span>
                ))}
              </div>
              <button onClick={handleAdd} disabled={!inputValue.trim()}>
                Create
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Groups;
