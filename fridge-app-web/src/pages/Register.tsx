import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Form, Formik, Field, useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "src/components/containers/Layout";
import { FormTextField } from "src/components/FormTextField";
import { jsonPost } from "src/utils/jsonPost";

const Register = () => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values, { setSubmitting }) => {
      const res = await axios.post("/auth/register", values, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        window.location.href = "/login";
      }
    },
    validate: () => {},
  });

  return (
    <Layout>
      <Paper sx={{ width: 400 }}>
        <Typography variant="h4">Register</Typography>
        <Box component="form" p={2} onSubmit={formik.handleSubmit}>
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
          <br />
          <Button
            color="primary"
            sx={{ mt: 2 }}
            variant="contained"
            type="submit"
          >
            Register
          </Button>
          <br />
          <Link to="/login">Login instead</Link>
        </Box>
      </Paper>
    </Layout>
  );
};

export default Register;
