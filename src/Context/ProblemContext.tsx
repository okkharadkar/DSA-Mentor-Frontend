// src/context/ProblemContext.tsx
import { createContext, useContext, useState } from "react";

interface ProblemContextType {
    selectedTitle: string;
    setSelectedTitle: (title: string) => void;
}

const ProblemContext = createContext<ProblemContextType | undefined>(undefined);

export const ProblemProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedTitle, setSelectedTitle] = useState("");

    return (
        <ProblemContext.Provider value={{ selectedTitle, setSelectedTitle }}>
            {children}
        </ProblemContext.Provider>
    );
};

export const useProblem = () => {
    const context = useContext(ProblemContext);
    if (!context) {
        throw new Error("useProblem must be used within a ProblemProvider");
    }
    return context;
};
