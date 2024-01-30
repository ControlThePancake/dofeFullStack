import React from 'react';
import NavBar from "scenes/navBar";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, Grid, Button, useTheme, useMediaQuery } from "@mui/material";

const HomePage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

    const handleCardClick = (botName) => {
        console.log(`Clicked on ${botName}`);
        if (botName === "Blooket Bot") { return; }
        let thing = botName.toLowerCase().replace(/\s+/g, '');
        navigate(`/${thing}`);
    };


    return (
        <Box sx={pageStyle}>
            <NavBar />

            <Box flexGrow={1} p={isMobile ? "1rem" : "2rem"} display="flex" flexDirection="column" justifyContent="center">
                <Box textAlign={isMobile ? "center" : "left"}>
                    <Typography variant="h3" fontWeight="bold"  gutterBottom sx={{ fontSize: isMobile ? '2rem' : '3rem' }}>
                        Choose a bot and enjoy
                    </Typography>
                    <Button onClick={() =>{navigate("/aboutUs")}}>
                        Learn more
                    </Button>
                </Box>

                <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
                    {["Kahoot Bot", "Quizziz Bot", "Blooket Bot"].map((botName, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <Card sx={{
                                height: '10rem', // Make the cards square
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: botName === "Blooket Bot" ? theme.palette.action.disabledBackground : theme.palette.primary.main,
                                '&:hover': {
                                    backgroundColor: botName === "Blooket Bot" ? theme.palette.action.disabledBackground : theme.palette.primary.main,
                                },
                            }}                
                            onClick={() => handleCardClick(botName)}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                                        {botName}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Button variant="contained" disabled sx={{
                    color: theme.palette.primary.contrastText,
                    fontSize: '1.5rem',
                    padding: '1.5rem 3rem',
                    maxWidth: '80%',
                    alignSelf: 'center',
                    mt: 4,
                }}>
                    Homework Solver For Math - Coming Soon!!
                </Button>
            </Box>

            <Box sx={{
                py: '2rem',
                textAlign: 'center',
                color: theme.palette.primary.contrastText,
                mt: 'auto', // Push the footer to the bottom
            }}>
                <Typography variant="h5" fontWeight="500">
                    Email: <a href="mailto:admin@botpulse.xyz" style={{ color: theme.palette.primary.contrastText }}>admin@botpulse.xyz</a>
                </Typography>
                <Typography variant="h5" fontWeight="500">
                    © 2024 BotPulse. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
}

export default HomePage;