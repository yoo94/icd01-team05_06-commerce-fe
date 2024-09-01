import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CartItem: React.FC<{
    item: any;
    onRemove: (id: number) => void;
    onSelectNumChange: (id: number, newSelectNum: number) => void;
    onSelectChange: (id: number, selected: boolean) => void;
}> = ({ item, onRemove, onSelectNumChange, onSelectChange }) => {
    return (
        <TableRow className="hover:bg-gray-50">
            <TableCell className="text-center">
                <Input
                    type="checkbox"
                    checked={item.selected}
                    onChange={(e) => onSelectChange(item.id, e.target.checked)}
                    className="cursor-pointer"
                />
            </TableCell>
            <TableCell className="flex items-center space-x-4">
                <img src={item.imgSrc} alt={item.title} className="w-16 h-16 rounded" />
                <p className="font-medium">{item.title}</p>
            </TableCell>
            <TableCell className="text-center">
                <Input
                    type="number"
                    value={item.selectNum}
                    onChange={(e) => onSelectNumChange(item.id, parseInt(e.target.value))}
                    className="w-12 border rounded text-center"
                />
            </TableCell>
            <TableCell className="font-bold text-right">{(item.price * item.selectNum).toLocaleString()}원</TableCell>
            <TableCell className="text-center">{item.shippingInfo || '무료'}</TableCell>
            <TableCell className="text-center">
                <Button variant="outline" onClick={() => onRemove(item.id)} className="text-red-600 hover:bg-red-50">
                    삭제
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default CartItem;
