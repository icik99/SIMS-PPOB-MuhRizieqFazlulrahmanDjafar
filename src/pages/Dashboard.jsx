import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getBalance,
  getBanner,
  getProfile,
  getServices,
} from "../services/apiService";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import SlideBanner from "../components/SlideBanner";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setServices } from "../redux/serviceSlice";

const Dashboard = () => {
  const [dataProfile, setDataProfile] = useState([]);
  const [dataServices, setDataServices] = useState([]);
  const [dataBanner, setDataBanner] = useState([]);
  const [dataBalance, setDataBalance] = useState([]);
  const [showBalance, setShowBalance] = useState(false);
  const dispatch = useDispatch();

  function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  }
  const getDataProfile = async () => {
    try {
      const res = await getProfile();
      setDataProfile(res.data);
    } catch (error) {}
  };

  const getDataServices = async () => {
    try {
      const res = await getServices();
      dispatch(setServices(res.data));
      setDataServices(res.data);
    } catch (error) {}
  };

  const getDataBanner = async () => {
    try {
      const res = await getBanner();
      setDataBanner(res.data);
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

  useEffect(() => {
    getDataProfile();
    getDataServices();
    getDataBanner();
    getDataBalance();
  }, []);
  return (
    <>
      <Layout>
        
        <section className="flex-row items-center lg:flex mb-10 sm:px-10">
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

        <section className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-12 gap-6">
            {Object.values(dataServices).map((item, idx) => (
              <Link
                to={`/payment/${item.service_code}`}
                key={idx}
                className="flex flex-col items-center w-full"
              >
                <div className="flex justify-center">
                  <img
                    src={item?.service_icon}
                    alt={item?.service_code}
                    loading="lazy"
                    className="w-[90px] h-[90px] mb-2"
                  />
                </div>
                <p className="text-center line-clamp-2 text-xs">
                  {item?.service_name}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <p className="font-semibold mb-2">Temukan promo menarik</p>
          <SlideBanner dataBanner={dataBanner} />
        </section>
      </Layout>
    </>
  );
};

export default Dashboard;
