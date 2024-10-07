import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext<{
    onSent: (prompt: string) => Promise<void>;
}>({
    onSent: () => Promise.resolve(),
});



const ContextProvider = (props: { children: React.ReactNode }) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompt, setPreviousPrompt] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);

    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index: number, nextWord: string) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);

    }






    const onSent = async (prompt: string) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response: string;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        }
        else {
            setPreviousPrompt((prev) => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }

        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            }
            else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        // setResultData(newResponse2)
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }

        setLoading(false);
        setInput("");

    };


    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;