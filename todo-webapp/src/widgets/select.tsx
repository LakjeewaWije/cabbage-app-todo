import React from "react";
import { sortTodo } from "../counterSlice";
import { useAppDispatch } from "../hook";
export default function SelectFilter() {
    const dispatch = useAppDispatch();
    return (
<select
        defaultValue={1}
        onChange={(event) => {
          console.log("Slelcting ", event.target.value);
          dispatch(sortTodo({ type: event.target.value }));
        }}
      >
        <option value="asc">End date ascending</option>
        <option value="desc">End date desc</option>
        <option value={1}>Old to new</option>
        <option value={-1}>New to old</option>
      </select>
    )
}