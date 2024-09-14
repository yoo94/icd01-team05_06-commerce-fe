'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useForm, FormProvider } from 'react-hook-form';
import { Search as SearchIcon } from 'lucide-react';
const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize useForm
  const methods = useForm({
    defaultValues: { searchTerm: '' },
  });

  const { setValue, handleSubmit } = methods;

  useEffect(() => {
    const searchWord = searchParams.get('word');
    if (searchWord) {
      setValue('searchTerm', searchWord);
    } else {
      setValue('searchTerm', '');
    }
  }, [searchParams, setValue]);

  const onSubmit = (data: { searchTerm: string }) => {
    const { searchTerm } = data;

    if (searchTerm.trim()) {
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set('word', searchTerm);
      router.push(`/search?${currentParams.toString()}`);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex w-full justify-end">
        <div className="relative w-full max-w-sm">
          <Input
            className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-full border bg-transparent py-2 pl-5 pr-10 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="찾으려는 책을 검색해보세요."
            type="search"
            {...methods.register('searchTerm')}
          />
          <button type="submit" className="absolute right-3 top-2.5">
            <SearchIcon className="size-4 text-gray-400" />
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SearchBar;
