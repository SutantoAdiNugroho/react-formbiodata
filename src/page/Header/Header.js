import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import GuestHeader from "../../component/Header/Guest/Header";
import AdminHeader from "../../component/Header/Admin/Header";
import SuperAdminHeader from "../../component/Header/Teacher/Header";

import { verify } from "../../helpers/verify";

function Header() {
  return (
    <Fragment>
      {JSON.parse(localStorage.getItem("token")) === null ? (
        <GuestHeader />
      ) : verify().role === "admin" ? (
        <AdminHeader />
      ) : (
        <SuperAdminHeader />
      )}
    </Fragment>
  );
}

export default withRouter(Header);
