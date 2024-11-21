import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  getProfile,
  updateProfile,
  updateProfilePicture,
} from "../services/apiService";
import InputField from "../components/InputField";
import { useFormik } from "formik";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { RiPencilFill } from "react-icons/ri";
import LoadingPage from "../components/LoadingPage";

const Profile = () => {
  const [dataProfile, setDataProfile] = useState([]);
  const [editTogle, setEditTogle] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileSizeLimit = 100 * 1024; 
      const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];

      if (file.size > fileSizeLimit) {
        toast.error(
          "Ukuran file melebihi 100 KB. Silakan unggah file yang lebih kecil."
        );
        return;
      }

      if (!allowedFormats.includes(file.type)) {
        toast.error(
          "Format file tidak valid. Hanya file JPEG, JPG, dan PNG yang diperbolehkan."
        );
        return;
      }

      const formData = new FormData();
      setSelectedImage(URL.createObjectURL(file));
      formData.append("file", file);
      handleUploadProfilePicture(formData);
    } else {
      toast.error("Tidak ada file yang dipilih. Silakan pilih file.");
    }
  };

  const handleUploadProfilePicture = async (formData) => {
    try {
      toast.promise(updateProfilePicture(formData), {
        loading: "Uploading Image...",
        success: (res) => {
          if (res.status === 0) {
            return res.message;
          }
        },
        error: (err) => {
          return err.message;
        },
      });
    } catch (error) {}
  };

  const profilePicture =
  selectedImage ||
  (dataProfile.profile_image && !dataProfile.profile_image.includes('null') ? dataProfile.profile_image : "/assets/others/profilePhoto.png");



  const getDataProfile = async () => {
    try {
      const res = await getProfile();
      setDataProfile(res.data);
      formik.setValues(res.data);
    } catch (error) {}
  };


  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Berhasil logout!");
  };

  const formik = useFormik({
    initialValues: dataProfile,
    onSubmit: async (values) => {
      const payload = {
        first_name: values.first_name,
        last_name: values.last_name,
      };

      try {
        toast.promise(updateProfile(payload), {
          loading: "Processing...",
          success: (res) => {
            if (res.status === 0) {
              setRefresh((prev) => !prev);
              setEditTogle((prev) => !prev);
              return "Update Profile Berhasil";
            }
          },
          error: (err) => {
            return err.message;
          },
        });
      } catch (error) {}
    },
  });

  useEffect(() => {
    getDataProfile();
    setRefresh(false);
  }, [refresh]);

  if (dataProfile.length === 0){
    return(
      <LoadingPage />
    )
  }
  return (
    <>
      <Layout>
        <section className="flex items-center justify-center lg:px-80">
          <div className="space-y-6 w-full">
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border"
                />
                <label
                  htmlFor="upload-input"
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow cursor-pointer"
                >
                  <RiPencilFill className="text-sm text-gray-500" />
                </label>
                <input
                  id="upload-input"
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <p className="font-semibold text-lg text-center">
              {dataProfile?.first_name} {dataProfile?.last_name}
            </p>
            <div className="w-full">
              <p className="text-sm font-semibold mb-1">Email</p>
              <InputField
                disabled={true}
                type="email"
                name="email"
                placeholder="masukan email anda"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                icon={MdOutlineAlternateEmail}
              />
            </div>
            <div className="w-full">
              <p className="text-sm font-semibold mb-1">Nama Depan</p>
              <InputField
                disabled={!editTogle ? true : false}
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
            <div className="w-full">
              <p className="text-sm font-semibold mb-1">Nama Belakang</p>
              <InputField
                disabled={!editTogle ? true : false}
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
            {!editTogle && (
              <>
                <button
                  onClick={() => setEditTogle(!editTogle)}
                  className="w-full border border-red-500 text-red-500 py-2 rounded  font-semibold"
                >
                  Edit Profile
                </button>{" "}
                <br />
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 font-semibold"
                >
                  Logout
                </button>
              </>
            )}
            {editTogle && (
              <>
                <button
                  onClick={() => setEditTogle(!editTogle)}
                  className="w-full border border-red-500 text-red-500 py-2 rounded  font-semibold"
                >
                  Batalkan
                </button>
                <button
                  type="submit"
                  onClick={formik.handleSubmit}
                  className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 font-semibold"
                >
                  Simpan
                </button>{" "}
                <br />
              </>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Profile;
