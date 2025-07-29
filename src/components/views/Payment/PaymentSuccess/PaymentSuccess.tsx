import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

const PaymentSuccess = (props: Props) => {
  const { push, query } = useRouter();
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          alt="logo"
          src={"/images/general/logo.svg"}
          width={180}
          height={180}
        />
        <Image
          alt="success"
          src={"/images/illustration/success.svg"}
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-danger-500">Payment success</h1>
        <p className="text-xl font-bold text-gray-400">
          Check detail your order
        </p>
        <Button
          onPress={() => push(`/member/transaction/${query.order_id}`)}
          className="mt-4 w-fit"
          variant="bordered"
          color="danger"
        >
          Detail
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
