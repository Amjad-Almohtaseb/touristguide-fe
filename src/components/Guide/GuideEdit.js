import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-day-picker/lib/style.css";
import DatePicker from "react-multi-date-picker";

//icons
import { ImLocation2 } from "@react-icons/all-files/im/ImLocation2";
import { FaArrowCircleRight } from "@react-icons/all-files/fa/FaArrowCircleRight";

//Mapbox
import ReactMapGL, { Marker } from "react-map-gl";
import { MapKey } from "../Map/MapKey";

import { updateGuide } from "../../store/actions/guideActions";

const GuideEdit = ({ guide }) => {
  //to get this format "yyyy-mm-dd" from calendar
  let array;
  const arrayOfDate = (values) => {
    if (values) {
      const dates = values.map(
        (value) =>
          value.year.toString() +
          "-" +
          value.month.number.toString() +
          "-" +
          value.day.toString()
      );

      array = dates.map((date) => {
        if (!+date.slice(5, 7)) {
          date = date.slice(0, 5) + "0" + date.slice(5, 9);
        }

        if (date.length === 9) {
          date = date.slice(0, 8) + "0" + date[8];
        }
        return date;
      });
    }
    return array;
  };

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const guides = useSelector((state) => state.guides.guides);
  const cities = useSelector((state) => state.cities.cities);
  const guideId = guides.find((guide) => guide.user._id === user.id)._id;

  const [guideInfo, setGuideInfo] = useState({
    city: guide.city ? guide.city._id : "612768c8f33f6a16e4282fb5",
    price: guide.price,
    maxsize: guide.maxsize,
    description: guide.description,
    notAvailabeDates: guide.notAvailabeDates,
    location: guide.location,
  });



  const cityLngLat = cities.find(
    (city) => city._id === guideInfo.city
  ).location;

  useEffect(() => {
    setViewport({
      ...viewport,
      longitude: cityLngLat[0],
      latitude: cityLngLat[1],
    });
  }, [cityLngLat]);

  const [viewport, setViewport] = useState({
    width: "500px",
    height: "450px",
    zoom: 11,
    longitude: 32.866287,
    latitude: 39.925533,
  });


  const handleChange = (event) => {
    setGuideInfo({ ...guideInfo, [event.target.name]: event.target.value });
  };

  const handleCalendar = (r) => {
    setGuideInfo({ ...guideInfo, notAvailabeDates: arrayOfDate(r) });
  };

  const handleMap = (event) => {
    setGuideInfo({ ...guideInfo, location: event.lngLat });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateGuide(guideInfo, guideId));
    setShow(false);
  };

  return (
    <>
      {guide.city && guide.price ? (
        <div
          className="  flex items-center md:border-2 rounded-full py-2 w-80 absolute bg-white cursor-pointer guide-btn "
          onClick={() => setShow(true)}
        >
          <span className=" flex-grow pl-5 bg-transparent outline-none text-base text-gray-600  ">
            Edit Your Work Information
          </span>

          <FaArrowCircleRight className="hidden md:inline-flex h-8 bg-yellow-500 text-white rounded-full p-2  md:mx-2 w-10" />
        </div>
      ) : (
        <div
          className="  flex items-center md:border-2 rounded-full py-2 w-80 absolute bg-white cursor-pointer guide-btn  animate-bounce"
          onClick={() => setShow(true)}
        >
          <span className=" flex-grow pl-5 bg-transparent outline-none text-base text-gray-600 ">
            Fill The Form To Start Your Job
          </span>

          <FaArrowCircleRight className="hidden md:inline-flex h-8 bg-yellow-500 text-white rounded-full p-2  md:mx-2 w-10" />
        </div>
      )}

      {show && (
        <form onSubmit={handleSubmit} className=" z-50">
          <div className=" absolute -top-4 bg-gray-800 guide-form  p-2 z-10  border-yellow-400 border-2 border-double ">
            <div className=" flex flex-row justify-evenly flex-wrap pt-3 pb-2">
              <span>
                <label className=" font-semibold text-white "> Your City </label> &nbsp;
               
                <select
                  name="city"
                  className=" w-28 "
                  onChange={handleChange}
                  value={guideInfo.city}
                  // required
                >
                  <option disabled="disabled" selected="selected">
                    Choose The City
                  </option>
                  {cities.map((city) => (
                    <option name={city.name} value={city._id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </span>
              <span>
                <label className=" font-semibold text-white "> Price Per Person &nbsp; </label>

                <input
                className="w-10 pl-1 outline-none "
                  type="number"
                  name="price"
                  value={guideInfo.price}
                  onChange={handleChange}
                  min={1}
                  required
                  
                />
              </span>
              <span>
                <label className=" font-semibold text-white ">

                  Max Group Size &nbsp;
                </label>

                <input
                className="w-10 pl-1 outline-none"
                  type="number"
                  name="maxsize"
                  value={guideInfo.maxsize}
                  onChange={handleChange}
                  min={1}
                  required
                />
              </span>
              <span>
                <label className=" font-semibold text-white ">
                  {" "}
                  Your Holidays &nbsp;
                </label>

                <DatePicker
                  multiple
                  onChange={handleCalendar} //{setValues}
                  minDate={new Date()}
                  value={guideInfo.notAvailabeDates}
                  // format="dd/mm/yyyy"
                />
              </span>
            </div>
            <hr className=" bg-yellow-400" />

            <div className=" flex flex-row justify-evenly">
              {guideInfo.city && (
                <span title="Pin Your Zone 📍">
                  <ReactMapGL
                    mapStyle="mapbox://styles/ibrashaheen/cksuo05dc5cbt17qi3km6hx75"
                    mapboxApiAccessToken={MapKey}
                    onClick={handleMap} //very important (solution key)
                    {...viewport}
                    onViewportChange={(nextViewport) =>
                      setViewport(nextViewport)
                    }
                      className=" border-1 border-yellow-400"

                  >
                    <Marker //TO DOOOOOOOOOOOOOOOOOOOOOO
                      longitude={guideInfo.location[0] || 0}
                      latitude={guideInfo.location[1] || 0}
                      // longitude={0}
                      // latitude={0}
                      offsetLeft={-20}
                      offsetTop={-10}
                    >
                      <p className=" cursor-pointer text-2xl animate-pulse  ">
                        <ImLocation2 color="red" size={35} />‏
                      </p>
                    </Marker>
                  </ReactMapGL>
                </span>
              )}

              <span className=" my-auto">
                <label className=" font-semibold text-white "> Description </label>
                <br />
                <textarea
                className="pl-2"
                  name="description"
                  rows="6"
                  cols="35"
                  onChange={handleChange}
                  value={guideInfo.description}
                />
              </span>
            </div>
            <hr className=" bg-yellow-400" />
            <span className=" flex flex-row justify-evenly items-center">
              <button
                className="  bg-red-600 font-bold py-2 px-4 rounded-full mb-3 w-36  text-white "
                onClick={() => setShow(false)}
              >
                CANCEL
              </button>
              <button
                type="submit"
                className=" bg-yellow-500 text-white mb-3  font-bold py-2 px-4 rounded-full  w-36 "
              >
                SAVE
              </button>
            </span>
          </div>
        </form>
      )}
    </>
  );
};

export default GuideEdit;
