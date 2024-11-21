import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { registerUser } from "../services/apiService";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email tidak valid")
        .required("Email wajib diisi"),
      first_name: Yup.string().required("Nama depan wajib diisi"),
      last_name: Yup.string().required("Nama belakang wajib diisi"),
      password: Yup.string()
        .min(8, "Password minimal 8 karakter")
        .required("Password wajib diisi"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password tidak sama")
        .required("Konfirmasi password wajib diisi"),
    }),
    onSubmit: async (values) => {
      const payload = {
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.password,
      };

      try {
        await toast.promise(
          registerUser(payload), {
            loading: 'Processing...',
            success: (res) => {
              if (res.status === 0) {
                navigate("/login")
                return res.response.data.message
              }
            },
            error: (err) => {
              return err.response.data.message
            }
          }
        )
      } catch (error) {
        
      }
    },
  });

  return (
    <>
      <div className="bg-white h-screen w-full flex justify-center items-center fixed">
        <div className="bg-white py-8 lg:px-20  w-full mx-14">
          <div className="flex items-center justify-center gap-4 font-semibold text-2xl mb-6">
            <img src="/assets/icons/Logo.png" alt="Logo" loading="lazy" className="w-8 h-8" />
            <p>SIMS PPOB</p>
          </div>
          <h1 className="text-2xl font-semibold text-center mb-10">
            Lengkapi data untuk <br /> membuat akun
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
                errorMessage={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null
                }
              />
            </div>
            <div>
              <InputField
                type="text"
                name="first_name"
                placeholder="nama depan"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                icon={BsPerson}
                errorMessage={
                  formik.touched.first_name && formik.errors.first_name
                    ? formik.errors.first_name
                    : null
                }
              />
            </div>
            <div>
              <InputField
                type="text"
                name="last_name"
                placeholder="nama belakang"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                icon={BsPerson}
                errorMessage={
                  formik.touched.last_name && formik.errors.last_name
                    ? formik.errors.last_name
                    : null
                }
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
            <div>
              <InputField
                type="password"
                name="confirm_password"
                placeholder="konfirmasi password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                icon={CiLock}
                errorMessage={
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                    ? formik.errors.confirm_password
                    : null
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 font-semibold"
            >
              Registrasi
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Sudah punya akun? Login {" "}
            <a
              href="/login"
              className="text-red-500 hover:underline font-bold"
            >
              di sini
            </a>
          </p>
        </div>
        <div className="hidden lg:block w-full">
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

export default Register;
