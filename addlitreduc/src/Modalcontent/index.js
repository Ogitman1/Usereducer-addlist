import { at } from "json-server/lib/server/body-parser";
import { useReducer } from "react";
import { useState } from "react";
import Modalcontent from "./Modalcontent";

const reduce = (state, action) => {
      if(action.type === "ADD_ITEM"){
        const newconst = [...state.people, action.payload]
        return {
          ...state,
          people: newconst,
          isModalOpen: true,
          Modalcontent: "Item added",
        };

      }
      if(action.type === "NO_ITEM"){
        return {
          ...state,
          isModalOpen: true,
          Modalcontent: "Item empty"
        }
        
      }
      if (action.type === "CLOSE_MODAL"){
        return {
          ...state,
          isModalOpen: false,
        }

      }
      throw new Error("Invalid action")
}
const DefaultState = {
    people: [],
    isModalOpen: false,
    Modalcontent: "",
}
const Index = () => {
    const [name, setname] = useState("")
    const [state, dispatch] = useReducer(reduce, DefaultState)
    const handlesubmit = (e) => {
        e.preventDefault()
        if (name){
          const newItem = {id: new Date().getTime().toString(), name}
          dispatch({type: "ADD_ITEM", payload: newItem})
          setname("")
        }
        else {
          dispatch({type: "NO_ITEM"})
          
        }
        const closeModal = () => {
          dispatch({type: "CLOSE_MODAL"})
        }
    }
  return (
    <>
    {state.isModalOpen && <Modalcontent closeModal={closeModal} Modalcontent={state.Modalcontent}/>}
    <form onSubmit={handlesubmit}>
        <div >
          <input type="text" value={name} onChange = {
            (e) => setname(e.target.value)
          }>
          </input>
        </div>
        <button type="submit">ADD</button>
    </form>
    {
      state.people.map((person) => {
        return(
          <div key={person.id}>
            <h4> {person.name}</h4>
          </div>

        )
      })
    }
</>
  )
}
export default Index;