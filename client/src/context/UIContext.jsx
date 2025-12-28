import { createContext, useContext, useState } from "react";

const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [activeView, setActiveView] = useState("options");

  const openGetStarted = (view = "options") => {
    setActiveView(view);
    setIsGetStartedOpen(true);
  };

  const closeGetStarted = () => {
    setIsGetStartedOpen(false);
    setActiveView("options");
  };

  return (
    <UIContext.Provider
      value={{
        isGetStartedOpen,
        activeView,
        openGetStarted,
        closeGetStarted,
        setActiveView,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used inside UIProvider");
  }
  return context;
};
