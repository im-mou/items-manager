// Theme

const spacingUnit = 4;

/**
 * Get a spacing value based on the spacing unit
 * @param multiplier factor of increase
 * @returns multiplication result with the spacing unit
 */
const spacing = (multiplier: number) => {
    return spacingUnit * multiplier;
};

const theme = {
    palette: {
        primary: {
            main: '#4FB477',
            light: '#83DCA6',
        },
        secondary: {
            main: '#F4D06F',
            light: '#F4D06F',
        },
        error: {
            main: '#c74949',
        },
        white: '#fff',
        gray: {
            '100': '#333333',
            '300': '#5A5A5A',
            '500': '#939393',
            '700': '#D3D3D3',
            '900': '#F6F6F6',
        },
    },
    fontfamily: {
        primary: '\'Red Rose\', "Helvetica", "Arial", sans-serif',
        secondary: "'Montserrat', sans-serif",
    },
    spacing: spacing,
};

export default theme;
