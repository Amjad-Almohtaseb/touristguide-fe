import { FETCH_GUIDES, SEARCH_GUIDES, UPDATE_GUIDE } from "./types";
import instance from "./instance";

export const fetchGuides = () => {
  return async (dispatch) => {
    try {
      const res = await instance.get("/guides");

      dispatch({
        type: FETCH_GUIDES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateGuide = (updatedGuide, guideId) => {
  return async (dispatch) => {
    try {
      await instance.put(`/guide/${guideId}`, updatedGuide);
      dispatch({
        type: UPDATE_GUIDE,
        payload: {
          updatedGuide: updatedGuide,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const searchGuide = (searchInfo, history) => {
  return async (dispatch) => {
    try {

      const res = await instance.post("/search");
      dispatch({
        type: SEARCH_GUIDES,
        payload: res.data,
      });
        history.push("/guidelist");
    } catch (error) {
      console.log(error.message);
    }
  };
};
