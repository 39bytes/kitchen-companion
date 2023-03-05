import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "src/components/layouts/authLayout/AuthLayout";
import * as Yup from "yup";
import { client } from "../../api/api";
import logoImg from "../../assets/icon.png";

const authValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

export const Login = () => {
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values, { setSubmitting }) => {
      const res = await client.post("/auth/login", values, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        //window.location.href = "/fridge";
      } else {
        setError(res.data.errors);
      }
    },
    validationSchema: authValidationSchema,
    validateOnChange: false,
  });

  return (
    <AuthLayout>
      <Box
        sx={{
          my: 8,
          mx: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "neutral.50" }}>
          <img src={logoImg} width={32} height={32} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 4 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Typography variant="caption" color="red">
            {error}
          </Typography>
          <Button
            disabled={formik.isSubmitting}
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, textTransform: "none" }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <MuiLink
                component={Link}
                to="/register"
                sx={{ textDecoration: "none" }}
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </AuthLayout>
  );
};
