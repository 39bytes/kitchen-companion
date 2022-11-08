import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Form, Formik, Field, useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "src/components/containers/Layout";
import { FormTextField } from "src/components/FormTextField";
import { jsonPost } from "src/utils/jsonPost";

const Register = () => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values, { setSubmitting }) => {
      const response = await jsonPost("/auth/register", values);
      const json = await response.json();
      console.log(json);
      if (json.success) {
        window.location.href = "/login";
      }
    },
    validate: () => {},
  });

  return (
    <Layout>
      <Paper sx={{ width: 400 }}>
        <Typography variant="h4">Register</Typography>
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
          <Button color="primary" variant="contained" type="submit">
            Register
          </Button>
        </Box>
      </Paper>
    </Layout>
  );
};

export default Register;
