import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
// core components
import Button from "components/CustomButtons/Button.js";
import { useHistory } from "react-router-dom";
import isAuthenticated from "../../auth"

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import back from "../../hosts.js";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks(props) {
  const classes = useStyles();
  const [openProfile, setOpenProfile] = React.useState(null);
  const {dashboardtype} = props;

  let history = useHistory();
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };

  const handleCloseProfile = () => {
    setOpenProfile(null);
  }

  const handleGoToProfile = () => {
    if (dashboardtype === "ss") {
      history.push("/ssdash/user");
    } else if (dashboardtype === "ro") {
      history.push("/rodash/restoinfo");
    }
    setOpenProfile(null);
  };
  const handleLogOut = () => {
    const request = require('request');
    var options = {};
    if (dashboardtype === "ss") {
      options = {
        uri: back + '/superusers/logout/ss',
        withCredentials: true
      };
    } else if (dashboardtype === "ro") {
      options = {
        uri: back + '/superusers/logout/ro',
        withCredentials: true
      };
    }
    
    request.post(options, (err, res, body)=>{
      if (err) {
        return console.log(err);
    }
    if(res.statusCode === 200 || res.statusCode === 401 ){
      isAuthenticated.signoutRo();
      isAuthenticated.signoutSs();
      history.push('/login');
    }
    });

    
  }
  return (
    <div>
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    {dashboardtype === "ro" ? 
                    <div>
                      <MenuItem
                      onClick={handleGoToProfile}
                      className={classes.dropdownItem}
                      >
                        Restaurant Information
                      </MenuItem>
                      <Divider light />
                    </div>
                    :
                    null}
                    <MenuItem
                      onClick={handleLogOut}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
