import React, { useEffect, useState } from "react";
import { getRandomInt } from "../../utils";

import { mockAvatar } from "./mock";

interface IAvatar {
  uid: string;
  headimg: string;
}

// random avatar
function RandomAvatar() {
  // mock data
  const [avatarList, setAvatarList] = useState<Array<IAvatar>>([]);

  // componentDidMount
  useEffect(() => {
    getFackApi();
  }, []);

  /** get mock data */
  const getFackApi = async () => {
    const data = await mockAvatar;

    // step 1：Add random attributes to the avatar
    const randomAvatarList = addAvatarAttributes(data);
  };

  /**
   * Add random attributes to the avatar
   * @param {Array<IAvatar>} arr
   */
  const addAvatarAttributes = (arr: Array<IAvatar>) => {
    return arr.map((item) => {
      // box random width height
      let whRandom = getRandomInt(100);
      // min width height 60px
      whRandom = Math.round(100 * (whRandom < 60 ? 60 : whRandom));
      // box random position
      let positionRandom = getRandomInt(50);
      // animation delay time
      let delayRandom = parseFloat((Math.random() * Math.floor(1)).toFixed(1));
      // return new avatar object
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

  return <div>random</div>;
}

export default RandomAvatar;
