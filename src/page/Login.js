import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import { useFormik } from "formik";
import swal from "sweetalert2";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../redux/actions/application";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("Format email salah")
        .required("Silahkan masukkan email!"),
      password: yup.string().required("Silahkan masukkan password!"),
      role: yup.string().required("Silahkan pilih login sebagai!"),
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      dispatch(login(values, history));
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Penilaian Siswa
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            autoFocus
          />
          {formik.errors.email && formik.touched.email && (
            <Typography variant="subtitle2" align="left">
              <p>{formik.errors.email}</p>
            </Typography>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            autoComplete="current-password"
          />
          {formik.errors.password && formik.touched.password && (
            <Typography variant="subtitle2" align="left">
              <p>{formik.errors.password}</p>
            </Typography>
          )}
          <Box mt={2}>
            <Typography>Login sebagai</Typography>
            <Box mt={1}>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="position"
                  name="role"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="admin"
                    control={<Radio color="primary" />}
                    label="Admin"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="teacher"
                    control={<Radio color="primary" />}
                    label="Guru"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="student"
                    control={<Radio color="primary" />}
                    label="Siswa"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
              {formik.errors.role && formik.touched.role && (
                <Typography variant="subtitle2" align="left">
                  <p>{formik.errors.role}</p>
                </Typography>
              )}
            </Box>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"Buat akun admin"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
