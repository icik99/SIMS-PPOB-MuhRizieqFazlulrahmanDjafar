import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getHistoryTransaction,
} from "../services/apiService";
import moment from "moment";
import ProfileBalanceCard from "../components/ProfileBalanceCard";
import { formatRupiah } from "../utils/formatRupiah";
import LoadingPage from "../components/LoadingPage";

const TransactionHistory = () => {
  const [dataHistoryTransaction, setDataHistoryTransaction] = useState([]);
  const limit = 5;
  const [offset, setOffset] = useState(0);

  const getDataHistoryTransaction = async () => {
    try {
      const res = await getHistoryTransaction(offset, limit);
      setDataHistoryTransaction(res.data.records);
    } catch (error) {}
  };

  const handleShowMore = () => {
    setOffset((prev) => prev + limit);
  };

  useEffect(() => {
    getDataHistoryTransaction();
  }, [offset]);


  return (
    <>
      <Layout>
        <ProfileBalanceCard />

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
                          {item?.transaction_type === "TOPUP" ? "+" : "-"}{" "}
                          {formatRupiah(item?.total_amount)}
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
            <>
              <p className="text-center text-sm px-5 py-3 border-2 rounded  pt-4">
                No history to display.
              </p>
              {dataHistoryTransaction.length !== 0 && (
                <div className="flex items-center justify-center mt-4">
                  <button
                    onClick={() => setOffset(0)}
                    className="text-lg font-semibold text-red-600"
                  >
                    Go to the latest history.
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </Layout>
    </>
  );
};

export default TransactionHistory;
