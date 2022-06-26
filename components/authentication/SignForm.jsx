import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Avatar,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import Spinner from "../Spinner/Spinner";
import { loginSuccess, signInUser } from "../../stores/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary?.main,
  },
  margin: {
    margin: theme.spacing(3),
  },
  padding: {
    padding: theme.spacing(2),
  },
  paper: {
    margin: theme.spacing(3),
    padding: theme.spacing(2),
  },
  google: {
    borderRadius: theme.spacing(2),
    margin: theme.spacing(1),
  },
  container: {
    display: "flex !important",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  backButton: {
    float: "right",
  },
}));
const SignForm = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, status } = useSession();

  const { loadingState, errorMess } = useSelector((state) => ({
    loadingState: state.auth.isLoading,
    errorMess: state.auth.authenticationError,
  }));
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = (path) => {
    router.push(path);
  };
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const signUpObj = {
        email: values.email,
        name: "Admin",
        imageUrl: "https://source.unsplash.com/random/900X700/?avatar",
        balance_points: 10000,
        wishlist: [],
        cards_gifted: [],
        cards_received: [],
        role: "admin",
      };
      dispatch(signInUser(signUpObj, "normal"));
    },
  });

  React.useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  React.useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
      dispatch(loginSuccess(data.user));
    }
  }, [status, router, data, dispatch]);
  const handelError = (error) => {
    toast.error(
      "Failed to logged in! Please tyr again with your google account"
    );
  };

  const signInWithGoogle = () => {
    signIn("google", { callbackUrl: "/" }).catch(handelError);
  };
  return (
    <Container maxWidth="sm" component="main" className={classes.container}>
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <Paper className={classes.paper} elevation={2}>
          <Grid container spacing={2} align="center" justifyContent="center">
            <Grid item xs={12} sm={12} md={12}>
              {/* Back button */}
              <IconButton
                color="default"
                aria-label="back button"
                className={classes.backButton}
                onClick={() => navigate("/")}
              >
                <ArrowBackIcon />
              </IconButton>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h4">Login</Typography>
            </Grid>
            <Grid item xs={12}>
              <form
                onSubmit={formik.handleSubmit}
                className={classes.form}
                noValidate
              >
                {errorMess && <Alert severity="error">{errorMess}</Alert>}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  placeholder="User Email Id"
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="*******"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  autoComplete="current-password"
                />
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  loading={isLoading}
                  color="primary"
                  endIcon={<KeyboardArrowRight />}
                  className={classes.submit}
                >
                  Log in
                </LoadingButton>
              </form>
              <hr className="hr-text" data-content="OR" />
              <LoadingButton
                type="button"
                fullWidth
                variant="contained"
                loading={false}
                color="secondary"
                endIcon={<GoogleIcon />}
                className={classes.submit}
                onClick={signInWithGoogle}
              >
                Sign in with Google
              </LoadingButton>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default SignForm;
