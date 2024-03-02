import React from 'react';
import { Typography, Box, useMediaQuery, useTheme } from '@mui/material';
import Navbar from 'scenes/navBar';
import StarField from 'scenes/homePage/pageStyle';

const AboutMePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery("(min-width: 1000px)");

    // Function to convert hex color to RGB format
    const hexToRgb = (hex) => {
        // Remove '#' if present
        hex = hex.replace('#', '');
        // Parse hex to RGB
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        // Return RGB values as string
        return `${r}, ${g}, ${b}`;
    };

    return (
        <>
            <StarField/>
            <Navbar />
            <Box>
                <Box width="100%" p="1rem 6%" textAlign="center">
                    <Typography
                        fontWeight="bold"
                        fontSize="clamp(1.5rem, 3rem, 3.375rem)"
                        sx={{
                            color: theme.palette.primary.main
                        }}
                    >
                        About Me
                    </Typography>
                </Box>
                <Box
                    width="100%"
                    p="1rem 6%"
                    display="flex"
                    justifyContent="center"
                    
                >
                    <Typography
                        fontSize="clamp(1rem, 2rem, 2.25rem)"
                        width={isMobile ? "60%" : "90%"}
                        height="100%"
                        padding="1rem"
                        sx={{
                            backgroundColor: `rgba(${hexToRgb(theme.palette.primary.light)}, 0.8)`,
                            borderRadius: "1rem",
                        }}
                    >
                        Hi, <br></br> <br></br>

                        This is a website made to launch bots and do math homework for you (specifically DrFrost)<br></br><br></br>

                        Despite this website being a bit of a shithole rn, im pretty happy with how its coming along (I procrastinated for ages)<br></br><br></br>

                        This is a project im making in my spare time to learn some web dev stuff and pray that I get millions in donations (<a href="#" style={{color: theme.palette.primary.main, textDecoration: "none"}}>pls donate</a>)<br></br><br></br>
                        
                        To actually use the thing (probably the reason you came to this page), just click on one the bots on the home page, enter your bot name and the number of bots you have. Depending on the number of bots you will be charged a certain amount of tokens. Tokens can be bought or you can ask me to give you some more ig <br></br><br></br>

                        Anyway congrats for making it this far, have some free tokens ig (still in development)
                        
                    </Typography>
                </Box>
                <Box sx={{
                    py: '2rem',
                    textAlign: 'center',
                    color: theme.palette.neutral.dark,
                }}>
                    <Typography variant="h5" fontWeight="500">
                        Email: <a href="mailto:admin@botpulse.xyz" style={{ color: theme.palette.primary.main }}>admin@botpulse.xyz</a>
                    </Typography>
                    <Typography variant="h5" fontWeight="500">
                        © 2024 BotPulse. All rights reserved.
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default AboutMePage;
