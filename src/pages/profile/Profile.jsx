import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Input from "../../components/shared/Input";
import Modal from "../../components/shared/modal/Modal";
import { LOGIN } from "../../context/auth/auth-reducer";
import { useAuth } from "../../context/auth/AuthContext";
import { axiosInstance } from "../../utils/axios-instance";

const Profile = () => {
  const {
    authState: { user },
    authDispatch,
  } = useAuth();
  const [userData, setUserData] = useState({
    email: user.email,
    name: user.name,
  });

  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(false);
  const [imgURL, setImgURL] = useState(false);
  const [edinting, setEditing] = useState(false);

  const { email, name } = userData;
  const inputChangeHandler = (e) => {
    setUserData((user) => ({ ...user, [e.target.name]: e.target.value }));
  };

  const editProfilePhoto = () => {
    console.log(user.photo?.secure_url);
    setImgURL(user.photo?.secure_url);
    setShowModal(true);
  };

  const fileChangeHandler = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.onload = function (ev) {
      setImgURL(ev.target.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const savePhoto = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);
    if (file) formData.append("photo", file);
    try {
      const { data } = await axiosInstance.post(
        "user/update_user_details",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.success) authDispatch({ type: LOGIN, payload: data.user });
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container profile flex-col center">
      <section className="flex-col center">
        <div class="profile-badge">
          <img
            className="avatar-large"
            src={`${
              user.photo
                ? user.photo?.secure_url
                : "https://www.wydawnictwoliteratura.pl/pub/skin/wyd-skin/img/avatar.png"
            }`}
            alt=""
          />
          <button className="btn-red btn-edit" onClick={editProfilePhoto}>
            Edit
          </button>
        </div>

        <form className="signup-container radius-md py-1">
          <Input
            type="email"
            name="email"
            value={email}
            inputChangeHandler={inputChangeHandler}
            placeholder="Email address"
            disable={!edinting}
          />
          <Input
            name="name"
            value={name}
            inputChangeHandler={inputChangeHandler}
            placeholder="Full name"
            disable={!edinting}
          />
        </form>
        <div
          className={`flex w-full ${
            edinting ? "justify-between" : "justify-end"
          } `}
        >
          <button
            onClick={() => setEditing((v) => !v)}
            className="btn-red m-1 radius-sm"
          >
            {edinting ? "Cancel" : "Update details"}
          </button>
          {edinting && (
            <button onClick={savePhoto} className="btn-red m-1 radius-sm">
              Save
            </button>
          )}
        </div>
        <Modal show={showModal}>
          <div className="bg-secondary ">
            <div className="flex justify-end">
              <button
                className="transparent p-0"
                onClick={() => setShowModal(false)}
              >
                <MdClose size={20} color="white" />
              </button>
            </div>
            <div className="flex-col items-center">
              <img class="avatar-large" src={imgURL} alt="" />
              <span>
                <input
                  type="file"
                  onChange={fileChangeHandler}
                  className="pointer m-1"
                />
                <button
                  onClick={savePhoto}
                  className="btn-red p-0 px-2 m-1 radius-sm"
                >
                  Save
                </button>
              </span>
            </div>
          </div>
        </Modal>
      </section>
    </div>
  );
};

export default Profile;
