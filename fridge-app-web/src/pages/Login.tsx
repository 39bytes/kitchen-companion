import { Box, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Layout from "src/components/containers/Layout";
import { FormTextField } from "src/components/FormTextField";

const Login = () => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values, { setSubmitting }) => {
      const res = await axios.post("/auth/login", values, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
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
          <Button
            disabled={formik.isSubmitting}
            color="primary"
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <br />
          <Link to="/register">Don't have an account? Register</Link>
        </Box>
      </Paper>
    </Layout>
  );
};

export default Login;
