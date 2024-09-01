import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table';
import CartItem from './cart-item';
import { Input } from '@/components/ui/input';

const CartItemList: React.FC<{
    items: any[];
    onRemove: (id: number) => void;
    onSelectNumChange: (id: number, newSelectNum: number) => void;
    onToggleAll: (isChecked: boolean) => void;
    onSelectChange: (id: number, selected: boolean) => void;
}> = ({ items, onRemove, onSelectNumChange, onToggleAll, onSelectChange }) => {
    const allSelected = items.every((item) => item.selected);

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full divide-y divide-gray-200">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-10">
                            <Input
                                type="checkbox"
                                checked={allSelected}
                                onChange={(e) => onToggleAll(e.target.checked)}
                                className="cursor-pointer"
                            />
                        </TableHead>
                        <TableHead>상품 정보</TableHead>
                        <TableHead>수량</TableHead>
                        <TableHead>주문 금액</TableHead>
                        <TableHead>배송 정보</TableHead>
                        <TableHead>삭제</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onRemove={onRemove}
                            onSelectNumChange={onSelectNumChange}
                            onSelectChange={onSelectChange}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CartItemList;
