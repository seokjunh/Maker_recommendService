import axios from 'axios';
import Cookies from 'js-cookie';

const addBookmarkPlace = async (
  code,
  name,
  roadAddress,
  address,
  lat,
  lng,
  setHasPlace
) => {
  await axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: `${Cookies.get('token')}`,
    },
    url: `${process.env.NEXT_PUBLIC_SERVER}/place/add`,
    data: {
      userid: Cookies.get('userid'),
      category_id: code,
      place_name: name,
      address,
      roadAddress,
      lat,
      lng,
    },
    withCredentials: true,
  })
    .then((res) => {
      return res.data.success;
    })
    .then((success) => {
      success
        ? setHasPlace('북마크했어요!')
        : setHasPlace('이미 북마크했어요!');
    });
};

export default addBookmarkPlace;
