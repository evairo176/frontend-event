import { ICart, ITicket } from "@/types/Ticket";
import { convertIDR } from "@/utils/currency";
import { Button, Card, CardBody, CardFooter, Divider } from "@heroui/react";
import { Minus, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  carts: ICart[];
  getTicketDataInCart: (ticketId: string) => ITicket; // Replace with the actual type if available,
  handleChangeQuantity: (
    ticketId: string,
    type: "increment" | "decrement",
  ) => void;
  onCreateOrder: () => void;
  isLoadingCreateOrder: boolean;
};

const DetailEventCart = ({
  carts,
  getTicketDataInCart,
  handleChangeQuantity,
  onCreateOrder,
  isLoadingCreateOrder,
}: Props) => {
  const session = useSession();
  const router = useRouter();
  return (
    <Card radius="lg" className="border-none p-6 lg:sticky lg:top-[80px]">
      {session?.status === "authenticated" && (
        <>
          <CardBody className="gap-2">
            <h2 className="text-xl font-semibold text-foreground-700">Cart</h2>
            {carts?.length > 0 ? (
              <>
                {carts?.map((cart) => {
                  const ticket: ITicket = getTicketDataInCart(cart.ticketId);
                  return (
                    <div key={cart.ticketId}>
                      {cart?.ticketId === "" ? (
                        <p>Your cart is empty</p>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <h4 className="font-bold"> {ticket?.name}</h4>
                            <p className="font-bold text-green-500">
                              {convertIDR(
                                Number(ticket?.price) * cart?.quantity,
                              )}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="md"
                              variant="bordered"
                              isIconOnly
                              className="scale-80 rounded-full"
                              onPress={() =>
                                handleChangeQuantity(
                                  `${cart?.ticketId}`,
                                  "decrement",
                                )
                              }
                              color="danger"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="text-sm font-bold">
                              {cart?.quantity}
                            </span>
                            <Button
                              size="md"
                              variant="bordered"
                              isIconOnly
                              className="scale-80 rounded-full"
                              onPress={() =>
                                handleChangeQuantity(
                                  `${cart?.ticketId}`,
                                  "increment",
                                )
                              }
                              color="default"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              "Your cart is empty"
            )}
            <Divider />
          </CardBody>

          <CardFooter>
            <Button
              fullWidth
              color="danger"
              size="md"
              disabled={carts?.length < 1 || isLoadingCreateOrder}
              className="disabled:opacity-20"
              onPress={onCreateOrder}
            >
              {isLoadingCreateOrder ? "Processing..." : "Checkout"}
            </Button>
          </CardFooter>
        </>
      )}

      {session?.status !== "authenticated" && (
        <CardBody className="text-center">
          <p className="mb-4 text-sm text-foreground-500">
            Please login to add tickets to your cart.
          </p>
          <Button
            color="danger"
            size="lg"
            as={Link}
            href={`/auth/login?callbackUrl=/event/${router?.query?.slug}`}
          >
            Login for book ticket
          </Button>
        </CardBody>
      )}
    </Card>
  );
};

export default DetailEventCart;
