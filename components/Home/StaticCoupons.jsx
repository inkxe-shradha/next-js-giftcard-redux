import React from "react";
import { makeStyles } from "@mui/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Link from "next/link";

const styles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    border: "1px solid" + theme.palette.primary.main,
    wordBreak: "break-all",
  },
  container: {
    marginBlockStart: "1em",
  },
}));
const StaticCoupons = ({ staticCoupons }) => {
  const classes = styles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography align="center" variant="h4">
            Most Viewed Coupons
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid container margin="custom" spacing={2}>
            {staticCoupons &&
              staticCoupons.map((coupon) => (
                <Grid item xs={12} md={3} key={coupon.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={coupon.cardImage}
                      alt={coupon.cardVendor}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {coupon.cardName} (5000)
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {coupon.cardLongDesc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            {/* View More */}
            <Grid item xs={12} md={12} align="center">
              <Link href="/gift-cards">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  View More
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StaticCoupons;
