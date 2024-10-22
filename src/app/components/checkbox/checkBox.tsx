"use client";

import { ChangeEvent, useState } from "react";
import cn from "classnames/bind";
import styles from "./checkBox.module.scss";
const cx = cn.bind(styles);

type CheckBoxProps = {
  label?: string;
  checked?: boolean;
  onChange?: () => void;
};

export default function CheckBox(props: CheckBoxProps) {
  const { label } = props;
  const [check, setCheck] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.checked);
    if (props.onChange) {
      props.onChange();
    }
  };

  return (
    <label className={cx("Label")}>
      <div className={cx("CheckBox", { check })}></div>
      {label}
      <input
        type="checkbox"
        checked={check}
        hidden
        onChange={handleChange}
      ></input>
    </label>
  );
}
