import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getData } from "@/services";

export default (props: any) => {
  const navigate = useNavigate();
  useEffect(() => {
    const main = async () => {
      const res: any = await getData({});
      localStorage.setItem("token", res?.data.token);
    };
    main();
  }, []);
  return (
    <div>
      {/*<Link to={'/test'}>*/}
      {/*    to test*/}
      {/*</Link>*/}
      <div
        onClick={() => {
          navigate("/demo");
        }}
      >
        跳转
      </div>
    </div>
  );
};
