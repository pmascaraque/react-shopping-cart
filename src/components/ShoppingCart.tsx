import { useEffect, useState } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";

type ShoppingCartProps = {
  isOpen: boolean;
};

type StoreItemProps = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [data, setData] = useState<null | StoreItemProps[]>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const newData = await response.json();

      setData(newData);
    };

    fetchData();
  }, []);
  
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          {data && (<div className='ms-auto fw-bold fs-5'>
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = data.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>)}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
