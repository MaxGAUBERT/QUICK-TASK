import { useState} from "react"
import { BsSearch } from "react-icons/bs"
import { useGlobalColorContext } from "../Contexts/GlobalColorContext"
import { BiUpArrow, BiDownArrow } from "react-icons/bi"


export default function SearchBar({ onSearch, sortState, dispatchSort }) {
  const [searchTerm, setSearchTerm] = useState("")
  const { colorsComponent } = useGlobalColorContext()


  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    if (onSearch) onSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) onSearch(searchTerm)
  }


  return (
    <form
      onSubmit={handleSubmit}
      style={{
        borderColor: colorsComponent.Border,
        backgroundColor: colorsComponent.TextIO,
      }}
      className="flex items-center gap-2 border-2 border-double rounded-md px-2 py-1 w-[22rem] h-10 shadow-sm"
    >
      <BsSearch className="text-lg" style={{ color: colorsComponent.Text }} />

      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
        style={{ color: colorsComponent.Text }}
        className="flex-1 outline-none placeholder-gray-400 bg-transparent"
      />
      
      <div className="border-l flex flex-row ml-15" style={{ borderColor: colorsComponent.Border, backgroundColor: colorsComponent.Background }}>
      <select onChange={(e) => dispatchSort({type: "SET_SORT_KEY", payload: e.target.value})} className="bg-transparent outline-none" style={{ color: colorsComponent.Text }}>
        <option value="date">Date</option>
        <option value="priority">Priority</option>
        <option value="text">Title</option>
      </select>

      <button className="ml-8" type="button" title="Toggle Sort Order (asc/desc)" onClick={() =>
        dispatchSort({
          type: "SET_SORT_ORDER",
          payload: sortState.order === "asc" ? "desc" : "asc",
        })
      }>
          {sortState.order === "asc" ? <BiUpArrow /> : <BiDownArrow />}
      </button>
      </div>
    </form>
  )
}
