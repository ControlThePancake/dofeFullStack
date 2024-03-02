import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import StarField from "scenes/homePage/pageStyle";
import Navbar from "scenes/navBar";
const KahootPage = () => {
    const theme = useTheme();
    const matches = useMediaQuery("(min-width: 1000px)");
    return(
        <Box>
            <StarField />
            <Box 
            p="1rem 6%" 
            textAlign="center"
            width="100%"
            >
                <Navbar/>
                <Typography fontWeight="500" variant="h5" sx={{mb: "1.5rem"}}>
                    Kahoot Bot
                </Typography>
            </Box>
    
    
    
    
    
    
    
    
    
    
    
        </Box>
    )
}
export default KahootPage;