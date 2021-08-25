import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { updateGuide } from "../../store/actions/guideActions";
import { useHistory, useParams } from "react-router";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};
function Rating() {
  const history = useHistory();
  const guideId = useParams().guideId;

  const dispatch = useDispatch();

  const [hoverValue, setHoverValue] = useState(undefined);

  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    dispatch(updateGuide({ rating: value }, guideId));
    history.push("/");
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = (value) => {
    setHoverValue(value);
  };

  return (
    <div style={styles.container}>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={() => handleMouseLeave(index + 1)}
              color={hoverValue > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};

export default Rating;
