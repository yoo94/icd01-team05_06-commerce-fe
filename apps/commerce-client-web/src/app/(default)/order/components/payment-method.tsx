import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const PaymentMethod = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="border-b pb-5 text-base">결제수단</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center">
          <input type="radio" id="bankTransfer" name="paymentMethod" className="mr-2" />
          <Label htmlFor="bankTransfer">무통장입금</Label>
        </div>
        <div className="w-full">
          <Label className="mb-1 block text-xs text-slate-500">은행</Label>
          <Select>
            <SelectTrigger id="bankSelect">
              <SelectValue placeholder="은행을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kb">국민은행</SelectItem>
              <SelectItem value="shinhan">신한은행</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4">
          <Label className="mb-1 block text-xs text-slate-500">입금자명</Label>
          <Input type="text" placeholder="입금자명 (미입력시 주문자명)" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;
