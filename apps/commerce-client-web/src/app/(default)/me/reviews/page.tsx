import { getMyReviews } from '@/app/actions/my-review-action';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

const Page = async () => {
  const { reviews } = await getMyReviews();

  return (
    <div className="flex flex-col gap-4">
      <header>나의 리뷰</header>
      <div className="overflow-x-auto">
        <Table className="table-fixed text-xs">
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="hidden w-16 text-center md:table-cell">작성일자</TableHead>
              <TableHead className="w-24 text-center">상품</TableHead>
              <TableHead className="w-36 text-center">내용</TableHead>
              <TableHead className="w-8 text-center">점수</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.reviewId} className="text-center text-xs">
                <TableCell className="hidden truncate md:table-cell">{review.createdAt}</TableCell>
                <TableCell>
                  <Link className="text-blue-700" href={`/details/${review.productId}`}>
                    {review.productTitle}
                  </Link>
                </TableCell>
                <TableCell className="truncate">{review.content}</TableCell>
                <TableCell className="truncate">{review.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
