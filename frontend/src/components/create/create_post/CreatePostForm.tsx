import { useFormState } from 'react-dom';
import { createPost } from '@/lib/create_api';
import CommunitySearchBar from './CommunitySearchBar';
import { InputTextField, InputTextareaField, FormSubmitButton } from '../FormElements';
import InputMediaField from '../InputMediaField';

interface PostFormProps {
  post_type : 'TEXT' | 'MEDIA' | 'LINK',
  sub_name?: string,
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/mpeg'];
const intialState = {
  error: '',
} 

const PostForm = ({ post_type, sub_name }: PostFormProps) => {
  const [state, formAction] = useFormState(createPost, intialState);

  return (
    <form action={formAction}>
      <div className="w-3/6 mb-4">
        <CommunitySearchBar sub_name={sub_name}/>
      </div>
      {/* Post Title */}
      <InputTextField
        label='Title'
        name='title'
        placeholder="Enter the title..."
      />

      <input type="hidden" name="post_type" value={post_type} />
      <input type="hidden" name="sub_name" value={sub_name} />

      {post_type === 'TEXT' && (
        <InputTextareaField
          label="Text"
          name="text"
          placeholder="Write your content here..."
          rowCount={6}
        />
      )}

      {post_type === 'MEDIA' && (
        <InputMediaField 
          name="file"
          label="Upload"
          accept="image/*,video/*"
          max_file_size={MAX_FILE_SIZE}
          allowed_mime_types={ALLOWED_MIME_TYPES}   
          state={state}
        />
      )}

      {post_type === 'LINK' && (
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

      <FormSubmitButton
        action_state={state}
      />
    </form>
  )
}

export default PostForm;
