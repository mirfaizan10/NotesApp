import { useState, useEffect } from "react";
import Groups from "../Components/GroupSection/Groups";
import Notes from "../Components/Notes/Notes";

const MainPage = () => {
  const [groups, setGroups] = useState(
    () => JSON.parse(localStorage.getItem("groups")) || {}
  );
  
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addGroup = (groupName, color) => {
    if (!groups[groupName]) {
      setGroups((prev) => ({
        ...prev,
        [groupName]: { color, notes: [] },
      }));
    }
  };

  const addNote = (text) => {
    if (selectedGroup) {
      const newNote = {
        text,
        timestamp: new Date().toISOString(),
      };
      setGroups((prev) => {
        const group = prev[selectedGroup] || { color: "#ccc", notes: [] };
        const updatedGroup = {
          ...group,
          notes: Array.isArray(group.notes)
            ? [...group.notes, newNote]
            : [newNote],
        };
        return {
          ...prev,
          [selectedGroup]: updatedGroup,
        };
      });
    }
  };

  const currentNotes =
    selectedGroup && groups[selectedGroup]?.notes
      ? groups[selectedGroup].notes
      : [];

  return (
    <>
      <div className="container">
        {(!isMobileView || !selectedGroup) && (
          <Groups
            groups={groups}
            onSelectGroup={setSelectedGroup}
            onAddGroup={addGroup}
          />
        )}
        ;
        {(!isMobileView || selectedGroup) && (
          <Notes
            groupName={selectedGroup}
            groupColor={groups[selectedGroup]?.color}
            notes={currentNotes}
            onAddNote={addNote}
            onBack={() => setSelectedGroup(null)}
            isMobileView={isMobileView}
          />
        )}
      </div>
    </>
  );
};

export default MainPage;
