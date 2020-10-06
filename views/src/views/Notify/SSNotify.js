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
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.js";
import Search from "@material-ui/icons/Search";
import { Height } from "@material-ui/icons";

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

export default function SSNotify() {
  const classes = useStyles();
  const [query, setQuery] = React.useState('');


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

  // for the backend
  function getRestaurant() {
      return [1];
  }
  
  return (
    <Card>
      <CardHeader color="danger">
        <GridContainer>
          <GridItem xs={6}>
            <h4 className={classes.cardTitleWhite}>Notify</h4>
            <p className={classes.cardCategoryWhite}>Notify Restaurants in case of COVID-19</p>
          </GridItem>
          <GridItem xs={6}>
            <TextField
            id="standard-multiline-flexible"
            label="Search Restaurant"
            rowsMax={4}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
            {getRestaurant().length >= 0 ? <p>show some result</p> : null }
          </GridItem>
        </GridContainer>
        <br />
      </CardBody>
    </Card>
  );
}
