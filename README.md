# [Visit - Dummy API app](https://visit-dummyapi.vercel.app)

## Created with:
- React using Next.js
- Typescript
- CSS modules
- [TanStack Query v4](https://tanstack.com/query/latest) for asynchronous data-fetching.
- [react-select](https://react-select.com/home) for multiselect input control
- [Vercel](https://vercel.com) for deployment through GitHub.

## User functionality
### Home page
On the home page, users can like and browse posts, posts by tags.
Users can click on the post image to go to the respective post page.
Clicking on the user name, opens up the user profile which the user can click on each individual post to go to their respective page.

### Post page
This is a dynamic route where the user can like or edit the post or choose to leave a comment. There is no API connection to the comment box.
Clicking edit post button will take the user to the Edit post page.
Users can also click on a tag to browse by that respective tag.

### Create post page
Users can create a post by entering an image link, caption and optional tags.
Submitting a post is currently not functional.

### Edit post page
Users can edit the post by changing the image link, caption or tags. The post data is autofilled to the form for easier editing.
Submitting the edit is currently not functional.