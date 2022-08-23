import React, { FC, HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import styles from '../../../common/constant';

export type ButtonType = 'default' | 'ghost' | 'primary' | 'danger';

export interface ButtonProps {
  text?: string;
  children?: React.ReactNode;
  type?: ButtonType;
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  color?: string | undefined;
  backgroundColor?: string | undefined;
}

const Button: FC<ButtonProps & Omit<HTMLAttributes<HTMLButtonElement>, 'type'>> = ({
  text,
  children,
  type = 'default',
  disabled,
  htmlType,
  onClick,
  color,
  backgroundColor,
  ...rest
}) => {
  return (
    <ButtonStyled type={htmlType} onClick={onClick} color={color} backgroundColor={backgroundColor} buttonType={type} disabled={disabled} {...rest}>
      {text || children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button<{ buttonType: ButtonType; disabled: boolean | undefined; color: string | undefined; backgroundColor: string | undefined }>`
  border-radius: 4px;
  height: 48px;
  border-color: transparent;
  font-family: ${styles.fonts.stfMedium};
  font-size: 2rem;
  cursor: pointer;
  padding: 0 5rem;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  ${({ buttonType, disabled, color, backgroundColor }) => {
    if (disabled)
      return css`
        pointer-events: none;
        color: ${styles.colors.font.text85};
        background-color: ${styles.colors.font.text25};
      `;
    switch (buttonType) {
      case 'primary':
        return css`
          background-color: ${backgroundColor ? backgroundColor : styles.colors.primary};
          color: ${color ? color : styles.colors.background.secondary};
        `;

      case 'ghost':
        return css`
          background-color: transparent;
          color: ${color ? color : styles.colors.primary};
          border: 2px solid ${styles.colors.primary};
        `;
      case 'danger':
        return css`
          color: ${styles.colors.background.secondary};
          background-color: ${styles.colors.alert.errorDark};
        `;
      default:
      case 'default':
        return css`
          background-color: #0070ad;
          color: white;
          border: 1px solid ${styles.colors.primary};
          border-radius: 12px;
        `;
    }
  }}
`;

export default Button;
