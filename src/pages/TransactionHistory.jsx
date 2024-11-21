import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getBalance,
  getHistoryTransaction,
  getProfile,
} from "../services/apiService";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import moment from "moment";

const TransactionHistory = () => {
  const [dataProfile, setDataProfile] = useState([]);
  const [showBalance, setShowBalance] = useState(false);
  const [dataBalance, setDataBalance] = useState("");
  const [dataHistoryTransaction, setDataHistoryTransaction] = useState([]);
  const limit = 5;
  const [offset, setOffset] = useState(0);
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
  const getDataHistoryTransaction = async () => {
    try {
      const res = await getHistoryTransaction(offset, limit);
      setDataHistoryTransaction(res.data.records);
      console.log("transaksi: ", res.data);
    } catch (error) {}
  };

  const toggleSaldo = () => {
    setShowBalance((prev) => !prev);
  };

  const handleShowMore = () => {
    setOffset((prev) => prev + limit);
  };

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
    getDataHistoryTransaction();
  }, [offset]);

  return (
    <>
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
          <p className="text-gray-500 font-medium text mb-4">Semua Transaksi</p>
          {dataHistoryTransaction.length !== 0 ? (
            <>
              <div className="space-y-5">
                {Object.values(dataHistoryTransaction).map((item, idx) => (
                  <div key={idx} className="px-5 py-3 border-2 rounded">
                    <div className="flex items-start justify-between">
                      <div>
                        <p
                          className={`${
                            item.transaction_type === "TOPUP"
                              ? "text-teal-400"
                              : "text-red-400"
                          } font-bold text-lg`}
                        >
                          {item?.transaction_type === "TOPUP" ? "+" : "-"} Rp
                          10.0000
                        </p>
                        <p className="text-gray-400 text-xs">
                          {moment(item?.created_on).format(
                            "DD MMMM YYYY HH:mm"
                          )}
                        </p>
                      </div>
                      <p className="text-xs">{item?.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center mt-4">
                <button
                  onClick={handleShowMore}
                  className="text-lg font-semibold text-red-600"
                >
                  Show More
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-xs font-semibold pt-4">
              No Data to display.
            </p>
          )}
        </section>
      </Layout>
    </>
  );
};

export default TransactionHistory;
