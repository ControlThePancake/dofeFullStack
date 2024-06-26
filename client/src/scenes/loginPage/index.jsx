import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";


const LoginPage = () => {
    const theme = useTheme();
    const isNonMoblie = useMediaQuery("(min-width: 1000px)");
    return(
        <Box>
            <Box width="100%" backgroundcolor={theme.palette.background.alt} p="1rem 6%" textAlign="center">
                <Typography
                fontWeight="bold"
                fontSize="clamp(1rem, 2rem, 2.25rem)"
                color="primary"
                >
                BotPulse
                </Typography>
            </Box>
            <Box
                width={isNonMoblie ? "50%" : "93%"}
                p = "2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundcolor={theme.palette.background.alt}
            >
                <Typography fontWeight="500" variant="h4" sx={{mb: "1.5rem"}}>
                    Welcome to BotPulse, still in development
                </Typography>
                <Form />
            </Box>
            
        </Box>
    )
}
export default LoginPage;