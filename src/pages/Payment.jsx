import React, { useEffect, useState } from 'react'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import Layout from '../components/Layout'
import { getBalance, getProfile, topUp, transaction } from '../services/apiService'
import InputField from "../components/InputField";
import { FaMoneyBill } from 'react-icons/fa';
import * as Yup from "yup";
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import Modal from '../components/ModalAlert';
import { FaCircleCheck } from 'react-icons/fa6';
import { IoIosCloseCircle } from 'react-icons/io';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Payment = () => {
  const [dataProfile, setDataProfile] = useState([])
  const [dataBalance, setDataBalance] = useState('')
  const [showBalance, setShowBalance] = useState(false)
  const [showModalSuccess, setShowModalSuccess] = useState(false)
  const [showModalFailed, setShowModalFailed] = useState(false)
  const [showModalAlert, setShowModalAlert] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams()
  const services = useSelector((state) => state.services.services);

  const selectedService = services.find(service => service.service_code === id);

  const getDataProfile = async () => {
    try {
      const res = await getProfile()
      setDataProfile(res.data)
    } catch (error) {
      
    }
  }

  const getDataBalance = async () => {
    try {
      const res = await getBalance()
      setDataBalance(res.data.balance)
    } catch (error) {
      
    }
  }

  const toggleSaldo = () => {
    setShowBalance(prev => !prev)
  }

  const formik = useFormik({
    initialValues: {
      service_code: selectedService?.service_code,
    },
    onSubmit: async (values) => {
      const payload = {
        service_code: values.service_code,
      };

      try {
        await toast.promise(
          transaction(payload), {
            loading: 'Processing...',
            success: (res) => {
              if(res.status === 0) {
                setShowModalAlert(prev => !prev)
                setShowModalSuccess(true)
                setRefresh(prev => !prev)
                formik.resetForm()
                return res.message;
              }
            },
            error: (err) => {
              setShowModalAlert(prev => !prev)
              setShowModalFailed(true)
              return err.response.data.message || 'Something went wrong'
            }
          }
        )
      } catch (error) {
        
      }
    },
  });

  function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(number);
  }
  
  useEffect(() => {
    getDataProfile()
    getDataBalance()
    setRefresh(false)
  }, [refresh])
  return (
    <>
      <Modal 
          activeModal={showModalAlert}
          width={'350px'}
          content= {
          <>
              <div className=' py-8 space-y-5'>
                <div className='flex justify-center'>
                  <img src='/assets/icons/Logo.png' alt='Logo' loading='lazy' className='w-[50px]' />
                </div>
                <div>
                  <p className='text-center'>Beli {selectedService?.service_name} senilai</p>
                  <p className='text-center font-bold text-xl'>{formatRupiah(selectedService?.service_tariff)} ?</p>
                </div>
                <div className='flex justify-center'>
                  <button onClick={formik.handleSubmit} className='font-semibold text-red-500'>Ya, lanjutkan Bayar</button><br/>
                </div>
                <div className='flex justify-center'>
                  <button onClick={() => setShowModalAlert(prev => !prev)} className='font-semibold text-gray-500'>Batalkan</button>
                </div>
              </div>
          </>
          }
      />
      <Modal 
          activeModal={showModalSuccess}
          width={'350px'}
          content= {
          <>
              <div className=' py-8 space-y-5'>
                <div className="flex justify-center">
                  <FaCircleCheck className="text-[50px] text-teal-400" />
                </div>
                <div>
                  <p className='text-center'>Pembayaran {selectedService?.service_name} sebesar</p>
                  <p className='text-center font-bold text-xl'>{formatRupiah(selectedService?.service_tariff)}</p>
                  <p className='text-center'>berhasil!</p>
                </div>
                <div className='flex justify-center'>
                  <Link to={'/'} className='font-semibold text-red-500'>Kembali ke beranda</Link>
                </div>
              </div>
          </>
          }
      />
      <Modal 
          activeModal={showModalFailed}
          width={'350px'}
          content= {
          <>
              <div className=' py-8 space-y-5'>
                <div className="flex justify-center">
                  <IoIosCloseCircle className="text-[50px] text-red-400" />
                </div>
                <div>
                <p className='text-center'>Pembayaran {selectedService?.service_name} sebesar</p>
                <p className='text-center font-bold text-xl'>{formatRupiah(selectedService?.service_tariff)}</p>
                  <p className='text-center'>gagal</p>
                </div>
                <div className='flex justify-center'>
                  <Link to={'/'} className='font-semibold text-red-500'>Kembali ke beranda</Link>
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
            <div className='w-full mb-5'>
              <p className='text-gray-500 font-medium text mb-4'>Pembayaran</p>
              <div className='flex gap-3 items-center'>
                <img src={selectedService?.service_icon} alt={selectedService?.service_code} className='w-[30px]' />
                <p className='font-medium text-lg'>{selectedService?.service_name}</p>
              </div>
            </div>

            <div className='flex gap-5'>
                <div className='w-full space-y-5'>
                  <InputField 
                    name='service_tariff'
                    type='number'
                    icon={FaMoneyBill }
                    value={selectedService?.service_tariff}
                  />
                  <button
                    onClick={() => setShowModalAlert(!showModalAlert)}
                    className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 font-semibold"
                  >
                    Bayar
                  </button>
                </div>
            </div>
          </section>
      </Layout>
    </>
  )
}

export default Payment