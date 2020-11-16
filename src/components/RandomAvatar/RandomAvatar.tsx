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

/**
 * Add random attributes to the avatar
 * @param {Array<IAvatar>} arr
 */
const addAvatarAttributes = (arr: Array<IAvatar>) => {
  return arr.map((item) => {
    // Box random width height
    let whRandom = getRandomInt(30, 50);
    // Box random position
    let positionRandom = getRandomInt(1, 78);
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
    const length = Math.floor(arr.length / ODLength);

    for (let i = 0; i < length; i++) {
      TDArray.push(arr.slice(i * ODLength, (i + 1) * ODLength));
    }
  }

  // Return two-dimensional array and length of one-dimensional array
  return { TDArray, ODLength };
};

/**
 * Random push into one-dimensional
 * @param {Array<IAvatar>} arr The array what you selected
 * @param {number} ODLength Length of one-dimensional array
 */
const randomPushArr = (arr: Array<IAvatar>, ODLength: number) => {
  let TargetArray = Array(ODLength).fill("");

  arr.forEach((item) => {
    // Ignore duplicates
    const index = getRandomInt(1, ODLength - 1);
    TargetArray[index] = item;
  });

  // Return targetArray
  return TargetArray;
};

// Random avatar Function Component
const RandomAvatar: React.FC = () => {
  // Mock data
  const [avatarList, setAvatarList] = useState<Array<IRandomAvatar>>([]);

  // ComponentDidMount
  useEffect(() => {
    const data: any = getFackApi();

    // step 1：Add random attributes to the avatar
    const randomAvatarList = addAvatarAttributes(data);
    // step 2: Divide into a two-dimensional array
    const { TDArray, ODLength } = divideInToTDArray(randomAvatarList);
    // step 3: Timed loop array
    animationPlay(TDArray, ODLength);
    return () => clearInterval(interval);
  }, []);

  /** Get mock data */
  const getFackApi = async () => {
    // You can change it to your real data
    // const data = await mockAvatar;
    return await mockAvatar;
  };

  /**
   * Timed loop array
   * @param {Array<Array<IAvatar>>} TDArray Two-dimensional array
   * @param {number} ODLength Length of one-dimensional array
   */
  const animationPlay = (TDArray: Array<Array<IAvatar>>, ODLength: number) => {
    // The index of the array selected to be played
    let playIndex = 0;

    // step 3: Timed loop array
    interval = window.setInterval(() => {
      let ODArray = Array(ODLength).fill("");
      setAvatarList(ODArray);

      const TargetArray = randomPushArr(TDArray[playIndex], ODLength);
      if (playIndex < TDArray.length) {
        setAvatarList(TargetArray);
        playIndex++;
      } else {
        playIndex = 0;
        setAvatarList(TargetArray);
      }
    }, 4000);
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

export default RandomAvatar;
