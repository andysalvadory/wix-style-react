import * as React from 'react';
import { BaseModalLayoutProps } from '../BaseModalLayout';
import { OmitPolyfill } from '../common';
import { ButtonProps, ButtonSize } from '../Button';

export interface CustomModalLayoutProps extends BaseModalLayoutProps {
  title?: React.ReactNode;
  subtitle?: string;
  content?: string | React.ReactNode;
  primaryButtonText?: string;
  primaryButtonProps?: OmitPolyfill<ButtonProps, 'dataHook'>;
  primaryButtonOnClick?(): void;
  secondaryButtonText?: string;
  secondaryButtonProps?: OmitPolyfill<ButtonProps, 'dataHook'>;
  secondaryButtonOnClick?(): void;
  actionsSize?: ButtonSize;
  sideActions?: React.ReactNode;
  footnote?: React.ReactNode;
  width?: string;
  removeContentPadding?: boolean;
  showHeaderDivider?: boolean;
  showFooterDivider?: boolean;
  contentHideDividers?: boolean;
}

declare const CustomModalLayout: React.FC<CustomModalLayoutProps>;
export default CustomModalLayout;
