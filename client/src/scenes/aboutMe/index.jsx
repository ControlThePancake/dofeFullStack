import React from 'react';
import { Typography, Button, useMediaQuery, Box, useTheme } from '@mui/material';
import Navbar from 'scenes/navBar';

const AboutMePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery("(min-width: 1000px)");

    return(
        <>
            <Navbar />
            <Box>
            <Box width="100%" p="1rem 6%" textAlign="center">
                <Typography
                fontWeight="bold"
                fontSize="clamp(1.5rem, 3rem, 3.375rem)"
                sx={{
                    color: theme.palette.primary.contrastText
                }}
                >
                About Me
                </Typography>
            </Box>

            </Box>
        </>

    )
}
export default AboutMePage;