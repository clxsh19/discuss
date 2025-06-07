import { useFormState } from 'react-dom';
import { createPost } from '@/lib/create_api';
import CommunitySearchBar from './CommunitySearchBar';
import InputMediaField from '../InputMediaField';
import FormSubmitButton from '../FormSubmitButton';
import TextInput from '@/components/ui/Form/TextInput';
import Textarea from '@/components/ui/Form/Textarea';
import { CreatePostProps } from '@/interface/create/CreatePostProps';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/mpeg'];
const intialState = {
  error: '',
}

const PostForm = ({ postType, subName }: CreatePostProps) => {
  const [state, formAction] = useFormState(createPost, intialState);

  return (
    <form action={formAction}>
      <CommunitySearchBar subName={subName} />
      {/* Post Title */}
      <TextInput
        containerStyle="mb-4"
        labelStyle="text-sm font-medium"
        inputStyle="w-full mt-2 px-3 py-2 bg-neutral-900 rounded-lg text-white text-sm outline-none"
        label='Title'
        name='title'
        placeholder="Enter the title..."
      // onInput={(e) => {
      //   const input = e.target as HTMLInputElement;
      //   input.value = input.value.replace(/\s/g, '');
      // }}
      />

      <input type="hidden" name="post_type" value={postType} />
      <input type="hidden" name="sub_name" value={subName} />

      {postType === 'TEXT' && (
        <Textarea
          containerStyle="mb-4"
          labelStyle="text-sm font-medium"
          inputStyle="w-full mt-2 px-3 py-2 bg-neutral-900 rounded-lg text-white text-sm outline-none"
          label="Text"
          name="text"
          placeholder="Write your content here..."
          rowCount={6}
        />
      )}

      {postType === 'MEDIA' && (
        <InputMediaField
          name="file"
          label="Upload"
          accept="image/*,video/*"
          max_file_size={MAX_FILE_SIZE}
          allowed_mime_types={ALLOWED_MIME_TYPES}
          state={state}
        />
      )}

      {postType === 'LINK' && (
        <div className="mb-4">
          <label htmlFor="link" className="block text-sm font-medium ">
            Link
          </label>
          <input
            type="url"
            name="link"
            className="mt-2 w-full px-3 py-3 bg-neutral-900 text-white rounded-md text-sm outline-none"
            placeholder="https://example.com"
            required
          />
        </div>
      )}

      <div className="flex flex-col justify-end">
        <p aria-live="polite" className={`p-1 px-2 text-sm rounded-md
          ${state?.error ? "font-semibold text-red-500" : "sr-only"}`}>
          {`Error: ${state?.error}`}
        </p>
        <FormSubmitButton />
      </div>
    </form>
  )
}

export default PostForm;
