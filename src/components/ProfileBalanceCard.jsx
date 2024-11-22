import { useState, useEffect } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { getBalance, getProfile } from '../services/apiService';
import { formatRupiah } from '../utils/formatRupiah';

function ProfileBalanceCard() {
  const [dataProfile, setDataProfile] = useState([]);
  const [dataBalance, setDataBalance] = useState([]);
  const [showBalance, setShowBalance] = useState(false);

  const getDataProfile = async () => {
    try {
      const res = await getProfile(); 
      setDataProfile(res.data);
    } catch (error) {
    }
  };

  const getDataBalance = async () => {
    try {
      const res = await getBalance(); 
      setDataBalance(res.data.balance);
    } catch (error) {
    }
  };

  const toggleSaldo = () => {
    setShowBalance((prev) => !prev);
  };

  useEffect(() => {
    getDataProfile();
    getDataBalance();
  }, []);

  if (dataProfile.length === 0 || dataBalance.length === 0){
    return(
      <div className='flex items-center justify-center py-5 px-10 border rounded-lg'>
        <p>Loading Components...</p>
      </div>
    )
  }

  return (
    <section className="flex-row items-end lg:flex mb-8 justify-center ">
      <div className="w-full mb-3 md:mb-0 border-2 py-2 rounded-md lg:border-none">
        <div className='flex items-center justify-center lg:justify-start'>
          <img
            src={
              dataProfile?.profile_image && !dataProfile.profile_image.includes('null')
                ? dataProfile.profile_image
                : "/assets/others/profilePhoto.png"
            }
            alt="Profile"
            loading="lazy"
            className="mb-4 border rounded-full w-[90px] h-[90px] object-cover"
          />
        </div>
        <p className="text-gray-500 font-medium text-center lg:text-left text-lg">Selamat datang,</p>
        <p className="font-medium text-2xl text-center lg:text-left">
          {dataProfile?.first_name} {dataProfile?.last_name}
        </p>
      </div>
      <div
        className="space-y-6 p-6 rounded-lg bg-cover bg-center w-full"
        style={{ backgroundImage: "url('/assets/others/bgSaldo.png')" }}
      >
        <p className="text-white font-semibold">Saldo Anda</p>
        <p className="text-2xl text-white font-bold">
          {showBalance ? formatRupiah(dataBalance) : "Rp ••••••••"}
        </p>
        <div className="flex gap-3 items-center">
          <p
            className="text-white bg-[#F13A2E]  cursor-pointer"
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
  );
}

export default ProfileBalanceCard;
