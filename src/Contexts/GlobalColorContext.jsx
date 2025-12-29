import { useContext, createContext, useState } from "react";


const GlobalColorContext = createContext(null);
export const useGlobalColorContext = () => useContext(GlobalColorContext);



const GlobalColorContextProvider = ({ children }) => {
    const [colorsComponent, setColorsComponent] = useState({
        text: "#gray",
        textMuted: "#9CA3AF",

        bgApp: "#0F172A",
        bgPanel: "#020617",
        bgListItem: "#020617",

        primary: "#3B82F6",
        primaryHover: "#2563EB",

        danger: "#EF4444",
        dangerHover: "#DC2626",

        border: "#1F2933",
        focus: "#60A5FA",
    })


    return (
        <div
            style={{
            "--c-text": colorsComponent.text,
            "--c-text-muted": colorsComponent.textMuted,
            "--c-bg": colorsComponent.bgApp,
            "--c-panel": colorsComponent.bgPanel,
            "--c-border": colorsComponent.border,
            "--c-primary": colorsComponent.primary,
            "--c-primary-hover": colorsComponent.primaryHover,
            "--c-danger": colorsComponent.danger,
            "--c-danger-hover": colorsComponent.dangerHover,
            "--c-focus": colorsComponent.focus,
        }}
        >


        <GlobalColorContext.Provider value={{ colorsComponent, setColorsComponent }}>
            {children}
        </GlobalColorContext.Provider>
        </div>
    );
};
export default GlobalColorContextProvider;