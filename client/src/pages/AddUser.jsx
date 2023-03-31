import React, { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";

import { login } from "../store/User";
import { toast, ToastContainer } from "react-toastify";

const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const [choosePP, setChoosePP] = useState("avatar");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const lang = useSelector((state) => state.lang.lang);
  const user = useSelector((state) => state.user.user);
  const addUserAPI = process.env.REACT_APP_ADD_USER;
  const getUser = process.env.REACT_APP_GET_ACC;

  //Update User
  const updateUser = async () => {
    try {
      const res = await axios.get(`${getUser}${user._id}`);

      dispatch(login(res.data));
      await setLoading(false);
      navigate("/chooseUser");
    } catch (error) {
      setLoading(false);
    }
  };
  const addToast = (message) => toast.error(message);
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex flex-col gap-2">
        <div className="text-4xl font-semibold">
          {lang === "en" ? "Add Profile" : "Profil Ekle"}
        </div>
        <div className="text-sm text-gray-600">
          {lang === "en"
            ? "Add a profile for another person watching Netflix."
            : "Arkadaşların'ın da Netflix izliyelbilmesi için bir profil ekle."}
        </div>
        <div>
          <Formik
            initialValues={{
              name: "",
            }}
            validationSchema={Yup.object({
              name: Yup.string().required(
                `${
                  lang === "en"
                    ? "Name cannot be left blank"
                    : "İsim boş bırakılamaz"
                }`
              ),
            })}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              try {
                setLoading(true);

                await axios.put(`${addUserAPI}${user._id}`, {
                  name: values.name,
                  image: choosePP,
                });
                setSubmitting();
                updateUser();
              } catch (error) {
                setSubmitting();
                setLoading(false);
                addToast(
                  lang === "en"
                    ? "Unfortunately, there can be a maximum of 3 users."
                    : "Ne yazık ki, maksimum 3 kullanıcı olabilir."
                );
              }
            }}
          >
            {({
              values,
              handleSubmit,
              touched,
              handleChange,
              errors,
              isSubmitting,
            }) => (
              <form
                className="text-white items-center bg-black  my-auto  mx-auto  rounded-md flex  gap-2"
                onSubmit={handleSubmit}
              >
                <div
                  className="relative group cursor-pointer"
                  onClick={() => setShowModal(true)}
                >
                  <div
                    className="flex items-center justify-center w-[80px] h-[80px] bg-cover bg-center cursor-pointer  "
                    style={{
                      backgroundImage: `url('/images/${choosePP}.jpg')`,
                    }}
                  ></div>
                  <div className="hidden group-hover:block text-4xl border-2 p-1 border-gray-400 rounded-full text-gray-400 z-30 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <MdEdit />
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="relative flex flex-col ">
                    <input
                      type="text"
                      id="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder={lang === "en" ? "Name" : "İsim"}
                      className={`${
                        errors.name && touched.name
                          ? "border-b-2 border-orange-500"
                          : ""
                      } h-[30px] bg-zinc-600 focus:bg-zinc-500 duration-300 outline-none text-white p-2 w-[200px] rounded-sm`}
                    />
                    {errors.name && touched.name && (
                      <div className="text-orange-500 text-sm">
                        {errors.name}
                      </div>
                    )}
                  </div>

                  <div className="h-[30px]">
                    <button
                      className="w-full h-full bg-red-600 px-2 py-1 rounded-sm"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      <div>
                        {loading === true ? (
                          <BiLoaderAlt className="animate-spin mx-auto text-black text-xl" />
                        ) : (
                          <div> {lang === "en" ? "Add" : "Ekle"}</div>
                        )}
                      </div>
                    </button>
                  </div>
                </div>
                <div
                  className={`${
                    showModal === true ? "block" : "hidden"
                  } absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5 flex gap-2 bg-black`}
                >
                  <div>
                    <div
                      className="h-[40px] w-[40px] bg-cover bg-center cursor-pointer"
                      style={{
                        backgroundImage: "url('/images/avatar.jpg')",
                      }}
                      onClick={() => {
                        setChoosePP("avatar");
                        setShowModal(false);
                      }}
                    />
                  </div>
                  <div>
                    <div
                      className="h-[40px] w-[40px] bg-cover bg-center cursor-pointer"
                      style={{
                        backgroundImage: "url('/images/Netflix-avatar.jpg')",
                      }}
                      onClick={() => {
                        setChoosePP("Netflix-avatar");
                        setShowModal(false);
                      }}
                    />
                  </div>
                  <div>
                    <div
                      className="h-[40px] w-[40px] bg-cover bg-center cursor-pointer"
                      style={{
                        backgroundImage: "url('/images/avatar2.jpg')",
                      }}
                      onClick={() => {
                        setChoosePP("avatar2");
                        setShowModal(false);
                      }}
                    />
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
