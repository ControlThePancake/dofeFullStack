import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import StarField from "scenes/homePage/pageStyle";
import Navbar from "scenes/navBar";
import Form from "./Form";

const BotPage = () => {
    const theme = useTheme();
    const isNonMoblie = useMediaQuery("(min-width: 1000px)");
    return (
        <Box>
            <StarField />
            <Navbar/>
            <Form />
           
        </Box>
    );
};

export default BotPage;
