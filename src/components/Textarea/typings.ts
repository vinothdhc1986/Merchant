import React from 'react';

export interface Props {
  placeholder?: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: any;
  maxlength?: number;
  id?: string;
  error?: boolean;
  errorMessage?: string;
  onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  customStyleClass?: string;
  textareaWrapperClass?: string;
  name?: string;
  rows?: number;
  cols?: number;
}
