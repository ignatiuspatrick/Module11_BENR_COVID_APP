/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Switch from '@material-ui/core/Switch';
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Search from "@material-ui/icons/Search";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function RONotifications() {
  const classes = useStyles();

  React.useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });
  
  return (
    <Card>
      <CardHeader color="primary">
        <GridContainer>
          <GridItem xs={7}>
            <h4 className={classes.cardTitleWhite}>Notifications</h4>
          </GridItem>
          <GridItem xs={2}>
            All <Switch inputProps={{'aria-label': 'primary checkbox'}} /> Unread
          </GridItem>
          <GridItem xs={3}>
            <CustomInput
              formControlProps={{
                className: classes.margin + " " + classes.search
              }}
              inputProps={{
                placeholder: "Search Message",
                inputProps: {
                  "aria-label": "Search"
                }
              }}
            />
            <Button color="white" aria-label="edit" justIcon round>
              <Search />
            </Button>
          </GridItem>
        </GridContainer>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <SnackbarContent
              message={
                'ADMIN - This color code represents regular notifications from our product admin'
              }
              close
              color="info"
            />
            <SnackbarContent
              message={
                'SYSTEM - This color code represents regular notifications from the system'
              }
              close
              color="success"
            />
            <SnackbarContent
              message={
                'WARNING - This color code represents regular notifications when there is a warning'
              }
              close
              color="warning"
            />
            <SnackbarContent
              message={
                'SANITARY SERVICE - This color code represents regular notifications from the sanitary service'
              }
              close
              color="danger"
            />
          </GridItem>
        </GridContainer>
        <br />
      </CardBody>
    </Card>
  );
}
