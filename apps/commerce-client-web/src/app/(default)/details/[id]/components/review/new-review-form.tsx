'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { ReviewFormData, SubmitReviewData } from '@/types/review-types';
import { Textarea } from '@/components/ui/textarea';
import { submitReview } from '@/services/review-api';

type NewReviewFormProps = {
  productId: number;
  onReviewSubmitted: () => void;
};

const NewReviewForm = ({ productId, onReviewSubmitted }: NewReviewFormProps) => {
  const methods = useForm<ReviewFormData>();
  const { handleSubmit, reset } = methods;
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data: ReviewFormData) => {
    setLoading(true);
    try {
      const reviewData: SubmitReviewData = { ...data, productId, score: rating };

      console.log('reviewData:', reviewData);

      await submitReview(reviewData);
      await submitReview({ ...data, productId, score: rating });
      reset();
      setRating(5);
      onReviewSubmitted();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('리뷰 등록 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8 border-y py-4">
      <h2 className="mb-4 text-lg font-semibold">리뷰 작성하기</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-y-4">
          <FormItem>
            <FormLabel>평점</FormLabel>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  onClick={() => setRating(index + 1)}
                  className={`size-6 cursor-pointer ${
                    index < rating ? 'fill-yellow-500 text-yellow-500' : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
          </FormItem>

          <FormItem>
            <FormLabel>리뷰</FormLabel>
            <FormControl>
              <Textarea
                {...methods.register('content', { required: '리뷰 내용을 입력해주세요.' })}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                placeholder="리뷰 내용을 입력하세요"
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <Button type="submit" variant="default" className="w-24 self-end" disabled={loading}>
            {loading ? '등록 중...' : '리뷰 등록'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default NewReviewForm;
