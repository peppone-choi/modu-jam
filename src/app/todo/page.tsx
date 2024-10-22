"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../components/button/button";
import TextInput from "../components/textInput/textInput";
import cl from "classnames/bind";
import styles from "./todoPage.module.scss";
import TodoItem from "../components/TodoItem/todoItem";

const cx = cl.bind(styles);

export default function TodoPage() {
  const [todo, setTodo] = useState<
    Array<{
      id: number;
      value: string;
      checked: boolean;
    }>
  >([]);
  const addTodo = (value: string) => {
    setTodo([...todo, { id: todo.length, value, checked: false }]);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const [editedId, setEditedId] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [step, setStep] = useState(1);
  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const input = inputRef.current;
    if (input) {
      addTodo(input.value);
      setStep((prev) => prev + 1);
    }
  };

  const handleDelete = (id: number) => {
    setTodo(todo.filter((item) => item.id !== id));
  };

  const handleEdit = (id: number, value: string) => {
    setTodo(
      todo.map((item) => (item.id === id ? { ...item, value: value } : item)),
    );
    setEditedId(null);
    setStep((prev) => prev + 1);
  };
  return (
    <div className={cx("Container")}>
      <div className={cx("Todo")}>
        {todo.map((item) => (
          <TodoItem
            key={item.id}
            label={item.value}
            checked={item.checked}
            onEdit={(e) => {
              console.log(item.value);
              setStep((prev) => prev + 1);
              setIsEditMode(true);
              setEditedId(item.id);
              if (!inputRef.current || !editButtonRef.current) {
                return;
              }
              inputRef.current.value = item.value;
            }}
            onDelete={(e) => {
              handleDelete(item.id);
              setStep((prev) => prev + 1);
            }}
          />
        ))}
      </div>
      <div className={cx("Wrapper")}>
        <TextInput
          label="할 일"
          placeholder="할 일을 입력하세요"
          step={step}
          values={
            editedId !== null
              ? todo.find((item) => item.id === editedId)?.value
              : ""
          }
          ref={inputRef}
          className={cx("Input")}
        />
        {isEditMode ? (
          <Button
            ref={editButtonRef}
            label="수정"
            onClick={(e) => {
              e.preventDefault();
              if (!inputRef.current) {
                return;
              }
              if (editedId === null) {
                return;
              }
              handleEdit(editedId, inputRef.current.value);
              setIsEditMode(false);
            }}
            $backgroundColor="BLUE"
            $color="white"
            step={step}
          />
        ) : (
          <Button
            ref={addButtonRef}
            label="추가"
            onClick={handleAdd}
            $backgroundColor="GREEN"
            $color="WHITE"
            step={step}
          />
        )}
      </div>
    </div>
  );
}
