"use client";

import cn from "classnames/bind";
import styles from "./textInput.module.scss";
import { FormEvent, useEffect, useRef, useState } from "react";
const cx = cn.bind(styles);

type TextInputProps = {
  values?: string;
  label?: string;
  placeholder?: string;
  ref?: React.RefObject<HTMLInputElement>;
  className?: string;
  step?: number;
};

export default function TextInput(props: TextInputProps) {
  const { label, placeholder, ref, step, values } = props;
  const [value, setValue] = useState(values || "");
  const inputDivRef = useRef<HTMLDivElement>(null);
  const inputSpanRef = useRef<HTMLSpanElement>(null);
  const placeholderRef = useRef<HTMLSpanElement>(null);
  const handleChange = (e: FormEvent<HTMLDivElement>) => {
    const input = e.target as HTMLDivElement;
    if (input) {
      setValue(input.innerHTML);
    }
    // 커서 위치 조정
    requestAnimationFrame(() => {
      const range = document.createRange();
      const textNode = input.childNodes[0];
      if (textNode) {
        range.setStart(textNode, textNode.textContent?.length || 0);
        range.setEnd(textNode, textNode.textContent?.length || 0);
        const sel = window.getSelection();
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    });
  };
  useEffect(() => {
    if (!inputDivRef.current || !placeholderRef.current) {
      return;
    }
    const input = inputDivRef.current;
    const inputSpan = inputSpanRef.current;
    const placeholder = placeholderRef.current;
    if (input && inputSpan && placeholder) {
      inputSpan.style.display = "none";
      placeholder.style.display = "block";
    } else {
      console.log("error");
    }
    if (input) {
      input.innerHTML = value || "";
    }
    setValue(value || "");
  }, [value]);

  useEffect(() => {
    if (!inputDivRef.current || !placeholderRef.current) {
      return;
    }
    const input = inputDivRef.current;
    if (input) {
      input.innerHTML = values || "";
    }
    const inputSpan = inputSpanRef.current;
    const placeholder = placeholderRef.current;
    if (placeholder && inputSpan) {
      inputSpan.style.display = "none";
      placeholder.style.display = "block";
    }
    console.log("step", step);
    setValue(values || "");
  }, [step]);

  const handleClick = () => {
    if (!inputDivRef.current || !placeholderRef.current) {
      return;
    }
    const input = inputDivRef.current;
    const inputSpan = inputSpanRef.current;
    const placeholder = placeholderRef.current;
    if (input && inputSpan && placeholder) {
      input.focus();
      inputSpan.style.display = "block";
      placeholder.style.display = "none";
    } else {
      console.log("error");
    }
  };

  return (
    <label className={cx("Wrapper")}>
      {label}
      <div
        className={cx("TextInput")}
        suppressContentEditableWarning
        contentEditable
        ref={inputDivRef}
        onInput={handleChange}
        onClick={handleClick}
      >
        <span className={cx("Value")} ref={inputSpanRef}>
          {value}
        </span>
        <span className={cx("Placeholder")} ref={placeholderRef}>
          {placeholder}
        </span>
      </div>
      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        hidden
        value={value}
        ref={ref}
      ></input>
    </label>
  );
}
