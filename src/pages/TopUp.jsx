import React, { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Layout from "../components/Layout";
import { getBalance, getProfile, topUp } from "../services/apiService";
import InputField from "../components/InputField";
import { FaMoneyBill } from "react-icons/fa";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Modal from "../components/ModalAlert";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TopUp = () => {
  const [dataProfile, setDataProfile] = useState([]);
  const [dataBalance, setDataBalance] = useState("");
  const [showBalance, setShowBalance] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalFailed, setShowModalFailed] = useState(false);
  const [showModalAlert, setShowModalAlert] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const getDataProfile = async () => {
    try {
      const res = await getProfile();
      setDataProfile(res.data);
    } catch (error) {}
  };

  const getDataBalance = async () => {
    try {
      const res = await getBalance();
      setDataBalance(res.data.balance);
    } catch (error) {}
  };

  const toggleSaldo = () => {
    setShowBalance((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      top_up_amount: "",
    },
    validationSchema: Yup.object({
      top_up_amount: Yup.number()
        .required("Jumlah top up wajib diisi")
        .min(10000, "Nominal top up minimal adalah Rp 10.000")
        .max(1000000, "Nominal top up maksimal adalah Rp 1.000.000"),
    }),

    onSubmit: async (values) => {
      const payload = {
        top_up_amount: values.top_up_amount,
      };

      try {
        await toast.promise(topUp(payload), {
          loading: "Processing...",
          success: (res) => {
            console.log(res);
            if (res.status === 0) {
              setShowModalAlert((prev) => !prev);
              setShowModalSuccess(true);
              setRefresh((prev) => !prev);
              setDataBalance(res.data.balance);
              return res.message;
            }
          },
          error: (err) => {
            setShowModalAlert((prev) => !prev);
            setShowModalFailed(true);

            return err.response.data.message || "Something went wrong";
          },
        });
      } catch (error) {}
    },
  });

  function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  }

  useEffect(() => {
    getDataProfile();
    getDataBalance();
    setRefresh(false);
  }, [refresh]);
  return (
    <>
      <Modal
        activeModal={showModalAlert}
        width={"350px"}
        content={
          <>
            <div className=" py-8 space-y-5">
              <div className="flex justify-center">
                <img
                  src="/assets/icons/Logo.png"
                  alt="Logo"
                  loading="lazy"
                  className="w-[50px]"
                />
              </div>
              <div>
                <p className="text-center">Anda yakin untuk Top Up sebesar</p>
                <p className="text-center font-bold text-xl">
                  {formatRupiah(formik.values.top_up_amount)} ?
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={formik.handleSubmit}
                  className="font-semibold text-red-500"
                >
                  Ya, lanjutkan Top Up
                </button>
                <br />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowModalAlert((prev) => !prev)}
                  className="font-semibold text-gray-500"
                >
                  Batalkan
                </button>
              </div>
            </div>
          </>
        }
      />
      <Modal
        activeModal={showModalSuccess}
        width={"350px"}
        content={
          <>
            <div className=" py-8 space-y-5">
              <div className="flex justify-center">
                <FaCircleCheck className="text-[50px] text-teal-400" />
              </div>
              <div>
                <p className="text-center">Top Up sebesar</p>
                <p className="text-center font-bold text-xl">
                  {formatRupiah(formik.values.top_up_amount)}
                </p>
                <p className="text-center">berhasil!</p>
              </div>
              <div className="flex justify-center">
                <Link to={"/"} className="font-semibold text-red-500">
                  Kembali ke beranda
                </Link>
              </div>
            </div>
          </>
        }
      />
      <Modal
        activeModal={showModalFailed}
        width={"350px"}
        content={
          <>
            <div className=" py-8 space-y-5">
              <div className="flex justify-center">
                <IoIosCloseCircle className="text-[50px] text-red-400" />
              </div>
              <div>
                <p className="text-center">Top Up sebesar</p>
                <p className="text-center font-bold text-xl">
                  {formatRupiah(formik.values.top_up_amount)}
                </p>
                <p className="text-center">gagal</p>
              </div>
              <div className="flex justify-center">
                <Link to={"/"} className="font-semibold text-red-500">
                  Kembali ke beranda
                </Link>
              </div>
            </div>
          </>
        }
      />
      <Layout>
        <section className="flex-row items-center lg:flex mb-10">
          <div className="w-full mb-4 ">
            <img
              src={dataProfile?.profile_image}
              alt=""
              loading="lazy"
              className="mb-4 border rounded-full w-[90px] h-[90px] object-contain"
            />
            <p className="text-gray-500 font-medium text-lg mb-1">
              Selamat datang,
            </p>
            <p className="font-medium text-2xl">
              {dataProfile.first_name} {dataProfile.last_name}
            </p>
          </div>
          <div
            className="space-y-6 p-6 rounded-lg bg-cover bg-center w-full"
            style={{ backgroundImage: "url('/assets/others/bgSaldo.png')" }}
          >
            <p className="text-white font-semibold">Saldo Anda</p>
            <p className="text-2xl text-white font-bold">
              {showBalance ? `${formatRupiah(dataBalance)}` : "Rp ••••••••"}
            </p>
            <div className="flex gap-3 items-center">
              <p
                className="text-white bg-red-500 py-3 cursor-pointer"
                onClick={toggleSaldo}
              >
                {showBalance ? "Tutup Saldo" : "Lihat Saldo"}
              </p>
              <MdOutlineRemoveRedEye
                className="text-white cursor-pointer"
                onClick={toggleSaldo}
              />
            </div>
          </div>
        </section>
        <section>
          <div className="w-full mb-5">
            <p className="text-gray-500 font-medium text-lg">
              Silahkan masukan
            </p>
            <p className="font-medium text-2xl">Nominal Top Up</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full space-y-5">
              <InputField
                name="top_up_amount"
                type="number"
                placeholder="masukan nominal top up"
                icon={FaMoneyBill}
                value={formik.values.top_up_amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errorMessage={
                  formik.touched.top_up_amount && formik.errors.top_up_amount
                    ? formik.errors.top_up_amount
                    : null
                }
              />
              <button
                onClick={() => setShowModalAlert(!showModalAlert)}
                className={`w-full py-2 rounded font-semibold ${
                  formik.values.top_up_amount
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-400 cursor-not-allowed"
                } text-white`}
                disabled={
                  !formik.values.top_up_amount ||
                  !formik.isValid ||
                  !formik.dirty
                }
              >
                Top Up
              </button>
            </div>

            <div className="grid grid-cols-3 gap-5 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              <button
                onClick={() => formik.setFieldValue("top_up_amount", 10000)}
                className={`${
                  formik.values.top_up_amount === 10000 && "bg-gray-200"
                } w-full p-2 text-center rounded border-2`}
              >
                Rp10.000
              </button>
              <button
                onClick={() => formik.setFieldValue("top_up_amount", 20000)}
                className={`${
                  formik.values.top_up_amount === 20000 && "bg-gray-200"
                } w-full p-2 text-center rounded border-2`}
              >
                Rp20.000
              </button>
              <button
                onClick={() => formik.setFieldValue("top_up_amount", 50000)}
                className={`${
                  formik.values.top_up_amount === 50000 && "bg-gray-200"
                } w-full p-2 text-center rounded border-2`}
              >
                Rp50.000
              </button>
              <button
                onClick={() => formik.setFieldValue("top_up_amount", 100000)}
                className={`${
                  formik.values.top_up_amount === 100000 && "bg-gray-200"
                } w-full p-2 text-center rounded border-2`}
              >
                Rp100.000
              </button>
              <button
                onClick={() => formik.setFieldValue("top_up_amount", 250000)}
                className={`${
                  formik.values.top_up_amount === 250000 && "bg-gray-200"
                } w-full p-2 text-center rounded border-2`}
              >
                Rp250.000
              </button>
              <button
                onClick={() => formik.setFieldValue("top_up_amount", 500000)}
                className={`${
                  formik.values.top_up_amount === 500000 && "bg-gray-200"
                } w-full p-2 text-center rounded border-2`}
              >
                Rp500.000
              </button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default TopUp;
