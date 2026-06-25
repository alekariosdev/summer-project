const createImageHeightGetter = () => {
  let count = 0;
  let row = 1;

  const tall = 300;
  const short = 200;

  return (id: number) => {
    count++;

    const height = row % 2 === 0 ? (id % 2 === 0 ? short : tall) : id % 2 === 0 ? tall : short;

    if (count === 4) {
      row++;
      count = 0;
    }

    return height;
  };
};

const getImageHeight = createImageHeightGetter();

export default getImageHeight;
