import React from 'react';
import { Box, useTheme } from '@mui/material';

const GradientBackground = ({ children }) => {
    const theme = useTheme();

    // Define vibrant gradient colors for light and dark modes
    const gradientColors = {
        light: ['#FFD700', '#FFDAB9', '#FF6347', '#FFE4C4'],
        dark: ['#191970', '#483D8B', '#2E8B57', '#556B2F']
    };

    // Create a gradient background based on the theme mode
    const getGradient = (mode) => `linear-gradient(to bottom right, ${gradientColors[mode].join(', ')})`;

    // Styles for the animated gradient background
    const pageStyle = {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: getGradient(theme.palette.mode),
        backgroundSize: '300% 300%',
        animation: 'gradient 15s ease infinite',
        '@keyframes gradient': {
            '0%': { backgroundPosition: '0% 0%' },
            '50%': { backgroundPosition: '100% 100%' },
            '100%': { backgroundPosition: '0% 0%' },
        },
        color: theme.palette.text.primary,
    };

    return (
        <Box sx={pageStyle}>
            {children}
        </Box>
    );
}

export default GradientBackground;
