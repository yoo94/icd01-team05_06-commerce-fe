import { useState } from 'react';
import { Star } from 'lucide-react';

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
      <h2 className="mb-4 text-xl font-semibold">리뷰 작성하기</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">이름</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="이름을 입력하세요"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">리뷰</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="리뷰 내용을 입력하세요"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">평점</label>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                onClick={() => setRating(index + 1)}
                className={`size-6 cursor-pointer ${
                  index < rating ? 'text-yellow-500' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-2 font-semibold text-white hover:bg-blue-600"
        >
          리뷰 등록
        </button>
      </form>
    </div>
  );
};

export default NewReviewForm;
