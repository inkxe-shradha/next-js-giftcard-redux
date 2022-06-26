import React from "react";
import { makeStyles } from "@mui/styles";
import { getSession } from "next-auth/react";
import { checkedLoginUserAccessStatus } from "../../components/utils/sharedutils";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import MetaHeader from "../../components/Meta/MetaHeader";

const styles = makeStyles((theme) => ({
  userPaper: {
    padding: theme.spacing(2),
    border: "1px solid" + theme.palette.primary.main,
    wordBreak: "break-all",
  },
  avatar: {
    margin: "auto",
    backgroundColor: theme.palette.secondary.main,
  },
}));
const Profile = ({ user }) => {
  const isAdmin = checkedLoginUserAccessStatus(user?.email);
  const classes = styles();
  return (
    <>
      <MetaHeader title="My Profile" description="Profile" />
      <Container maxWidth="lg" sx={{ marginTop: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Paper
              elevation={12}
              sx={{
                padding: "2rem",
              }}
            >
              <Card>
                <CardHeader
                  title="Profile Details"
                  action={
                    <Link href="/">
                      <IconButton
                        aria-label="back to dashboard"
                        color="inherit"
                      >
                        <ArrowBackIcon />
                      </IconButton>
                    </Link>
                  }
                />
                <CardContent>
                  <Grid container spacing={2}>
                    {/* Avatar Content */}
                    <Grid
                      item
                      xs={12}
                      margin={"auto"}
                      md={4}
                      alignContent="center"
                      justifyContent="center"
                    >
                      <Avatar
                        alt={user?.name}
                        src={user?.imageUrl}
                        sx={{ width: 200, height: 200 }}
                        className={classes.avatar}
                      />
                    </Grid>
                    {/* User Details */}
                    <Grid item xs={12} md={8}>
                      <div>
                        <Typography variant="h6">
                          Name(
                          <span className="bg-gradient bg-success badge">
                            {isAdmin ? "Admin" : "User"}
                          </span>
                          )
                        </Typography>
                        <Paper elevation={5} className={classes.userPaper}>
                          {user?.name}
                        </Paper>
                      </div>
                      <div>
                        <Typography variant="h6">Email</Typography>
                        <Paper elevation={5} className={classes.userPaper}>
                          {user?.email}
                        </Paper>
                      </div>
                      <div>
                        <Typography variant="h6">Balance</Typography>
                        <Paper elevation={5} className={classes.userPaper}>
                          {user?.balance_points || 0} <strong>$</strong>
                        </Paper>
                      </div>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const sessionData = await getSession({ req: context.req });

  return {
    props: {
      user: sessionData?.user || null,
    },
  };
};

export default Profile;
