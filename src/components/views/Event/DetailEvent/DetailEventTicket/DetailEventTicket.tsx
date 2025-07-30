import { ICart, ITicket } from "@/types/Ticket";
import { convertIDR } from "@/utils/currency";
import { Accordion, AccordionItem, Button, Card, Chip } from "@heroui/react";
import { useSession } from "next-auth/react";
import React from "react";

type Props = {
  tickets: ITicket[];
  carts: ICart[];
  handleAddToCart: (value: string) => void;
};

const DetailEventTicket = ({ tickets, handleAddToCart, carts }: Props) => {
  const session = useSession();

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground-700">Tickets</h2>
      {tickets?.length > 0 &&
        tickets?.map((row) => {
          return (
            <Card className="mb-2 px-4 pb-4" key={row.id}>
              <Accordion>
                <AccordionItem
                  key={row.id}
                  aria-label={row.name}
                  title={
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-foreground-700">
                        {row.name}
                      </h2>
                      {Number(row?.quantity) > 0 ? (
                        <Chip size="sm" color="success" variant="bordered">
                          {`${row.quantity} Available`}
                        </Chip>
                      ) : (
                        <Chip size="sm" color="danger" variant="bordered">
                          {`${row.quantity} Sold out`}
                        </Chip>
                      )}
                    </div>
                  }
                  className="border-b-2 border-dashed"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p>{row.description}</p>
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
              <div className="mt-2 flex items-center justify-between p-2">
                <h2 className="text-xl font-semibold text-foreground-700">{`${convertIDR(row.price)}`}</h2>
                {session?.status === "authenticated" &&
                  Number(row?.quantity) > 0 && (
                    <Button
                      size="md"
                      color="warning"
                      variant="bordered"
                      className="font-bold text-warning-500 disabled:opacity-20"
                      onPress={() => handleAddToCart(`${row.id}`)}
                      disabled={carts
                        ?.map((cart: ICart) => cart?.ticketId)
                        ?.includes(`${row.id}`)}
                    >
                      Add to cart{" "}
                    </Button>
                  )}
              </div>
            </Card>
          );
        })}
    </div>
  );
};

export default DetailEventTicket;
