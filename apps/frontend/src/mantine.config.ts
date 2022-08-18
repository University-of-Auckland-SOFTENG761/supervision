import { MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
  defaultRadius: 'md',
  components: {
    Header: {
      defaultProps: {
        height: 60,
      },
    },
  },
};

export default theme;
