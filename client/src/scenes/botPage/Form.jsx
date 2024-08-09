import React, { useState, useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from '@mui/material';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { updateTokens } from 'state';
import { useLocation } from 'react-router-dom';
//import io from 'socket.io-client';

function BotConfirmation({ open, handleClose, confMessage }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"Success"}</DialogTitle>
      <DialogContent>
        <DialogContentText>{confMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

const botSchema = (userTokens) => yup.object().shape({
  gameCode: yup
    .number()
    .integer('Number of bots must be an integer')
    .typeError('Game code must be a number')
    .required('Game code is required'),
  botName: yup.string().required('Bot name is required').max(15, 'Bot name must be at most 15 characters'),
  botNum: yup
    .number()
    .required('Number of bots is required')
    .typeError('Number of bots must be a number')
    .integer('Number of bots must be an integer')
    .min(1, 'Number of bots must be at least 1')
    .max(10, 'Number of bots must be 10 at most')
    .test('hasEnoughTokens', 'Not enough tokens', value => {
      const requiredTokens = value;
      return userTokens >= requiredTokens;
    }),
});

const initialValues = {
  gameCode: '',
  botName: '',
  botNum: "",
};

const BotForm = () => {
  const location = useLocation();
  const botTypeFromState = location.state?.botType.replace(' Bot', ''); // Remove ' Bot' from the botType if it exists
  const [pageType, setPageType] = useState(botTypeFromState?.toLowerCase().replace(/\s+/g, '') || 'kahoot');
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery(theme.breakpoints.up('sm'));
  const token = useSelector((state) => state.token);
  const authToken = token;
  //const [sessionId, setSessionId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  //const [socket, setSocket] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confMessage, setMessage] = useState('');

  const handleOpenDialog = (message) => {
    setMessage(message);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const _id = user._id;

  const botInit = async (values, onSubmitProps) => {
    const sendData = { values, _id, pageType };
    const savedUserResponse = await fetch(`https://botpulse.xyz/users/bot-prep`, {
      method: 'PATCH',
      headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(sendData),
    });

    if (!savedUserResponse.ok) {
      console.error("Failed to initialise bot:", savedUserResponse.statusText);
      return;
    }

    const data = await savedUserResponse.json();
  
    onSubmitProps.resetForm();
    //  setSessionId(data.sessionId);
    botLaunch(values, data, _id, pageType, authToken);
  };

  const botLaunch = async (values, data, _id, pageType, authToken) => {
    const sessionId = data.sessionId;

    const sendData = { values, sessionId, _id, pageType, authToken };
    const launchResponse = await fetch(`https://botpulse.xyz/users/bot-launch`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(sendData),
    });

    if (launchResponse.ok) {
      handleOpenDialog("Bot successfully initialised");
    } else {
      console.error("Failed to launch bot:", launchResponse.statusText);
    }

  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await botInit(values, onSubmitProps);
    dispatch(updateTokens(-values.botNum));
  }

  return (
    <>
      <Box p="1rem 6%" textAlign="center" width="100%">
        <Typography fontWeight="bold" fontSize="clamp(1.5rem, 2.5rem, 2.75rem)" color="primary">
          {pageType.charAt(0).toUpperCase() + pageType.slice(1)} Bot
        </Typography>
        {/*{statusMessage && (
          <Typography color="secondary" style={{ marginTop: '20px' }}>
            Status: {statusMessage}
          </Typography>
        )}*/}
      </Box>
      <Box
        width={isNonMobile ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h4" sx={{ mb: "1.5rem" }}>
          Try the {pageType.charAt(0).toUpperCase() + pageType.slice(1)} bot
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={botSchema(user.tokenNum)}
          onSubmit={handleFormSubmit}
          validateOnMount
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box display="grid" gap="30px" gridTemplateColumns="repeat(1, minmax(0, 1fr))">
                <TextField
                  name="gameCode"
                  label="Game Code"
                  value={values.gameCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.gameCode && !!errors.gameCode}
                  helperText={touched.gameCode && errors.gameCode}
                  fullWidth
                  autoComplete="gameCode"
                />
                <TextField
                  name="botName"
                  label="Bot Name"
                  value={values.botName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.botName && !!errors.botName}
                  helperText={touched.botName && errors.botName}
                  fullWidth
                  autoComplete="botName"
                />
                <TextField
                  name="botNum"
                  label="Bot Number"
                  value={values.botNum}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.botNum && !!errors.botNum}
                  helperText={touched.botNum && errors.botNum}
                  fullWidth
                  autoComplete="botNum"
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    mt: '2rem',
                    display: 'block',
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: 'ellipsis',
                  }}
                >
                  This will cost {(!values.botNum || Number(values.botNum) === 0) ? 1 : values.botNum} token(s)<br></br>
                  <a href='/tokenShop' style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}>Get more tokens</a>
                </Typography>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ m: '2rem 0', p: "1rem " }}
                >
                  LAUNCH BOT
                </Button>
                <Typography
                  onClick={() => setPageType(pageType === 'kahoot' ? 'quizizz' : 'kahoot')}
                  sx={{
                    mt: '1rem',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    '&:hover': {
                      color: theme.palette.primary.light,
                    },
                  }}
                >
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
      <BotConfirmation open={dialogOpen} handleClose={handleCloseDialog} confMessage={confMessage} />
    </>
  );
};

export default BotForm;