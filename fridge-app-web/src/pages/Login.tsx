import { Box, Button, Paper, Typography } from "@mui/material";
import { Form, useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/AuthProvider";
import Layout from "src/components/containers/Layout";
import { FormTextField } from "src/components/FormTextField";
import { jsonPost } from "src/utils/jsonPost";

const Login = () => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values, { setSubmitting }) => {
      const response = await jsonPost("/auth/login", values);
      const json = await response.json();
      if (json.success) {
        window.location.href = "/";
      }
    },
    validate: () => {},
  });

  const getLoggedIn = () => {
    fetch("/auth/user").then((res) => {
      res.json().then((data) => {
        console.log(data);
      });
    });
  };

  return (
    <Layout>
      <Paper sx={{ width: 400 }}>
        <Typography variant="h4">Sign in</Typography>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <FormTextField
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <br />
          <FormTextField
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <br />
          <Button
            disabled={formik.isSubmitting}
            color="primary"
            variant="contained"
            type="submit"
          >
            Login
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => getLoggedIn()}
          >
            Get Logged In
          </Button>
          <Link to="/register">Register</Link>
        </Box>
      </Paper>
    </Layout>
  );
};

export default Login;
