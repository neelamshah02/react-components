import React, { ReactNode, useCallback } from 'react';
import styled from 'styled-components';
import styles from '../../../common/constant';

export interface FieldProps {
  id: string;
  label: string;
  name?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  value?: string | number | readonly string[] | undefined;
  error?: string | null;
  placeholder?: string;
  helptext?: string;
  prefix?: string | ReactNode;
  maxLength?: number;
  novalidate?: boolean;
  tabIndex?: number;
  invalid?: boolean;
  outerBgColor?: string;
  onPressEnter?: (e: any) => void;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
}

const TextField: React.FC<FieldProps> = ({
  id,
  label,
  type = 'text',
  disabled,
  className,
  name,
  value,
  error,
  placeholder,
  helptext,
  prefix,
  maxLength,
  novalidate,
  tabIndex,
  invalid,
  outerBgColor,
  onPressEnter,
  onChange,
  onBlur,
}) => {
  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (onPressEnter) {
        event.stopPropagation();
        if (event.key.toLowerCase() === 'enter') {
          event.preventDefault();
          onPressEnter(event);
        }
      }
    },
    [onPressEnter]
  );

  return (
    <Container hasError={invalid || !!error} outerBgColor={outerBgColor}>
      <div className="tf-row">
        {prefix && <div className="tf-prefix">{prefix}</div>}
        <input
          id={id}
          className={className}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder || label}
          disabled={disabled}
          maxLength={maxLength}
          formNoValidate={novalidate}
          tabIndex={tabIndex}
          required
          onBlur={onBlur}
          onChange={onChange}
          onKeyPress={handleKeyPress}
        />
        <label htmlFor={id} aria-label={label}>
          <span>
            <span>{label}</span>
          </span>
        </label>
      </div>
      {helptext && <div className="tf-helptext">{helptext}</div>}
      {error && <div className="tf-error">{error}</div>}
    </Container>
  );
};

export default TextField;

interface ContainerProps {
  hasError?: boolean;
  outerBgColor?: string;
}

interface CalculatedContainerProps extends ContainerProps {
  bgColor?: string;
  borderColor?: string;
  focusBorderColor?: string;
}

const Container = styled.div.attrs<ContainerProps>(({ hasError }) => ({
  bgColor: hasError ? styles.colors.alert.errorLight : styles.colors.background.secondary,
  borderColor: hasError ? styles.colors.alert.errorDark : styles.colors.primary8,
  focusBorderColor: hasError ? styles.colors.alert.errorDark : styles.colors.primary,
}))<CalculatedContainerProps>`
  font-size: ${styles.textField.primaryFontSize};

  .tf-row {
    box-sizing: border-box;
    height: ${styles.textField.height};
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: ${styles.textField.borderRadius};
    background: ${({ bgColor }) => bgColor};
  }

  label {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid ${({ borderColor }) => borderColor};
    border-radius: ${styles.textField.borderRadius};
    pointer-events: none;

    > span {
      position: absolute;
      top: -14px;
      left: ${styles.textField.primaryFontSize};
      display: inline-block;
      padding: 0 0.5em;
      height: 25px;
      font-size: ${styles.textField.secondaryFontSize};
      color: ${({ focusBorderColor }) => focusBorderColor};
      max-width: calc(100% - 2 * ${styles.textField.primaryFontSize});

      &:before {
        content: ' ';
        display: block;
        position: absolute;
        z-index: -1;
        top: 13px;
        left: 50%;
        right: 50%;
        bottom: 11px;
        background: ${({ bgColor, outerBgColor }) => outerBgColor || bgColor};
        transition: 0.2s ease-in-out;
        transition-property: left, right;
      }

      > span {
        font-size: inherit;
        font-family: ${styles.fonts.stfMedium};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        opacity: 0;
        transform: translate(-0.25em, 1.8em) scale(1.2);
        transition-property: opacity, transform;
        transition: 0.3s ease-in-out;
      }
    }
  }

  input {
    z-index: 1;
    flex: 1;
    display: block;
    height: 100%;
    font-size: 1em;
    padding: 0 1em;
    font-family: ${styles.fonts.stfMedium};
    border-radius: ${styles.textField.borderRadius};
    border: none;
    box-shadow: none;
    outline: none;
    background: none;
    width: 100%;

    &::placeholder {
      font-family: ${styles.fonts.stfBook};
    }

    &:focus {
      outline: none;
      + label {
        border: 2px solid ${({ focusBorderColor }) => focusBorderColor};
        > span {
          top: -15px;
          left: calc(${styles.textField.primaryFontSize} - 1px);

          &:before {
            bottom: 10px;
          }
        }
      }
    }

    &:focus,
    &:valid {
      + label > span {
        position: relative;
        opacity: 1;
        color: ${({ focusBorderColor }) => focusBorderColor};
        font-size: ${styles.textField.secondaryFontSize};

        &:before {
          left: 0;
          right: 0;
        }

        > span {
          opacity: 1;
          transform: none;
        }
      }
    }

    &:hover + label,
    + label:hover {
      box-shadow: 0 0 3px ${styles.textField.hoverOutlineColor};
      cursor: text;

      > span:before {
        top: 9px;
      }
    }

    &[disabled] {
      pointer-events: none;
      background: ${styles.colors.font.text5};
      &:hover {
        box-shadow: none;
        cursor: not-allowed;
      }
      &::placeholder {
        color: ${styles.colors.font.text50};
      }
      + label {
        border-color: ${styles.colors.font.text25};
        pointer-events: none;
        &:hover {
          box-shadow: none;
          cursor: not-allowed;
        }
        > span {
          color: ${styles.colors.font.text50};
        }
      }
    }
  }

  .tf-prefix {
    z-index: 1;
    flex: 0;
    display: block;
    margin-left: 1em;
    font-family: ${styles.fonts.stfMedium};

    + input {
      padding-left: 0.3em;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .tf-error,
  .tf-helptext {
    font-size: ${styles.textField.secondaryFontSize};
    margin-top: 0.25em;
    padding: 0 ${styles.textField.primaryFontSize};
  }

  .tf-error {
    color: ${styles.colors.alert.errorDark};
    font-family: ${styles.fonts.stfMedium};
  }

  .tf-helptext {
    color: ${styles.colors.font.text85};
    font-family: ${styles.fonts.stfBookItalic};
  }
`;
