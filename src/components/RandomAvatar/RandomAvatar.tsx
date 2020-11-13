import React, { useEffect, useState } from "react";
import { getRandomInt } from "../../utils";
import "./randomAvatar.css";

// mock
import { mockAvatar } from "./mock";

interface IAvatar {
  uid: string;
  headimg: string;
}

interface IRandomAvatar extends IAvatar {
  width: number;
  height: number;
  left: string;
  top: string;
  delay: string;
}

let interval: number;

// Random avatar Function Component
const RandomAvatar: React.FC<{
  duration?: number; // Animation time
}> = ({ duration }) => {
  // Mock data
  const [avatarList, setAvatarList] = useState<Array<IRandomAvatar>>([]);

  // ComponentDidMount
  useEffect(() => {
    getFackApi();
    return () => clearInterval(interval);
  }, []);

  /** Get mock data */
  const getFackApi = async () => {
    // You can change it to your real data
    const data = await mockAvatar;

    // step 1：Add random attributes to the avatar
    const randomAvatarList = addAvatarAttributes(data);
    // step 2: Divide into a two-dimensional array
    divideInToTDArray(randomAvatarList);
  };

  /**
   * Add random attributes to the avatar
   * @param {Array<IAvatar>} arr
   */
  const addAvatarAttributes = (arr: Array<IAvatar>) => {
    return arr.map((item) => {
      // Box random width height
      let whRandom = getRandomInt(50);
      // Min width height 30px
      whRandom = whRandom < 30 ? 30 : whRandom;
      // Box random position
      let positionRandom = getRandomInt(25);
      // Animation delay time
      let delayRandom = parseFloat((Math.random() * Math.floor(1)).toFixed(1));
      // Return new avatar object
      return {
        ...item,
        width: whRandom,
        height: whRandom,
        left: `${positionRandom}%`,
        top: `${positionRandom}%`,
        delay: `${delayRandom}s`,
      };
    });
  };

  /**
   * Divide into a two-dimensional array
   * @param {Array<IAvatar>} arr
   * @param {number} ODLength Length of one-dimensional array
   */
  const divideInToTDArray = (arr: Array<IAvatar>, ODLength: number = 12) => {
    let TDArray: Array<Array<IAvatar>> = [];

    // If the avatar length is less than the one-dimensional length
    if (arr.length < ODLength) {
      TDArray = [arr];
    } else {
      // Put into a new array according to the one-dimensional length
      const length = Math.round(arr.length / ODLength);

      for (let i = 0; i < length; i++) {
        TDArray.push(arr.slice(i * ODLength, (i + 1) * ODLength));
      }
    }

    // The index of the array selected to be played
    let playIndex = 0;

    // step 3: Timed loop array
    interval = window.setInterval(() => {
      setAvatarList([]);

      if (playIndex < TDArray.length) {
        randomPushArr(TDArray[playIndex], ODLength);
        playIndex++;
      } else {
        playIndex = 0;
        randomPushArr(TDArray[playIndex], ODLength);
      }
    }, duration);
  };

  /**
   * Random push into one-dimensional
   * @param {Array<IAvatar>} arr
   * @param {number} ODLength Length of one-dimensional array
   */
  const randomPushArr = (arr: Array<IAvatar>, ODLength: number) => {
    let ODArray = Array(ODLength).fill("");

    arr.forEach((item) => {
      // Ignore duplicates
      const index = getRandomInt(ODLength);
      ODArray[index] = item;
    });

    // step 4: Set avatar into view
    setAvatarList(ODArray);
  };

  return (
    <div className="random-avatar-panel">
      {avatarList.map((item: IRandomAvatar, index: number) => {
        return (
          <div key={index} className="random-avatar-item">
            {item && (
              <img
                alt="avatar"
                style={{
                  width: `${item.width}px`,
                  height: `${item.height}px`,
                  left: item.left,
                  top: item.top,
                  marginLeft: `-${item.width / 2}px`,
                  marginTop: `-${item.height / 2}px`,
                  animationDelay: item.delay,
                }}
                src={item.headimg}
                className="avatar-show"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

RandomAvatar.defaultProps = {
  duration: 4000,
};

export default RandomAvatar;
