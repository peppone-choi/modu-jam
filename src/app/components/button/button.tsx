"use client";
import style from "styled-components";

import { ButtonHTMLAttributes } from "react";
import React from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  $backgroundColor?: string;
  $color?: string;
  ref?: React.RefObject<HTMLButtonElement>;
  hidden?: boolean;
  step?: number;
};

const StyledButton = style.button<ButtonProps>`

  display: ${(props) => (props.hidden ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  color: ${(props) => props.$color || "black"};
  background-color: ${(props) => props.$backgroundColor || "white"};
  border: none;
  min-width: 100px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

export default function Button(props: ButtonProps) {
  const { label, onClick, $backgroundColor, $color, step, ...rest } = props;

  return (
    <React.Fragment>
      <StyledButton
        step={step}
        $backgroundColor={$backgroundColor}
        $color={$color}
        onClick={onClick}
        {...rest}
      >
        {label}
      </StyledButton>
    </React.Fragment>
  );
}
