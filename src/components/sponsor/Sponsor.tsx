import React from "react";

const Sponsor = () => {
  return (
    <div className="mx-auto md-content mt-8 text-center max-w-4xl tracking-wider md:leading-relaxed sm:leading-normal">
      <section className="donate inline-block text-center my-4 mx-auto w-56">
        <div className="icon relative inline-block border-gray-100 dark:border-gray-700 border bg-white dark:bg-gray-800 rounded-full py-3 px-6 z-20"></div>
        <div className="qrcode qrcode-alipay hidden p-4 w-56 h-56 z-50 my-4 mx-auto">
          <img
            className="fade-down max-h-200 dark:filter-60"
            src="https://www.ufec.cn/upload/2020/3/zfb-3314b1aea9224820901f5b3126b22d54.png"
          />
        </div>
        <div className="qrcode qrcode-wechat hidden p-4 w-56 h-56 z-50 my-4 mx-auto">
          <img
            className="fade-down max-h-200 dark:filter-60"
            src="https://www.ufec.cn/upload/2020/3/wx-dfbd638a0ebe467998b6a710a7b75a34.png"
          />
        </div>
      </section>
      <hr className="bg-gray-100 dark:bg-gray-700 "></hr>
    </div>
  );
};

export default Sponsor;
