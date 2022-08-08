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
  loading?: boolean;
}

const Button: FC<ButtonProps & Omit<HTMLAttributes<HTMLButtonElement>, 'type'>> = ({
  text,
  children,
  type = 'default',
  disabled,
  htmlType,
  onClick,
  ...rest
}) => {
  return (
    <ButtonStyled type={htmlType} onClick={onClick} buttonType={type} disabled={disabled} {...rest}>
      {text || children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button<{ buttonType: ButtonType; disabled: boolean | undefined }>`
  border-radius: 4px;
  height: 48px;
  border-color: transparent;
  font-family: ${styles.fonts.stfMedium};
  font-size: 2rem;
  cursor: pointer;
  padding: 0 5rem;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

  ${({ buttonType, disabled }) => {
    if (disabled)
      return css`
        pointer-events: none;
        color: ${styles.colors.font.text85};
        background-color: ${styles.colors.font.text25};
      `;
    switch (buttonType) {
      case 'primary':
        return css`
          background-color: ${styles.colors.primary};
          color: ${styles.colors.background.secondary};

          &:hover {
            background-color: ${styles.colors.background.darkBlue};
          }
        `;

      case 'ghost':
        return css`
          background-color: transparent;
          color: ${styles.colors.primary};
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
          background-color: ${styles.colors.background.white};
          color: ${styles.colors.primary};
          border: 2px solid ${styles.colors.primary};

          &:hover {
            background-color: ${styles.colors.background.light};
          }
        `;
    }
  }}
`;

export default Button;
