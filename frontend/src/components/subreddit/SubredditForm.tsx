import { createCommunity } from "@/lib/create_api";

const SubredditForm = () => {

	const submitForm = async(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget)
		const res = await createCommunity(formData);
	} 
	return (
		<form className='bg-white h-full w-full rounded-[15px] p-[15px]' onSubmit={submitForm} encType="multipart/form-data">
			<div className="mb-4">
				<label htmlFor="name" className="block text-sm font-medium text-gray-700">
				  Name
				</label>
				<input 
				  type="text"
					id="name"
					name="name"
					placeholder="Community name"
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					
				/>
				<label htmlFor="description" className="block text-sm font-medium text-gray-700">
				  Description
				</label>
				<input 
				  type="text"
					id="description"
					name="description"
					placeholder="Tell us something about the community..."
					className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
					required
				/>
			</div>
			<div>
				<label
				  htmlFor="banner"
				  className="block text-sm font-medium text-gray-700"
				>
					Banner
				</label>
				<input
				  id="banner"
					name="banner"
					type="file"
					accept="image/*"
				/>
				<label
				  htmlFor="logo"
				  className="block text-sm font-medium text-gray-700"
				>
					Logo
				</label>
				<input
				  id="logo"
					name="logo"
					type="file"
					accept="image/*"
				/>
			</div>
			<button type="submit">Submit</button>
		</form>
	)
}

export default SubredditForm;