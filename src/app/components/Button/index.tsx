"use client";
import styles from "./Button.module.css";

interface IProps {
  text: string;
  type?: "primary" | "secondary";
  onClick: () => void;
  width?: string;
  height?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Button = ({
  text,
  type = "primary",
  onClick,
  width,
  height,
  fullWidth = false,
  disabled = false,
  className = "",
  style = {},
}: IProps) => {
  return (
    <button
      className={`${styles.button} ${styles[type]} 
        ${disabled ? styles.disabled : ""} 
        ${className}`.trim()}
      onClick={disabled ? undefined : onClick}
      style={{
        width: fullWidth ? "100%" : width,
        height,
        ...style,
      }}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
