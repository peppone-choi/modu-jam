import { MouseEventHandler, useState } from "react";
import Button from "../button/button";
import CheckBox from "../checkbox/checkBox";
import cn from "classnames/bind";
import styles from "./todoItem.module.scss";

const cx = cn.bind(styles);

type TodoItemProps = {
  label?: string;
  checked?: boolean;
  onEdit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function TodoItem(props: TodoItemProps) {
  const { label, checked, onEdit, onDelete } = props;
  const [check, setCheck] = useState(checked);
  return (
    <div className={cx("Wrapper")}>
      <CheckBox
        checked={checked}
        onChange={() => {
          setCheck(!check);
        }}
      />
      <span className={cx("Text", { check })}>{label}</span>
      <Button label="삭제" onClick={onDelete} $color="red" />
      <Button label="수정" onClick={onEdit} $color="blue" />
    </div>
  );
}
