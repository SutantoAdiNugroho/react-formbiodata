import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
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
import Loader from "../../component/Loading/loading";

import { dashboardTch } from "../../redux/actions/application";
import { useSelector, connect } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";

const studentColumns = [
  { id: "_id", label: "ID Siswa", minWidth: 170 },
  { id: "name", label: "Nama Lengkap", minWidth: 100 },
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
    id: "phoneNumber",
    label: "Nomor HP",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createDataStd(email, code, population, size) {
  const density = population / size;
  return { email, code, population, size, density };
}

const rowsStudent = [createDataStd("Loading..", "IN", 1324171354, 3287263)];

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
}));

function Dashboard(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const user = useSelector((state) => state.data.user);
  const dataStudent =
    user.data === undefined ? rowsStudent : user.data.totalStudentData;
  const dataStudentCnt =
    user.data === undefined ? "loading.." : user.data.count.totalStudent;
  const dataStdCntVal =
    user.data === undefined ? "loading.." : user.data.count.cntVal;
  const dataStdCntNotVal =
    user.data === undefined ? "loading.." : user.data.count.cntNotVal;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    props.dispatch(dashboardTch());
  }, []);

  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs>
            <div className={classes.paper}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Total Siswa Diampu
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.pos}
                    color="textSecondary"
                  >
                    {dataStudentCnt}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={LinkRouter}
                    to="/regist-table"
                    size="small"
                  >
                    Visit
                  </Button>
                </CardActions>
              </Card>
            </div>
          </Grid>
          <Grid item xs>
            <div className={classes.paper}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Total Siswa Dinilai
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.pos}
                    color="textSecondary"
                  >
                    {dataStdCntVal}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={LinkRouter}
                    to="/regist-table"
                    size="small"
                  >
                    Visit
                  </Button>
                </CardActions>
              </Card>
            </div>
          </Grid>
          <Grid item xs>
            <div className={classes.paper}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Total Siswa Belum Dinilai
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.pos}
                    color="textSecondary"
                  >
                    {dataStdCntNotVal}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={LinkRouter}
                    to="/regist-table"
                    size="small"
                  >
                    Visit
                  </Button>
                </CardActions>
              </Card>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Box mt={10} mr={1}>
              <Paper className={classes.rootTable}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {studentColumns.map((column) => (
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
                      {dataStudent
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
                              {studentColumns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
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
                  count={dataStudent.length}
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
                  component={LinkRouter}
                  to="/teacher/manage/student"
                >
                  Selengkapnya
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

const mapStateToProps = (state) => ({ users: state.users });

export default connect(mapStateToProps)(Dashboard);
