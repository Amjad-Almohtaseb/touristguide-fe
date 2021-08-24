import React, { useState } from "react";
import { FaUserEdit } from "@react-icons/all-files/fa/FaUserEdit";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/actions/authActions";
import { MdSmartphone } from "@react-icons/all-files/md/MdSmartphone";


const UserEdit = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [profile, setProfile] = useState({});
  const [show, setShow] = useState(false);
  const resetForm = () => {
    setProfile({});
  };
  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };
  const handleImage = (event) => {
    setProfile({ ...profile, image: event.target.files[0] });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUser(profile, user.id));
    setShow(false);
    resetForm();
  };
  return (
    <>
      <FaUserEdit
        className=" cursor-pointer  ml-2 mt-2 "
        size={28}
        onClick={() => setShow(true)}
      />
      {show && (
        <form onSubmit={handleSubmit}>
          <div className=" absolute top-16  bg-gray-800 user-form ml-20 p-2 z-10  border-yellow-400 border-2 border-double">
            <div className=" ml-36">
              <br/>
              <label className=" font-bold text-white mr-2 mb-2 mt-3 inline"> Picture </label>

              <input type="file" name="image" onChange={handleImage} />
            </div>
            <hr className=" bg-yellow-400" />

            <div className=" ml-36">
            <label className=" font-bold text-white mr-2 my-2"> Gender </label>
              <select
                name="gender"
                className=" w-28 pl-1 "
                required
                onChange={handleChange}
              >
                <option disabled="disabled" selected="selected">
                  Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>


           
            <hr className=" bg-yellow-400" />

            <div className=" ml-36">
              <label className=" font-bold text-white mr-2 my-2">
                Phone
                 </label>

              <input
                placeholder="+962-000000000"
                type="tel"
                name="phone"
                className=" border-1 w-36 pl-1 "
                onChange={handleChange}
              />
            </div>

            <hr className=" bg-yellow-400" />

            <button
              className="  bg-red-600 text-white font-bold py-2 px-4 rounded-full mb-3 ml-28 z-50 "
              onClick={() => setShow(false)}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className=" bg-yellow-500 text-white font-bold py-2 px-4 rounded-full ml-20 w-28 "
            >
              SAVE
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default UserEdit;