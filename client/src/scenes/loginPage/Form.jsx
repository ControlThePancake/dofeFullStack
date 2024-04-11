import { useState } from "react";
import{
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";

const registerScheme = yup.object().shape({
    email: yup.string().email("Invalid Email").required("required"),
    firstName: yup.string().required("required"),
    lastName: yup.string(),
    password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid Email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister ={
    email: "",
    firstName: "",
    lastName: "",
    password: "",
}

const initialValuesLogin ={
    email: "",
    password: "",
}

function ErrorDialog({ open, handleClose, errorMessage }) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    );
  }

const Form = () => {
    const[pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleOpenErrorDialog = (message) => {
        setErrorMessage(message);
        setErrorDialogOpen(true);
    };

    const handleCloseErrorDialog = () => {
        setErrorDialogOpen(false);
    };

    const register = async (values, onSubmitProps) => {

    const response = await fetch("http://192.168.0.133:3001/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(values),
    });

    const errorData = await response.json();

    if (!response.ok) {
        // Extract error message from response
        
        handleOpenErrorDialog(errorData.msg || "User already exists");
        onSubmitProps.resetForm();
    } else {
        // Successfully registered
        onSubmitProps.resetForm();
        setPageType("login")
    }
};  
        

    const login = async (values, onSubmitProps) => {
        const response = await fetch("http://192.168.0.133:3001/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            // Extract error message from response
            const errorData = await response.json();
            handleOpenErrorDialog(errorData.msg || "Invalid login credentials.");
           
        } else {
            // Successfully logged in
            const loggedIn = await response.json();
            
            dispatch(setLogin({user: loggedIn.user, token: loggedIn.token}));
            navigate("/home");
        }
        onSubmitProps.resetForm();
    };
    
    const handleFormSubmit = async(values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) await register(values, onSubmitProps);
    };

    return(
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerScheme}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4,minmax(0,1fr))"
                        sx={{
                            "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                name="firstName"
                                label="First Name"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2"}}
                                autoComplete="firstname"
                            />

                                <TextField
                                name="lastName"
                                label="Last Name"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                                sx={{ gridColumn: "span 2"}}
                                autoComplete="lastname"
                            />
                                
                            </>
                        )}

                        <TextField
                            name="email"
                            label="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4"}}
                            autoComplete="email"
                        />

                        <TextField
                            name="password"
                            label="Password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 4"}}
                            autoComplete="password"
                        />  

                    </Box>

                    {/*Buttons*/}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main, // corrected backgroundColor typo
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >
                            {isLogin ? "LOGIN": "REGISTER"}
                        </Button>

                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register": "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&: hover":{
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                }
                            }}
                        >
                            {isLogin ? "Don't have an account? Signup here"
                            : "Already have an account? Login here"}

                        </Typography>
                        
                    </Box>

                    <ErrorDialog
                        open={errorDialogOpen}
                        handleClose={handleCloseErrorDialog}
                        errorMessage={errorMessage}
                    />

                </form>
            )}

        </Formik>
    )
    };

export default Form;

