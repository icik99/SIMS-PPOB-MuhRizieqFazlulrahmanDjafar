import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getBalance,
  getBanner,
  getProfile,
  getServices,
} from "../services/apiService";
import SlideBanner from "../components/SlideBanner";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setServices } from "../redux/serviceSlice";
import ProfileBalanceCard from "../components/ProfileBalanceCard";
import LoadingPage from "../components/LoadingPage";

const Dashboard = () => {
  const [dataServices, setDataServices] = useState([]);
  const [dataBanner, setDataBanner] = useState([]);
  const dispatch = useDispatch();

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


  useEffect(() => {
    getDataServices();
    getDataBanner();
  }, []);

  if (dataBanner.length === 0 || dataServices.length === 0){
    return(
      <LoadingPage />
    )
  }
  return (
    <>
      <Layout>
        
        <ProfileBalanceCard />

        <section className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-4">
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
                    className="max-w-[90px]  mb-2"
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
