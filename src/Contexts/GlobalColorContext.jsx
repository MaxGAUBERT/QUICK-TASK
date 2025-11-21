import { useContext, createContext, useState } from "react";


const GlobalColorContext = createContext(null);
export const useGlobalColorContext = () => useContext(GlobalColorContext);



const GlobalColorContextProvider = ({ children }) => {
    const [colorsComponent, setColorsComponent] = useState({
        "Text": "white",
        "TextIO": "black",
        "Button": "white",
        "TransportButtons": "white",
        "Background": "gray.400",
        "BackgroundList": "blue.200",
        "BackgroundIO": "gray.500",
        "Border": "gray.700",
        "BorderModals": "black"
    });

    return (
        <GlobalColorContext.Provider value={{ colorsComponent, setColorsComponent }}>
            {children}
        </GlobalColorContext.Provider>
    );
};
export default GlobalColorContextProvider;