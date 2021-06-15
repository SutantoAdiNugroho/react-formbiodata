import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Loader from "../../component/Loading/loading";

import {
  dashboard,
  register,
  RESP_SUCCESS,
} from "../../redux/actions/application";
import { useSelector, connect } from "react-redux";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { Link as LinkRouter } from "react-router-dom";

const columns = [
  { id: "_id", label: "ID Guru", minWidth: 170 },
  { id: "name", label: "Nama Lengkap", minWidth: 100 },
  {
    id: "nip",
    label: "NIP",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "address",
    label: "Alamat",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(nip, code, population, size) {
  const density = population / size;
  return { nip, code, population, size, density };
}

const rows = [createData("Loading..", "IN", 1324171354, 3287263)];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootCard: {
    minWidth: 275,
  },
  rootTable: {
    width: "100%",
  },
  paper: {
    marginTop: 10,
    padding: theme.spacing(1),
  },
  pos: {
    marginBottom: 12,
    marginTop: 5,
  },
  chartPart: {
    marginTop: 20,
  },
  container: {
    maxHeight: 440,
  },
  typo: {
    marginBottom: theme.spacing(2),
  },
}));

function Dashboard(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [openCrt, setOpenCrt] = React.useState(false);
  const [teacherBio, setTeacherBio] = React.useState([]);

  const user = useSelector((state) => state.data.user);
  const history = useHistory();
  const dataTeacher =
    user.data === undefined ? rows : user.data.totalTeacherData;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = (data) => {
    setTeacherBio(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenCrt = (data) => {
    setOpenCrt(true);
  };

  const handleCloseCrt = () => {
    setOpenCrt(false);
  };

  const ModalCreating = () => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const formik = useFormik({
      initialValues: {
        nip: "",
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        password: "",
        passwordConfirmation: "",
        role: "teacher",
      },
      validationSchema: yup.object({
        nip: yup
          .string()
          .required("Silahkan masukkan NIP!")
          .min(18, "Jumlah NIP harus 18 digit")
          .max(18, "Jumlah NIP harus 18 digit"),
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
        address: yup.string().required("Silahkan masukkan alamat!"),
        password: yup.string().required("Silahkan masukkan password"),
        passwordConfirmation: yup
          .string()
          .required("Silahkan masukkan konfirmasi password")
          .oneOf([yup.ref("password"), null], "Konfirmasi password harus sama"),
      }),
      onSubmit: async (values) => {
        const app = await props.dispatch(register(values, history));

        if (app === RESP_SUCCESS) setOpenCrt(false);
      },
    });

    return (
      <Dialog open={openCrt} onClose={handleCloseCrt} minWidth="xs" fullWidth>
        <DialogTitle id="form-dialog-title">Tambah Data Guru</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              className={classes.typo}
              id="nip"
              label="NIP"
              type="number"
              value={formik.values.nip}
              onChange={formik.handleChange}
              fullWidth
            />
            {formik.errors.nip && formik.touched.nip && (
              <Typography variant="subtitle2" align="left">
                <p>{formik.errors.nip}</p>
              </Typography>
            )}
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
            <TextField
              className={classes.typo}
              id="address"
              name="address"
              label="Alamat Lengkap"
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
              fullWidth
            />
            {formik.errors.address && formik.touched.address && (
              <Typography variant="subtitle2" align="left">
                <p>{formik.errors.address}</p>
              </Typography>
            )}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCrt} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  const ModalEditing = () => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const formik = useFormik({
      initialValues: {
        _id: teacherBio._id,
        nip: teacherBio.nip,
        name: teacherBio.name,
        email: teacherBio.email,
        phoneNumber: teacherBio.phoneNumber,
        address: teacherBio.address,
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
        address: yup.string().required("Silahkan masukkan alamat!"),
      }),
      onSubmit: (values, { setSubmitting, resetForm }) => {
        console.log(values);
        // dispatch(login(values, history));
      },
    });

    return (
      <Dialog open={open} onClose={handleClose} minWidth="xs" fullWidth>
        <DialogTitle id="form-dialog-title">Edit Data Guru</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              className={classes.typo}
              id="id"
              label="ID Guru"
              type="text"
              value={formik.values._id}
              fullWidth
              disabled
            />
            <TextField
              className={classes.typo}
              id="nip"
              label="NIP"
              type="text"
              value={formik.values.nip}
              fullWidth
              disabled
            />
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
            <TextField
              className={classes.typo}
              id="phoneNumber"
              name="phoneNumber"
              label="Nomor HP"
              type="number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              fullWidth
            />
            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
              <Typography variant="subtitle2" align="left">
                <p>{formik.errors.phoneNumber}</p>
              </Typography>
            )}
            <TextField
              className={classes.typo}
              id="address"
              name="address"
              label="Alamat Lengkap"
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
              fullWidth
            />
            {formik.errors.address && formik.touched.address && (
              <Typography variant="subtitle2" align="left">
                <p>{formik.errors.address}</p>
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  useEffect(() => {
    props.dispatch(dashboard());
  }, []);

  return (
    <div>
      <ModalEditing />
      <ModalCreating />
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Box mt={5}>
                <Typography variant="h5">Data Guru</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box mt={5} mr={1}>
              <Paper className={classes.rootTable}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dataTeacher
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format &&
                                    typeof value === "number" ? (
                                      column.format(value)
                                    ) : column.id === "actions" ? (
                                      <div>
                                        <Button
                                          variant="contained"
                                          size="small"
                                          color="secondary"
                                          onClick={() => handleClickOpen(row)}
                                        >
                                          Edit
                                        </Button>
                                      </div>
                                    ) : (
                                      value
                                    )}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={dataTeacher.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickOpenCrt}
                >
                  Tambah Guru
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
      <Loader />
    </div>
  );
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(Dashboard);
