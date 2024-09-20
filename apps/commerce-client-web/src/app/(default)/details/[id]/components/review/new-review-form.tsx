import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NewReviewFormProps = {
  onSubmit: (username: string, content: string, rating: number, date: string) => void;
};

const NewReviewForm = ({ onSubmit }: NewReviewFormProps) => {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !content) {
      alert('모든 필드를 입력해 주세요.');
      return;
    }
    const currentDate = new Date().toLocaleDateString();
    onSubmit(username, content, rating, currentDate);
    setUsername('');
    setContent('');
    setRating(5);
  };

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-lg font-semibold">리뷰 작성하기</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-4">
          <label className="mb-1 block text-sm">평점</label>
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
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm">이름</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="이름을 입력하세요"
          />
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm">리뷰</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="리뷰 내용을 입력하세요"
          />
        </div>
        <Button type="submit" variant="default" className="w-24 self-end">
          리뷰 등록
        </Button>
      </form>
    </div>
  );
};

export default NewReviewForm;
