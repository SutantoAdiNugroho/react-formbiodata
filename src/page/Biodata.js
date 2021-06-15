import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";

import { postBio, RESP_SUCCESS } from "../redux/actions/application";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  buttonRes: {
    marginRight: 5,
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  root: {
    flexGrow: 1,
  },
  titleGutter: {
    marginTop: "30px",
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AddressForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const ModalCreating = () => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const formik = useFormik({
      initialValues: {
        name: "",
        email: "",
        phoneNumber: "",
        gender: "",
        password: "",
        passwordConfirmation: "",
        onsite: "",
      },
      validationSchema: yup.object({
        name: yup.string().required("Silahkan masukkan nama!"),
        email: yup
          .string()
          .email("Format email salah")
          .required("Silahkan masukkan email!"),
        phoneNumber: yup
          .string()
          .required("Silahkan masukkan nomor hp!")
          .matches(phoneRegExp, "Nomor hp tidak valid")
          .min(8, "Nomor hp terlalu pendek"),
        gender: yup.string().required("Silahkan pilih jenis kelamin!"),
        password: yup.string().required("Silahkan masukkan password"),
        passwordConfirmation: yup
          .string()
          .required("Silahkan masukkan konfirmasi password")
          .oneOf([yup.ref("password"), null], "Konfirmasi password harus sama"),
        onsite: yup.string().required("Silahkan pilih deklarasi!"),
      }),
      onSubmit: async (values, { resetForm, setSubmitting }) => {
        console.log(values);
        const result = await dispatch(postBio(values, history));

        if (result === RESP_SUCCESS) resetForm();

        setSubmitting(false);
      },
    });

    return (
      <Paper className={classes.paper}>
        <Typography variant="h5" align="center">
          Generate Biodata Form
        </Typography>
        <Typography variant="h6" className={classes.titleGutter} gutterBottom>
          Biodata
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.typo}
                id="name"
                label="Nama Lengkap"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                fullWidth
              />
              {formik.errors.name && formik.touched.name && (
                <Typography variant="subtitle2" align="left">
                  <p>{formik.errors.name}</p>
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Jenis Kelamin</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  <MenuItem value={"male"}>Laki-Laki</MenuItem>
                  <MenuItem value={"female"}>Perempuan</MenuItem>
                </Select>
              </FormControl>
              {formik.errors.gender && formik.touched.gender && (
                <Typography variant="subtitle2" align="left">
                  <p>{formik.errors.gender}</p>
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.typo}
                id="phoneNumber"
                name="phoneNumber"
                label="Nomor HP"
                type="text"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                fullWidth
              />
              {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                <Typography variant="subtitle2" align="left">
                  <p>{formik.errors.phoneNumber}</p>
                </Typography>
              )}
            </Grid>
          </Grid>
          <Typography variant="h6" className={classes.titleGutter} gutterBottom>
            Akun
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className={classes.typo}
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                fullWidth
              />
              {formik.errors.email && formik.touched.email && (
                <Typography variant="subtitle2" align="left">
                  <p>{formik.errors.email}</p>
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.typo}
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                fullWidth
              />
              {formik.errors.password && formik.touched.password && (
                <Typography variant="subtitle2" align="left">
                  <p>{formik.errors.password}</p>
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.typo}
                id="passwordConfirmation"
                name="passwordConfirmation"
                label="Konfirmasi Password"
                type="password"
                value={formik.values.passwordConfirmation}
                onChange={formik.handleChange}
                fullWidth
              />
              {formik.errors.passwordConfirmation &&
                formik.touched.passwordConfirmation && (
                  <Typography variant="subtitle2" align="left">
                    <p>{formik.errors.passwordConfirmation}</p>
                  </Typography>
                )}
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Box mt={1} mb={1}>
                  <Typography>Bersedia Onsite</Typography>
                </Box>
                <RadioGroup
                  row
                  aria-label="position"
                  name="onsite"
                  value={formik.values.onsite}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio color="primary" />}
                    label="Ya"
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio color="primary" />}
                    label="Tidak"
                  />
                </RadioGroup>
                {formik.errors.onsite && formik.touched.onsite && (
                  <Typography variant="subtitle2" align="left">
                    <p>{formik.errors.onsite}</p>
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex">
                <Box p={1}>
                  <Button
                    disabled={formik.isSubmitting}
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Submit
                  </Button>
                </Box>
                <Box p={1}>
                  <Button
                    onClick={formik.resetForm}
                    variant="contained"
                    color="secondary"
                  >
                    Reset
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <ModalCreating />
      </main>
    </React.Fragment>
  );
}
