import { Box , Typography, useMediaQuery, useTheme } from "@mui/material";
import StarField from "scenes/homePage/pageStyle";
import Navbar from "scenes/navBar";
import React from 'react';
import { useSelector } from "react-redux";

const TokenShop = () => {
    const theme = useTheme();
    const isNonMobile = useMediaQuery(theme.breakpoints.up('md'));
    const user = useSelector((state) => state.user);
    console.log(user._id);
    return (
        <Box>
            <StarField />
            <Navbar />
            <Box p="1rem 6%" textAlign="center" width="100%">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1.5rem, 3rem, 3.375rem)"
                    textAlign="center"
                    color = "primary"
                >
                    Token Shop
                </Typography>
            </Box>
            <Box gap="30px"
                width={isNonMobile ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                bgcolor={theme.palette.background.alt}
            >
                <stripe-pricing-table 
                    pricing-table-id="prctbl_1OrlRpJr7oV87jisK5RBrxyk"
                    publishable-key="pk_live_51Oq1gWJr7oV87jisi1WSnv2TvNzKYG2G2cVrqqM1TFLYyiKcIL7RrSZY3bCcyrSI9wuQ2uIrpOXcIBhbLUp55Mez00rctwezyH"
                    client-reference-id={`${user._id}`}
                    >
                </stripe-pricing-table>
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
    );
};

export default TokenShop;

