function Footer() {
  return (
    <div className="">
      <div className="d-flex justify-content-center align-items-center footer ">
        <div className="mb-3 mt-0 mx-5 ">
          <div className="text-white mb-2 text-left">COINCAP.IO</div>
          <div>
            <p className="li text-left ">Methodology</p>
            <p className="li text-left">Support</p>
            <p className="li text-left">Our API</p>
            <p className="li text-left">Rate Comparison</p>
            <p className="li text-left">Careers</p>
          </div>
        </div>
        <div className="my-3 mt-0 mx-5">
          <div>
            <div className="text-white mb-2 text-left">LEGALS</div>
            <div>
              <p className="li text-left ">Terms of Service</p>
              <p className="li text-left">Privacy Policy</p>
            </div>
          </div>
          <div className="my-3">
            <div className="text-white mb-2 text-left">DISCLAIMER</div>
            <div>
              <p className="li text-left ">
                Neither ShapeShift AG nor CoinCap are in <br /> any way
                associated with CoinMarketCap, <br /> LLC or any of its goods
                and services.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className=" mt-0 mx-5 ">
            <div className="text-white mb-2 text-left">FOLLOW US</div>
            <div>
              <p className="li text-left ">Methodology</p>
              <p className="li text-left">Support</p>
            </div>
          </div>
          <div className=" mt-0 mx-5 ">
            <div className="text-white mb-2 text-left">
              COINCAP APP AVAILABLE ON
            </div>
            <div className="li text-left ">
              <img
                className="li text-left "
                src="https://coincap.io/static/images/stores/google_play.svg"
              />
              <br />
              <img
                className="li text-left "
                src="https://coincap.io/static/images/stores/apple_store.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
