import React from "react";
import Link from "next/link";
import Image from "next/image";

type Iprops = {
  logoClass: any;
}

const Logo = ({ logoClass }: Iprops) => {
  return (
    <div className={`${logoClass ? logoClass : ""}`}>
      <Link passHref href={"/"}>
        <Image priority width={120} height={80} alt="LOGO" src={"/assets/img/logo/logo.png"} />
      </Link>
    </div>
  );
};

export default Logo;
