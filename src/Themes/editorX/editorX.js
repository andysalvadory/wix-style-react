import { st, classes } from './editorX.st.css';
import { Close, Help } from './icons';

export default () => ({
  className: st(classes.root),
  icons: {
    CloseButton: {
      small: Close,
      medium: Close,
      large: Close,
    },
    BaseModalLayout: {
      HelpIcon: Help,
    },
  },
});
