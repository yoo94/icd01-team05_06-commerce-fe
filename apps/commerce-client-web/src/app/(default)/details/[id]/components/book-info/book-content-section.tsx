type BookContentSectionProps = {
  title: string;
  content?: string;
};

const BookContentSection = ({ title, content }: BookContentSectionProps) => {
  return (
    <div className="mb-10">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="whitespace-pre-wrap text-sm font-light leading-6">
        {content ? content : '정보가 제공되지 않았습니다.'}
      </div>
    </div>
  );
};

export default BookContentSection;
