import React, { createContext, useState } from "react";

const SessionContext = createContext({});
const SessionDispatchContext = createContext({});

function SessionProvider({ children }) {
  const [sessionDetails, setSessionDetails] = useState({
    courseSearch: "",
    majors: [],
    takenCourses: [],
    recommendedCourses: [],
  });

  return (
    <SessionContext.Provider value={sessionDetails}>
      <SessionDispatchContext.Provider value={setSessionDetails}>
        {children}
      </SessionDispatchContext.Provider>
    </SessionContext.Provider>
  );
}

export default { SessionProvider, SessionContext, SessionDispatchContext };
