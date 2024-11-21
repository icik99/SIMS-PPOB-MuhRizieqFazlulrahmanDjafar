import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { loginUser } from "../services/apiService";

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email tidak valid")
        .required("Email wajib diisi"),
      password: Yup.string()
        .min(8, "Password minimal 8 karakter")
        .required("Password wajib diisi")
    }),
    onSubmit: async (values) => {
      const payload = {
        email: values.email,
        password: values.password,
      };

      try {
        await toast.promise(
          loginUser(payload), {
            loading: 'Processing...',
            success: (res) => {
              if(res.status === 0) {
                navigate('/')
                localStorage.setItem('token', res.data.token)
                return res.message
              }
            },
            error: (err) => {
              return err.response.data.message || 'Something went wrong'
            }
          }
        )
      } catch (error) {
        
      }
    },
  });

  return (
    <>
      <div className="bg-white min-h-screen w-full  flex  items-center fixed">
        <div className="bg-white  px-20  w-full mx-14">
          <div className="flex items-center justify-center gap-4 font-semibold text-2xl mb-6">
            <img src="/assets/icons/Logo.png" alt="Logo" loading="lazy" className="w-8 h-8" />
            <p>SIMS PPOB</p>
          </div>
          <h1 className="text-2xl font-semibold text-center mb-10">
            Masuk atau buat akun <br /> untuk memulai
          </h1>
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <InputField
                type="email"
                name="email"
                placeholder="masukan email anda"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                icon={MdOutlineAlternateEmail}
              />
            </div>
            <div>
              <InputField
                type="password"
                name="password"
                placeholder="buat password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                icon={CiLock}
                errorMessage={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : null
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 font-semibold"
            >
              Masuk
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            belum punya akun? registrasi {" "}
            <a
              href="/register"
              className="text-red-500 hover:underline font-bold"
            >
              di sini
            </a>
          </p>
        </div>
        <div className="hidden lg:block w-full h-screen">
          <img
            src="/assets/others/ilustrasiLogin.png"
            alt="Ilustrasi Login"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
