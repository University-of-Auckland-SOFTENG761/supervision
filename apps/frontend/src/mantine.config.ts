import { MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
  primaryColor: 'red',
  primaryShade: 5,
  colors: {
    red: [
      '#EDD9DE',
      '#EDD9DE',
      '#E3B9C3',
      '#E097A9',
      '#E3728D',
      '#EF476F',
      '#D93E63',
      '#C13A5A',
      '#A24058',
      '#894353',
    ],
    yellow: [
      '#F7F1E5',
      '#F7F1E5',
      '#F7F1E5',
      '#F1E2BF',
      '#F3D795',
      '#FFD166',
      '#ECBF55',
      '#D7AD4A',
      '#C29C42',
      '#A58845',
    ],
    green: [
      '#99C9BD',
      '#7DC5B3',
      '#5EC7AC',
      '#3BCFA9',
      '#1DD5A5',
      '#06D6A0',
      '#18AE87',
      '#238F73',
      '#297763',
      '#2C6456',
    ],
    blue: [
      '#83AAB8',
      '#69A2B5',
      '#4D9CB7',
      '#3895B4',
      '#248FB2',
      '#118AB2',
      '#1E7592',
      '#256479',
      '#295665',
      '#2A4B56',
    ],
    'deep-blue': [
      '#314C55',
      '#284751',
      '#20434F',
      '#17404D',
      '#0F3D4C',
      '#073B4C',
      '#0D323E',
      '#102B33',
      '#11252B',
    ],
  },
  fontFamily: 'Open Sans, sans-serif',
  defaultRadius: 'md',
  components: {
    Navbar: {
      defaultProps: {
        width: { base: 60 },
      },
    },
  },
};

export default theme;
