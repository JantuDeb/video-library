import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Button from "../../components/loader/Button";
import Input from "../../components/shared/Input";
import Modal from "../../components/shared/modal/Modal";
import { useAuth } from "../../context/auth/AuthContext";

const Profile = () => {
  const {
    authState: { user, loading },
    savePhoto,
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
    setImgURL(user.photo?.secure_url);
    setShowModal(true);
  };

  const fileChangeHandler = (e) => {
    setFile(e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.onload = function (ev) {
      setImgURL(ev.target.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const saveClickHandler = async () => {
    await savePhoto({ email, name, file });
    setShowModal(false);
  };

  return (
    <div className="container profile flex-col center">
      <section className="flex-col center">
        <div className="profile-badge">
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
            <Button
              text="Save"
              loading={loading}
              clickHandler={saveClickHandler}
              btnStyle="btn-red m-1 radius-sm"
            />
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
              <img className="avatar-large" src={imgURL} alt="" />
              <span>
                <input
                  type="file"
                  onChange={fileChangeHandler}
                  className="pointer m-1"
                />
                <Button
                  text="Save"
                  loading={loading}
                  clickHandler={saveClickHandler}
                  btnStyle="btn-red p-0 px-2 m-1 radius-sm"
                />
              </span>
            </div>
          </div>
        </Modal>
      </section>
    </div>
  );
};

export default Profile;
