import { useEffect, useState } from 'react';
import StyledTodosViewForm from './TodosViewForm.styled';
export default function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  return (
    <StyledTodosViewForm
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <label htmlFor="">Search Todos</label>
        <input
          type="text"
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
        />
        <button onClick={() => setQueryString('')} type="button">
          Clear
        </button>
      </div>
      <label htmlFor="sortoptions">Sort by</label>
      <select
        name=""
        id="sortoptions"
        onChange={(e) => setSortField(e.target.value)}
      >
        <option value="title">Title</option>
        <option value="createdTime">Time added</option>
      </select>
      <label htmlFor="direction">Direction</label>
      <select
        name=""
        id="direction"
        onChange={(e) => setSortDirection(e.target.value)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </StyledTodosViewForm>
  );
}
