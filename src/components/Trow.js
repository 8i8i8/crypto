function Trow({ data, css }) {
  const img = data?.symbol?.toLowerCase();

  const roundOff = (a) => {
    return Number(a).toFixed(2);
  };
  const twoDecimal = (num) => {
    if (num > 999 && num < 1000000) {
      return roundOff(num / 10 ** 3) + "k";
    } else if (num > 999999 && num < 1000000000) {
      return roundOff(num / 10 ** 6) + "m";
    } else if (num > 999999999 && num < 1000000000000) {
      return roundOff(num / 10 ** 9) + "b";
    } else if (num > 999999999999) {
      return roundOff(num / 10 ** 12) + "t";
    } else {
      return roundOff(num);
    }
  };
  const css2 = () => {
    if (data.changePercent24Hr >= 0) {
      return " text-right text-success p-4";
    } else if (data.changePercent24Hr < 0) {
      return " text-right text-danger p-4";
    }
  };
  return (
    <>
      <tr key={data.id} className={css}>
        <td className=" p-4">{data.rank}</td>
        <td className="text-left  d-flex ">
          <img
            className="mx-3 mt-2 img"
            src={`https://assets.coincap.io/assets/icons/${img}@2x.png`}
            alt="img"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "https://coincap.io/static/logo_mark.png";
            }}
          />
          <div className="m-0 p-0">
            <p className=" m-0 p-0">
              {data.name}
              <br />
              <p className="text-muted m-0">{data.symbol}</p>
            </p>
          </div>
        </td>
        <td className="text-right p-4">${roundOff(data.priceUsd)} </td>
        <td className="text-right p-4">${twoDecimal(data.marketCapUsd)}</td>
        <td className="text-right p-4">${twoDecimal(data.vwap24Hr)}</td>
        <td className="text-right p-4">{twoDecimal(data.supply)}</td>
        <td className="text-right p-4">${twoDecimal(data.volumeUsd24Hr)}</td>
        <td className={css2()}>{twoDecimal(data.changePercent24Hr)}%</td>
      </tr>
    </>
  );
}

export default Trow;
