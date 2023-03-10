import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import config from "../../config";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  let { updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fields = ["email", "password"];
    const formElements = e.target.elements;

    const formValues = fields
      .map((field) => ({
        [field]: formElements.namedItem(field).value,
      }))
      .reduce((current, next) => ({ ...current, ...next }));

    let registerRequest;
    try {
      registerRequest = await axios.post(
        `${config.SERVER_URL}/api/v1/auth/login`,
        {
          ...formValues,
        }
      );
    } catch ({ response }) {
      registerRequest = response;
      setError(response.error);
    }

    const { data: registerRequestData } = registerRequest;
    if (registerRequestData.status) {
      updateUser(registerRequestData.data);
      navigate("/");
    }
  };

  return (
    <div>
      <Grid
        container
        spacing={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
        direction="row"
      >
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            spacing={2}
            className={classes.loginForm}
          >
            <Paper
              variant="elevation"
              elevation={2}
              className={classes.loginBackground}
            >
              <Grid item>
                <Typography
                  component="h1"
                  sx={{ fontWeight: 900, textAlign: "center", mb: 2 }}
                  variant="h5"
                >
                  Log in
                </Typography>
              </Grid>
              <Grid item>
                <form onSubmit={handleSubmit}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        type="email"
                        placeholder="Email"
                        helperText={
                          error && <span style={{ color: "red" }}>{error}</span>
                        }
                        fullWidth
                        name="email"
                        variant="outlined"
                        required
                        autoFocus
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="password"
                        placeholder="Password"
                        fullWidth
                        name="password"
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.buttonBlock}
                      >
                        Login
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles({
  loginForm: {
    justifyContent: "center",
    minHeight: "90vh",
  },
  buttonBlock: {
    width: "100%",
  },
  loginBackground: {
    justifyContent: "center",
    minHeight: "30vh",
    padding: "50px",
  },
});

export default Login;
