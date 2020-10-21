/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <span style={{paddingBottom:"10px"}}>
              &copy; {1900 + new Date().getYear()}{" "}
              <a
                href="https://www.mindhash.nl/"
                target="_blank"
                className={classes.a}
              >
                Mindhash BV.
              </a>
            </span>
        </div>
      </div>
    </footer>
  );
}
