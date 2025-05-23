import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

  const [input,setInput] = useState("");
  const [recentprompt,setRecentprompt] = useState("");
  const [prevprompts,setPrevprompts] = useState([]);
  const [showresult,setShowresult] = useState(false);
  const [loading,setLoading] = useState(false);
  const [resultdata,setResultdata] = useState("");

  const delaypara = (index,nextword) => {
    setTimeout(function (){
      setResultdata((prev) => prev + nextword);
    },75*index);

  }
  const deletePrompt = (index) => {
    setPrevprompts((prev) => prev.filter((_, i) => i !== index));
  }

  const newChat = () => {
    setLoading(false)
    setShowresult(false)
  }

  const onSent = async (prompt) => {

    setResultdata("")
    setLoading(true)
    setShowresult(true)
    let response
    if (prompt !== undefined){
      response = await main(prompt)
      setRecentprompt(prompt)
    }
    else{
      setPrevprompts(prev => [...prev,input])
      setRecentprompt(input)
      response = await main(input)
    }
    let responseArray = response.split("**")
    let newResponse="";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i%2 !== 1){
        newResponse+=responseArray[i];
      }
      else{
        newResponse += "<b>"+responseArray[i]+"</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>")
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextword = newResponseArray[i];
      delaypara(i,nextword+" ");
    }
    setLoading(false)
    setInput("")
  }

  const contextValue={
    prevprompts,
    setPrevprompts,
    onSent,
    setRecentprompt,
    recentprompt,
    showresult,
    loading,
    resultdata,
    input,
    setInput,
    newChat,
    deletePrompt,
    main
  }
  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}
export default ContextProvider;