import React from 'react';
import ThemeProvider from '../../ThemeProvider';
import editorXTheme from './editorX';
import { runTests as CustomModalLayoutTests } from '../../CustomModalLayout/test/CustomModalLayout.visual';

const themeName = 'Editor-X';
const testWithTheme = test => {
  return (
    <ThemeProvider theme={editorXTheme()}>
      <div>{test}</div>
    </ThemeProvider>
  );
};

CustomModalLayoutTests({ themeName, testWithTheme });
