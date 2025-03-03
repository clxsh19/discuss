import { useState } from 'react';
import { useFormState } from 'react-dom';
import { createCommunity } from '@/lib/create_api';
import { InputTextField, InputTextareaField, FormSubmitButton } from '../FormElements';
import InputMediaField from '../InputMediaField';

const intialState = {
  error: '',
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const TAGS = [
  "Internet Culture", "Games", "Q&As & Stories", "Technology", "Movies & TV",
  "Places & Travel", "Pop Culture", "News & Politics", "Business & Finance",
  "Education & Career", "Sports", "Music", "Fashion & Beauty", "Humanities & Law",
  "Vehicles", "Home & Garden", "Food & Drinks", "Art", "Anime & Cosplay",
  "Reading & Writing", "Sciences", "Wellness", "Collectibles & Other Hobbies",
  "Spooky", "Nature & Outdoors"
];

const CreateSubForm = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [state, formAction] = useFormState(createCommunity, intialState);


  const handleTagSelection = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleMouseDownOnTag = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  
    const value = e.currentTarget.getAttribute("value");
    if (!value) return;
  
    setSelectedTags((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };
  

  return (
    <form action={formAction}>
      {/* Community name */}
      <InputTextField
        label='Name'
        name='name'
        placeholder="Enter the community name..."
        onInput={(e) => {
          const input = e.target as HTMLInputElement;
          input.value = input.value.replace(/\s/g, '');
        }}
      />

      {/* Display Name */}
      <InputTextField
        label='Display Name'
        name='displayName'
        placeholder="Enter the display name for your community..."
        onInput={(e) => {
          const input = e.target as HTMLInputElement;
          input.value = input.value.replace(/\s/g, '');
        }}
      />

      {/* Description */}
      <InputTextareaField
        label="Description" 
        name="description"
        placeholder="Write your community description, rules etc..."
        rowCount={5}
      />
      
      {/* Community Banner optional */}
      <InputMediaField 
        name="banner"
        label="Banner"
        accept="image/*"
        max_file_size={MAX_FILE_SIZE}
        allowed_mime_types={ALLOWED_MIME_TYPES}
        state={state}
      />
      
      {/* Community logo optional */}
      <InputMediaField 
        name="logo"
        label="Logo"
        accept="image/*"
        max_file_size={MAX_FILE_SIZE}
        allowed_mime_types={ALLOWED_MIME_TYPES}   
        state={state}
      />

      {/* Multi-select Tags */}
      <div className="mb-4 space-y-2">

        {/* Hidden input to store selected tag values */}
        <input type="hidden" name="tags" value={selectedTags} />

        <label htmlFor="tags" className="text-sm font-medium">Tags</label>
        <div className="w-full h-auto px-3 py-2 flex flex-wrap gap-2 bg-neutral-900 rounded-lg overflow-y-auto">
          {selectedTags.length > 0 ? (
            selectedTags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-700 text-white px-2 py-0.5 rounded-md text-sm flex items-center gap-1"
                style={{ maxHeight: "100px" }}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleTagSelection(tag)}
                  className="ml-1 text-lg hover:text-red-500"
                >
                  ✕
                </button>
              </span>
            ))
          ) : <span className='text-sm text-gray-400'>Select tags...</span>
          }
        </div>
        <select
            id="tags"
            multiple
            className="bg-neutral-900 rounded-lg text-white text-sm outline-none"
          >
            {TAGS.map((tag) => (
              <option 
                key={tag} value={tag} 
                className="p-2 mb-0.5 bg-neutral-900 rounded-md hover:bg-neutral-800"
                onMouseDown={handleMouseDownOnTag}
              >
                {tag}
              </option>
            ))}
          </select>
      </div>

      <FormSubmitButton
        action_state={state}
      />
    </form>
  )
}

export default CreateSubForm;
