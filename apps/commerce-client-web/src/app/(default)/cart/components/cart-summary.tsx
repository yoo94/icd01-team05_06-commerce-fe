import React from 'react';

const CartSummary: React.FC<{ items: any[] }> = ({ items }) => {
    const totalPrice = items
        .filter(item => item.selected)
        .reduce((acc, item) => acc + item.price * item.selectNum, 0)
        .toLocaleString();

    return (
        <div className="flex justify-end mt-8">
            <div className="text-right">
                <div className="text-lg font-semibold mb-2">총 주문 상품 {items.filter(item => item.selected).length}개</div>
                <div className="text-2xl font-bold">{totalPrice}원</div>
            </div>
        </div>
    );
};

export default CartSummary;
