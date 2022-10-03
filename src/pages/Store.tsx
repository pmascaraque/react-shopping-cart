import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";

type StoreItemProps = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export function Store() {
  const [data, setData] = useState<null | StoreItemProps[]>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const newData = await response.json();

      setData(newData);
    };

    fetchData();
    console.log(data);
  }, []);

  return (
    <>
      <h1>Store</h1>
      <Row xs={1} md={2} lg={3} className='g-3'>
        {data && (data.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        )))}
      </Row>
    </>
  );
}
