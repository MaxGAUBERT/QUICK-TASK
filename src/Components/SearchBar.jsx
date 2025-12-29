import { useState } from "react"
import { BsSearch } from "react-icons/bs"
import { BiUpArrow, BiDownArrow } from "react-icons/bi"

export default function SearchBar({ onSearch, sortState, dispatchSort }) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = e => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch?.(value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSearch?.(searchTerm)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex items-center gap-2
        px-3 h-10 w-[22rem]
        rounded-lg
        bg-[var(--c-panel)]
        border border-[var(--c-border)]
        shadow-sm
        focus-within:ring-2
        focus-within:ring-[var(--c-focus)]
      "
    >
      {/* Search icon */}
      <BsSearch className="text-sm text-[var(--c-text-muted)]" />

      {/* Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search tasks..."
        className="
          flex-1 bg-transparent
          text-[var(--c-text)]
          placeholder-[var(--c-text-muted)]
          outline-none
        "
      />

      {/* Divider */}
      <div className="h-5 w-px bg-[var(--c-border)]" />

      {/* Sort key */}
      <select
        value={sortState.key}
        onChange={e =>
          dispatchSort({ type: "SET_SORT_KEY", payload: e.target.value })
        }
        className="
          bg-transparent
          text-sm
          text-[var(--c-text)]
          outline-none
          cursor-pointer
        "
      >
        <option value="date">Date</option>
        <option value="priority">Priority</option>
        <option value="text">Title</option>
        <option value="description">Description</option>
      </select>

      {/* Sort order */}
      <button
        type="button"
        title="Toggle sort order"
        onClick={() =>
          dispatchSort({
            type: "SET_SORT_ORDER",
            payload: sortState.order === "asc" ? "desc" : "asc",
          })
        }
        className="
          p-1 rounded-md
          text-[var(--c-text)]
          hover:bg-white/5
          transition
        "
      >
        {sortState.order === "asc" ? <BiUpArrow /> : <BiDownArrow />}
      </button>
    </form>
  )
}
