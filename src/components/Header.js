

function Header() {
  return (
    <nav className=" nav navbar navbar-fixed-top shadow ">
      <div className="container">
        <div className="">
          <a className="mx-2">Coins</a>
          <a className="mx-2">Exchange</a>
          <a className="mx-2">Swap</a>
        </div>

        <div className=" mx-auto my-2">
          <img
            className="image"
            src="https://coincap.io/static/logos/black.svg"
          />
        </div>
        <button className="btn  rounded-pill shadow green px-4">
          Connect Wallet
        </button>
      </div>
    </nav>
  );
}

export default Header;
