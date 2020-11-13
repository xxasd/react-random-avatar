import React, { useEffect, useState } from "react";
import { getRandomInt } from "../../utils";

import { mockAvatar } from "./mock";

interface IAvatar {
  uid: string;
  headimg: string;
}

let interval: NodeJS.Timeout;

// Random avatar
function RandomAvatar() {
  // Mock data
  const [avatarList, setAvatarList] = useState<Array<IAvatar>>([]);

  // ComponentDidMount
  useEffect(() => {
    getFackApi();
    return () => clearInterval(interval);
  }, []);

  /** Get mock data */
  const getFackApi = async () => {
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
      let whRandom = getRandomInt(100);
      // Min width height 60px
      whRandom = Math.round(100 * (whRandom < 60 ? 60 : whRandom));
      // Box random position
      let positionRandom = getRandomInt(50);
      // Animation delay time
      let delayRandom = parseFloat((Math.random() * Math.floor(1)).toFixed(1));
      // Return new avatar object
      return {
        ...item,
        width: whRandom,
        height: whRandom,
        left: `${positionRandom}%`,
        top: `${positionRandom}%`,
        aniDelay: delayRandom,
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
    interval = setInterval(() => {
      setAvatarList([]);

      if (playIndex < TDArray.length) {
        randomPushArr(TDArray[playIndex], ODLength);
        playIndex++;
      } else {
        playIndex = 0;
        randomPushArr(TDArray[playIndex], ODLength);
      }
    }, 4000);
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

  return <div>random</div>;
}

export default RandomAvatar;
