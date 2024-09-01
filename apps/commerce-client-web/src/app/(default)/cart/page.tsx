'use client';

import React, { useState } from 'react';
import CartItemList from './components/cart-item-list';
import CartSummary from './components/cart-summary';

const CartPage: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, title: '상품1', price: 10000, selectNum: 2, selected: true, imgSrc: '', shippingInfo: '무료' },
    { id: 2, title: '상품2', price: 20000, selectNum: 1, selected: true, imgSrc: '', shippingInfo: '무료' },
  ]);

  const handleRemove = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleSelectNumChange = (id: number, newSelectNum: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selectNum: newSelectNum } : item
      )
    );
  };

  const handleSelectChange = (id: number, selected: boolean) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected } : item
      )
    );
  };

  const handleToggleAll = (isChecked: boolean) => {
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        selected: isChecked,
      }))
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">장바구니</h1>
      <CartItemList
        items={items}
        onRemove={handleRemove}
        onSelectNumChange={handleSelectNumChange}
        onSelectChange={handleSelectChange}
        onToggleAll={handleToggleAll}
      />
      <div className="flex justify-end mt-4">
        <CartSummary items={items} />
      </div>
    </div>
  );
};

export default CartPage;
