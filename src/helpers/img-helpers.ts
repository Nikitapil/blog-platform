import axios from 'axios';

export const createImgLink = (link: string) =>
  `${process.env.REACT_APP_API_URL}/${link}`;

export const imgURLToFile = async (url: string) => {
  const response = await axios.get(createImgLink(url), {
    responseType: 'blob'
  });
  const fileName = url.split('.')[0];
  const file = new File([response.data], fileName, {
    type: response.data.type
  });
  return file;
};
