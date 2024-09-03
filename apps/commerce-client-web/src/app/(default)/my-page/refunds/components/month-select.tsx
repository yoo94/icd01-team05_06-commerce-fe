import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function MonthSelect() {
  return (
    <Select defaultValue="all">
      <SelectTrigger className="w-16">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {values.map((value) => (
            <SelectItem key={value} value={value.toString()}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
