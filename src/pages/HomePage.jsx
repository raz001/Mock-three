import React, { useEffect, useState } from "react";

import { Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Add_TODO_Fun, Delete_todo, Toggle_Todo_fun } from "../redux/action";
import { Todo } from "../components/todo";
import {
  MoonIcon,
  Icon,
  SunIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
export const HomePage = () => {
  const dispatch = useDispatch();
  const [textTitle, setTextTitle] = useState("");
  const [theme, setTheme] = useState(false);
  const [todos, setTodos] = useState([]);
  const FilterArr = [];
  const Add_Todo = (event) => {
    if (event.keyCode === 13) {
      const id = Date.now();
      const obj = {
        id,
        title: textTitle,
        status: false,
      };

      dispatch(Add_TODO_Fun(obj));
    }
  };
  let todo = useSelector((store) => store.todo);
  const deleteHandler = (id) => {
    console.log(id);
    dispatch(Delete_todo(id));
  };
  const StatusHandler = (id) => {
    dispatch(Toggle_Todo_fun(id));
  };
  const completeHandler = () => {
    todo = FilterArr;
    console.log("clicked");
  };
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        background: "yellow",
        height: "100%",
      }}
    >
      <div
        style={{
          padding: "16px",
          margin: "65px",
          border: "1px solid black",borderRadius:'10px',
          color: theme ? "red" : "black",
        }}
      >
        <div>
          <div
            style={{
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>TODOS APP</h1>
            <div>
              {theme ? (
                <Icon
                  as={SunIcon}
                  onClick={() => setTheme(!theme)}
                  w={20}
                  h={20}
                />
              ) : (
                <Icon
                  as={MoonIcon}
                  onClick={() => setTheme(!theme)}
                  w={30}
                  h={30}
                />
              )}
            </div>
          </div>
        </div>
        <div>
          <div>
            <Input
              placeholder="Create new todo"
              w={500}
              fontSize={20}
              textAlign={"center"}
              borderRadius={8}
              mb={20}
              onKeyDown={Add_Todo}
              onChange={(e) => setTextTitle(e.target.value)}
            />
          </div>
          <div
            style={{
              backgroundColor: "white",
              color: theme ? "blue" : "black",
              borderRadius: "8px",
            }}
          >
           
            {todo.length > 0 &&
              todo.map((e) => {
                return (
                  <div
                    key={e.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <input
                        type="checkbox"
                        checked={e.status}
                        onChange={() => StatusHandler(e.id)}
                      />
                      <h3>{e.title}</h3>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <div>
                        <Icon as={EditIcon} />
                      </div>
                      <div onClick={() => deleteHandler(e.id)}>
                        <Icon as={DeleteIcon} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>{todo.length} item left</div>
            <div style={{ display: "flex", gap: "5px" }}>
              <div>All</div>
              <div>Active</div>
              <div onClick={() => completeHandler()}>Completed</div>
            </div>
            <div>Clear Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
