import { useForm } from 'react-hook-form';
import { Button } from '@/components/retroui/Button';
import { Input } from '@/components/retroui/Input';
import type { SearchFormData } from '@/types';
import { searchFormValidation } from '@/types';

interface SearchFormProps {
  onSearch: (query: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    mode: 'onSubmit',
    defaultValues: { query: '' },
  });

  const onSubmit = (data: SearchFormData) => {
    onSearch(data.query);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-start gap-3">
        <div className="flex-1">
          <Input
            type="text"
            {...register('query', searchFormValidation.query)}
            placeholder="What are you looking for?"
            className="py-3"
            aria-invalid={errors.query ? true : undefined}
          />
          {errors.query && (
            <p className="text-sm text-destructive mt-1.5">
              {errors.query.message}
            </p>
          )}
        </div>
        <Button type="submit" size="md" className="py-3">
          Search
        </Button>
      </div>
    </form>
  );
}
