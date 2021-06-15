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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Loader from "../component/Loading/loading";

import { dashboard, RESP_SUCCESS } from "../redux/actions/application";
import { useSelector, connect } from "react-redux";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

const columns = [
  { id: "_id", label: "ID", minWidth: 170 },
  { id: "name", label: "Nama Lengkap", minWidth: 100 },
  {
    id: "phoneNumber",
    label: "Nomor HP",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "gender",
    label: "Jenis Kelamin",
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
  const [teacherBio, setTeacherBio] = React.useState([]);
  const [emailBio, setEmailBio] = React.useState("");
  const [onsiteBio, setOnsiteBio] = React.useState("");
  const [dateBio, setDateBio] = React.useState("");

  const user = useSelector((state) => state.data.user);
  const history = useHistory();
  const dataTeacher = user.data === undefined ? rows : user.data;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = (data) => {
    setTeacherBio(data);
    setEmailBio(data.acctId.email);
    setOnsiteBio(data.acctId.onsite);
    setDateBio(formatDate(data.created_at));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatDate = (date) => {
    var date = new Date(date);
    var dateStr =
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      ("00" + date.getDate()).slice(-2) +
      "/" +
      date.getFullYear() +
      "  " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);

    return dateStr;
  };

  const redirectHome = () => {
    history.push("/");
  };

  const ModalInfo = () => {
    const formik = useFormik({
      initialValues: {
        _id: teacherBio._id,
        name: teacherBio.name,
        phoneNumber: teacherBio.phoneNumber,
        gender: teacherBio.gender,
        email: emailBio,
        onsite: onsiteBio,
        createdAt: dateBio,
      },
      onSubmit: (values, { setSubmitting, resetForm }) => {
        console.log(values);
      },
    });

    return (
      <Dialog open={open} onClose={handleClose} minWidth="xs" fullWidth>
        <DialogTitle id="form-dialog-title">Biodata Detail</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              className={classes.typo}
              id="id"
              label="ID"
              type="text"
              value={formik.values._id}
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
              disabled
              fullWidth
            />
            <TextField
              className={classes.typo}
              id="gender"
              name="gender"
              label="Jenis Kelamin"
              type="text"
              value={formik.values.gender}
              onChange={formik.handleChange}
              disabled
              fullWidth
            />
            <TextField
              className={classes.typo}
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              disabled
              fullWidth
            />
            <TextField
              className={classes.typo}
              id="phoneNumber"
              name="phoneNumber"
              label="Nomor HP"
              type="number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              disabled
              fullWidth
            />
            <FormControl component="fieldset" className={classes.typo}>
              <Box mt={1} mb={1}>
                <Typography>Onsite</Typography>
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
                  disabled
                />
                <FormControlLabel
                  value="no"
                  control={<Radio color="primary" />}
                  label="Tidak"
                  disabled
                />
              </RadioGroup>
            </FormControl>
            <TextField
              className={classes.typo}
              id="createdAt"
              name="createdAt"
              label="Dibuat Tanggal"
              value={formik.values.createdAt}
              onChange={formik.handleChange}
              disabled
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Tutup
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
      <ModalInfo />
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Box mt={3}>
                <Typography variant="h5">Biodata List</Typography>
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
                                          Info
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
            </Box>
          </Grid>
          <Box mt={5}>
            <Button onClick={redirectHome} variant="contained" color="primary">
              Kembali
            </Button>
          </Box>
        </Grid>
      </div>
      <Loader />
    </div>
  );
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(Dashboard);
