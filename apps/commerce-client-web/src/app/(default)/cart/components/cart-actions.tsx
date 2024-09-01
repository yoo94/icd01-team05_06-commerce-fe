import React from 'react';
import { Button } from '@/components/ui/button';

const CartActions: React.FC<{ onRemoveSelected: () => void}> = ({ onRemoveSelected }) => {
    return (
        <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={onRemoveSelected}>선택상품 삭제</Button>
        </div>
    );
};

export default CartActions;
